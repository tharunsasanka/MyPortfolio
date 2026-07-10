import type { Request, Response } from "express";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import Certificate from "../models/Certificate";
import CyberLab from "../models/CyberLab";
import Profile from "../models/Profile";
import Project from "../models/Project";
import Skill from "../models/Skill";

type AnyRecord = Record<string, any>;

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 50;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

function getText(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  return value.trim() || fallback;
}

function cleanText(value: string) {
  return value
    .replace(/•/g, "-")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getStringList(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => cleanText(String(item))).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => cleanText(item))
      .filter(Boolean);
  }

  return [];
}

function safeFileName(name: string) {
  return cleanText(name).replace(/[^a-z0-9]/gi, "_").replace(/_+/g, "_");
}

function addNewPage(pdfDoc: PDFDocument) {
  return pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
}

function drawWrappedText({
  page,
  text,
  x,
  y,
  font,
  size,
  maxWidth,
  lineHeight,
  color = rgb(0.07, 0.09, 0.12),
}: {
  page: PDFPage;
  text: string;
  x: number;
  y: number;
  font: PDFFont;
  size: number;
  maxWidth: number;
  lineHeight: number;
  color?: ReturnType<typeof rgb>;
}) {
  const words = cleanText(text).split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = font.widthOfTextAtSize(testLine, size);

    if (testWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);

  let currentY = y;

  for (const line of lines) {
    page.drawText(line, {
      x,
      y: currentY,
      size,
      font,
      color,
    });

    currentY -= lineHeight;
  }

  return currentY;
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

    const pdfDoc = await PDFDocument.create();
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let page = addNewPage(pdfDoc);
    let y = PAGE_HEIGHT - MARGIN;

    function ensureSpace(required = 80) {
      if (y < MARGIN + required) {
        page = addNewPage(pdfDoc);
        y = PAGE_HEIGHT - MARGIN;
      }
    }

    function sectionTitle(title: string) {
      ensureSpace(70);

      y -= 18;
      page.drawText(cleanText(title).toUpperCase(), {
        x: MARGIN,
        y,
        size: 12,
        font: boldFont,
        color: rgb(0.07, 0.09, 0.12),
      });

      y -= 8;
      page.drawLine({
        start: { x: MARGIN, y },
        end: { x: PAGE_WIDTH - MARGIN, y },
        thickness: 1,
        color: rgb(0.82, 0.84, 0.86),
      });

      y -= 22;
    }

    function paragraph(value: string, size = 10.5) {
      if (!value) return;

      ensureSpace(70);

      y = drawWrappedText({
        page,
        text: value,
        x: MARGIN,
        y,
        font: regularFont,
        size,
        maxWidth: CONTENT_WIDTH,
        lineHeight: size + 5,
      });

      y -= 8;
    }

    function bullet(value: string) {
      if (!value) return;

      ensureSpace(55);

      y = drawWrappedText({
        page,
        text: `- ${value}`,
        x: MARGIN,
        y,
        font: regularFont,
        size: 10,
        maxWidth: CONTENT_WIDTH,
        lineHeight: 14,
      });

      y -= 4;
    }

    function itemTitle(title: string, meta = "") {
      ensureSpace(60);

      const cleanTitle = cleanText(title);
      const cleanMeta = cleanText(meta);

      page.drawText(cleanTitle, {
        x: MARGIN,
        y,
        size: 10.8,
        font: boldFont,
        color: rgb(0.07, 0.09, 0.12),
      });

      if (cleanMeta) {
        const titleWidth = boldFont.widthOfTextAtSize(cleanTitle, 10.8);
        page.drawText(` | ${cleanMeta}`, {
          x: MARGIN + titleWidth + 4,
          y,
          size: 10,
          font: regularFont,
          color: rgb(0.3, 0.33, 0.38),
        });
      }

      y -= 18;
    }

    const name = getText(profile?.name, "Tharun Sasanka");
    const role = getText(
      profile?.role,
      "Cybersecurity Student & Full-Stack Developer"
    );

    const email = getText(profile?.email);
    const location = getText(profile?.location);
    const githubUrl = getText(profile?.githubUrl);
    const linkedinUrl = getText(profile?.linkedinUrl);

    const summary =
      getText(profile?.heroDescription) ||
      getText(profile?.aboutDescription) ||
      "Cybersecurity-focused student and full-stack developer with practical experience in secure web applications, backend systems, databases, and cyber-focused projects.";

    page.drawText(cleanText(name), {
      x: MARGIN,
      y,
      size: 22,
      font: boldFont,
      color: rgb(0.07, 0.09, 0.12),
    });

    y -= 24;

    page.drawText(cleanText(role), {
      x: MARGIN,
      y,
      size: 11,
      font: regularFont,
      color: rgb(0.22, 0.25, 0.31),
    });

    y -= 18;

    const contactLine = [location, email, githubUrl, linkedinUrl]
      .map((item) => cleanText(item))
      .filter(Boolean)
      .join(" | ");

    if (contactLine) {
      y = drawWrappedText({
        page,
        text: contactLine,
        x: MARGIN,
        y,
        font: regularFont,
        size: 9,
        maxWidth: CONTENT_WIDTH,
        lineHeight: 13,
        color: rgb(0.22, 0.25, 0.31),
      });

      y -= 10;
    }

    sectionTitle("Professional Summary");
    paragraph(summary);

    const aboutSecondDescription = getText(profile?.aboutSecondDescription);
    if (aboutSecondDescription) {
      paragraph(aboutSecondDescription);
    }

    const techStackText = getText(profile?.techStackText);
    if (techStackText) {
      bullet(`Technology focus: ${techStackText}`);
    }

    if (skills.length > 0) {
      sectionTitle("Technical Skills");

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
        bullet(`${category}: ${names.join(", ")}`);
      });
    }

    if (projects.length > 0) {
      sectionTitle("Selected Projects");

      projects.slice(0, 8).forEach((project) => {
        const title = getText(project.title, "Untitled Project");
        const category = getText(project.category);
        const description = getText(project.description);
        const technologies = getStringList(project.technologies);
        const github = getText(project.githubUrl);
        const live = getText(project.liveUrl);

        itemTitle(title, category);

        if (description) bullet(description);
        if (technologies.length > 0) {
          bullet(`Technologies: ${technologies.join(", ")}`);
        }
        if (github) bullet(`GitHub: ${github}`);
        if (live) bullet(`Live Demo: ${live}`);

        y -= 6;
      });
    }

    if (certificates.length > 0) {
      sectionTitle("Certificates");

      certificates.slice(0, 10).forEach((certificate) => {
        const title = getText(certificate.title, "Certificate");
        const issuer = getText(certificate.issuer);
        const url = getText(certificate.credentialUrl);

        bullet(`${title}${issuer ? ` - ${issuer}` : ""}`);
        if (url) bullet(`Credential: ${url}`);
      });
    }

    if (cyberLabs.length > 0) {
      sectionTitle("Cybersecurity Labs");

      cyberLabs.slice(0, 10).forEach((lab) => {
        const title =
          getText(lab.title) ||
          getText(lab.name) ||
          getText(lab.platform, "Cybersecurity Lab");

        const platform = getText(lab.platform);
        const status = getText(lab.status);

        bullet(`${title}${platform ? ` - ${platform}` : ""}${status ? ` - ${status}` : ""}`);
      });
    }

    ensureSpace(40);

    y -= 10;
    page.drawText(
      "This ATS-friendly CV was generated automatically from the live portfolio content.",
      {
        x: MARGIN,
        y,
        size: 8,
        font: regularFont,
        color: rgb(0.42, 0.45, 0.5),
      }
    );

    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = Buffer.from(pdfBytes);
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