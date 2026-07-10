import type { Request, Response } from "express";
import PDFDocument = require("pdfkit");
import Certificate from "../models/Certificate";
import CyberLab from "../models/CyberLab";
import Profile from "../models/Profile";
import Project from "../models/Project";
import Skill from "../models/Skill";

type AnyRecord = Record<string, unknown>;

function getText(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  return value.trim() || fallback;
}

function getStringList(value: unknown) {
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

function formatDate(value: unknown) {
  if (!value) return "";

  const date = new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

function safeFileName(name: string) {
  return name.replace(/[^a-z0-9]/gi, "_").replace(/_+/g, "_");
}

function addPageIfNeeded(doc: PDFKit.PDFDocument, neededSpace = 90) {
  const bottomMargin = 60;

  if (doc.y + neededSpace > doc.page.height - bottomMargin) {
    doc.addPage();
  }
}

function addSectionTitle(doc: PDFKit.PDFDocument, title: string) {
  addPageIfNeeded(doc, 80);

  doc
    .moveDown(0.9)
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor("#111827")
    .text(title.toUpperCase());

  doc
    .moveTo(50, doc.y + 4)
    .lineTo(545, doc.y + 4)
    .strokeColor("#d1d5db")
    .lineWidth(1)
    .stroke();

  doc.moveDown(0.8);
}

function addBullet(doc: PDFKit.PDFDocument, text: string) {
  if (!text) return;

  addPageIfNeeded(doc, 45);

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#111827")
    .text(`• ${text}`, {
      width: 495,
      lineGap: 2,
    });
}

function addParagraph(doc: PDFKit.PDFDocument, text: string) {
  if (!text) return;

  addPageIfNeeded(doc, 70);

  doc
    .font("Helvetica")
    .fontSize(10.5)
    .fillColor("#111827")
    .text(text, {
      width: 495,
      lineGap: 3,
    });
}

function addItemTitle(doc: PDFKit.PDFDocument, title: string, meta?: string) {
  addPageIfNeeded(doc, 60);

  doc
    .font("Helvetica-Bold")
    .fontSize(10.8)
    .fillColor("#111827")
    .text(title, {
      continued: Boolean(meta),
    });

  if (meta) {
    doc.font("Helvetica").fontSize(10).fillColor("#4b5563").text(`  |  ${meta}`);
  }
}

async function createPdfBuffer(doc: PDFKit.PDFDocument) {
  const chunks: Buffer[] = [];

  const pdfBufferPromise = new Promise<Buffer>((resolve, reject) => {
    doc.on("data", (chunk) => {
      chunks.push(Buffer.from(chunk));
    });

    doc.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    doc.on("error", reject);
  });

  doc.end();

  return pdfBufferPromise;
}

export async function downloadCv(_req: Request, res: Response) {
  try {
    const [profile, projects, skills, certificates, cyberLabs] =
      await Promise.all([
        Profile.findOne().sort({ updatedAt: -1 }).lean<AnyRecord>(),
        Project.find().sort({ order: 1, createdAt: -1 }).lean<AnyRecord[]>(),
        Skill.find().sort({ category: 1, level: -1 }).lean<AnyRecord[]>(),
        Certificate.find().sort({ createdAt: -1 }).lean<AnyRecord[]>(),
        CyberLab.find().sort({ createdAt: -1 }).lean<AnyRecord[]>(),
      ]);

    const name = getText(profile?.name, "Tharun Sasanka");
    const role = getText(
      profile?.role,
      "Cybersecurity Student and Full-Stack Developer"
    );

    const email = getText(profile?.email);
    const location = getText(profile?.location);
    const githubUrl = getText(profile?.githubUrl);
    const linkedinUrl = getText(profile?.linkedinUrl);

    const summary =
      getText(profile?.heroDescription) ||
      getText(profile?.aboutDescription) ||
      "Cybersecurity-focused technology learner with practical experience in secure web development, backend systems, databases, and hands-on security projects.";

    const secondSummary = getText(profile?.aboutSecondDescription);
    const techStackText = getText(profile?.techStackText);
    const learningText = getText(profile?.learningText);

    const fileName = `${safeFileName(name)}_ATS_CV.pdf`;

    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
      info: {
        Title: `${name} - ATS CV`,
        Author: name,
        Subject: "ATS-friendly curriculum vitae generated from portfolio data",
      },
    });

    doc.font("Helvetica-Bold").fontSize(22).fillColor("#111827").text(name);

    doc.moveDown(0.25);

    doc.font("Helvetica").fontSize(11.5).fillColor("#374151").text(role);

    const contactItems = [location, email, githubUrl, linkedinUrl].filter(Boolean);

    if (contactItems.length > 0) {
      doc.moveDown(0.4);
      doc
        .font("Helvetica")
        .fontSize(9.5)
        .fillColor("#374151")
        .text(contactItems.join(" | "), {
          width: 495,
          lineGap: 2,
        });
    }

    addSectionTitle(doc, "Professional Summary");
    addParagraph(doc, summary);

    if (secondSummary) {
      addParagraph(doc, secondSummary);
    }

    if (learningText) {
      addBullet(doc, learningText);
    }

    if (techStackText) {
      addBullet(doc, `Technology focus: ${techStackText}`);
    }

    if (skills.length > 0) {
      addSectionTitle(doc, "Technical Skills");

      const groupedSkills = skills.reduce<Record<string, string[]>>(
        (acc, skill) => {
          const category = getText(skill.category, "General");
          const skillName = getText(skill.name);

          if (!skillName) return acc;

          if (!acc[category]) {
            acc[category] = [];
          }

          acc[category].push(skillName);
          return acc;
        },
        {}
      );

      Object.entries(groupedSkills).forEach(([category, names]) => {
        addPageIfNeeded(doc, 45);

        doc
          .font("Helvetica-Bold")
          .fontSize(10.5)
          .fillColor("#111827")
          .text(`${category}: `, {
            continued: true,
          });

        doc
          .font("Helvetica")
          .fontSize(10.5)
          .fillColor("#111827")
          .text(names.join(", "), {
            width: 430,
            lineGap: 2,
          });
      });
    }

    if (projects.length > 0) {
      addSectionTitle(doc, "Selected Projects");

      projects.slice(0, 8).forEach((project) => {
        const title = getText(project.title, "Untitled Project");
        const category = getText(project.category);
        const description = getText(project.description);
        const technologies = getStringList(project.technologies);
        const github = getText(project.githubUrl);
        const live = getText(project.liveUrl);

        addItemTitle(doc, title, category);

        if (description) {
          addBullet(doc, description);
        }

        if (technologies.length > 0) {
          addBullet(doc, `Technologies: ${technologies.join(", ")}`);
        }

        if (github) {
          addBullet(doc, `GitHub: ${github}`);
        }

        if (live) {
          addBullet(doc, `Live Demo: ${live}`);
        }

        doc.moveDown(0.4);
      });
    }

    if (certificates.length > 0) {
      addSectionTitle(doc, "Certificates");

      certificates.slice(0, 10).forEach((certificate) => {
        const title = getText(certificate.title, "Certificate");
        const issuer = getText(certificate.issuer);
        const issuedDate =
          formatDate(certificate.issuedDate) ||
          formatDate(certificate.date) ||
          formatDate(certificate.createdAt);
        const credentialUrl = getText(certificate.credentialUrl);
        const description = getText(certificate.description);

        const meta = [issuer, issuedDate].filter(Boolean).join(" | ");

        addItemTitle(doc, title, meta);

        if (description) {
          addBullet(doc, description);
        }

        if (credentialUrl) {
          addBullet(doc, `Credential: ${credentialUrl}`);
        }

        doc.moveDown(0.35);
      });
    }

    if (cyberLabs.length > 0) {
      addSectionTitle(doc, "Cybersecurity Labs");

      cyberLabs.slice(0, 10).forEach((lab) => {
        const title =
          getText(lab.title) ||
          getText(lab.name) ||
          getText(lab.platform, "Cybersecurity Lab");

        const platform = getText(lab.platform);
        const status = getText(lab.status);
        const description = getText(lab.description);
        const url = getText(lab.url) || getText(lab.profileUrl);

        const meta = [platform, status].filter(Boolean).join(" | ");

        addItemTitle(doc, title, meta);

        if (description) {
          addBullet(doc, description);
        }

        if (url) {
          addBullet(doc, `Link: ${url}`);
        }

        doc.moveDown(0.35);
      });
    }

    addPageIfNeeded(doc, 60);

    doc
      .moveDown(1)
      .font("Helvetica")
      .fontSize(8.5)
      .fillColor("#6b7280")
      .text(
        "This ATS-friendly CV was generated automatically from the live portfolio content.",
        {
          align: "center",
        }
      );

    const pdfBuffer = await createPdfBuffer(doc);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Length", String(pdfBuffer.length));

    return res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error("CV generation failed");
    console.error(error);

    return res.status(500).json({
      message: "Failed to generate CV.",
    });
  }
}