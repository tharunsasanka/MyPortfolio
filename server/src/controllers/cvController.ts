import type { Request, Response } from "express";
import PDFDocument from "pdfkit";
import Certificate from "../models/Certificate";
import CyberLab from "../models/CyberLab";
import Profile from "../models/Profile";
import Project from "../models/Project";
import Skill from "../models/Skill";

function text(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function list(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function safeFileName(name: string) {
  return name.replace(/[^a-z0-9]/gi, "_").replace(/_+/g, "_");
}

function addTitle(doc: PDFKit.PDFDocument, title: string) {
  doc.moveDown(1);
  doc.font("Helvetica-Bold").fontSize(12).fillColor("#111827").text(title);
  doc.moveDown(0.4);
}

function addBullet(doc: PDFKit.PDFDocument, value: string) {
  if (!value) return;

  if (doc.y > 760) {
    doc.addPage();
  }

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#111827")
    .text(`• ${value}`, {
      width: 495,
      lineGap: 2,
    });
}

async function createPdfBuffer(doc: PDFKit.PDFDocument) {
  const chunks: Buffer[] = [];

  return new Promise<Buffer>((resolve, reject) => {
    doc.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
    doc.end();
  });
}

export async function downloadCv(_req: Request, res: Response) {
  try {
    const [profile, projects, skills, certificates, cyberLabs] =
      await Promise.all([
        Profile.findOne().sort({ updatedAt: -1 }).lean(),
        Project.find().sort({ order: 1, createdAt: -1 }).lean(),
        Skill.find().sort({ category: 1, level: -1 }).lean(),
        Certificate.find().sort({ createdAt: -1 }).lean(),
        CyberLab.find().sort({ createdAt: -1 }).lean(),
      ]);

    const name = text(profile?.name, "Tharun Sasanka");
    const role = text(
      profile?.role,
      "Cybersecurity Student & Full-Stack Developer"
    );

    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
      bufferPages: false,
    });

    doc.font("Helvetica-Bold").fontSize(22).fillColor("#111827").text(name);
    doc.moveDown(0.25);
    doc.font("Helvetica").fontSize(11).fillColor("#374151").text(role);

    const contactLine = [
      text(profile?.location),
      text(profile?.email),
      text(profile?.githubUrl),
      text(profile?.linkedinUrl),
    ]
      .filter(Boolean)
      .join(" | ");

    if (contactLine) {
      doc.moveDown(0.5);
      doc.font("Helvetica").fontSize(9).fillColor("#374151").text(contactLine);
    }

    addTitle(doc, "Professional Summary");
    doc
      .font("Helvetica")
      .fontSize(10.5)
      .fillColor("#111827")
      .text(
        text(
          profile?.heroDescription,
          "Cybersecurity-focused student and full-stack developer with practical experience in secure web applications, backend systems, databases, and cyber-focused projects."
        ),
        {
          width: 495,
          lineGap: 3,
        }
      );

    if (skills.length > 0) {
      addTitle(doc, "Technical Skills");

      const skillNames = skills
        .map((skill) => text(skill.name))
        .filter(Boolean);

      if (skillNames.length > 0) {
        addBullet(doc, skillNames.join(", "));
      }
    }

    if (projects.length > 0) {
      addTitle(doc, "Selected Projects");

      projects.slice(0, 8).forEach((project) => {
        const technologies = list(project.technologies);

        doc
          .font("Helvetica-Bold")
          .fontSize(10.5)
          .fillColor("#111827")
          .text(text(project.title, "Untitled Project"));

        addBullet(doc, text(project.description));

        if (technologies.length > 0) {
          addBullet(doc, `Technologies: ${technologies.join(", ")}`);
        }

        const githubUrl = text(project.githubUrl);
        if (githubUrl) {
          addBullet(doc, `GitHub: ${githubUrl}`);
        }

        doc.moveDown(0.4);
      });
    }

    if (certificates.length > 0) {
      addTitle(doc, "Certificates");

      certificates.slice(0, 10).forEach((certificate) => {
        addBullet(
          doc,
          `${text(certificate.title, "Certificate")} - ${text(
            certificate.issuer,
            "Issuer"
          )}`
        );
      });
    }

    if (cyberLabs.length > 0) {
      addTitle(doc, "Cybersecurity Labs");

      cyberLabs.slice(0, 10).forEach((lab) => {
        addBullet(
          doc,
          `${text(lab.name) || "Cybersecurity Lab"} - ${text(
            lab.profileUrl
          )}`
        );
      });
    }

    const pdfBuffer = await createPdfBuffer(doc);
    const fileName = `${safeFileName(name)}_ATS_CV.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Length", String(pdfBuffer.length));

    return res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error("CV generation failed:", error);

    return res.status(500).json({
      message: "Failed to generate CV.",
    });
  }
}