import type { Request, Response } from "express";
import Certificate from "../models/Certificate";

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function getCertificates(_req: Request, res: Response) {
  const certificates = await Certificate.find().sort({
    order: 1,
    createdAt: -1,
  });

  return res.json({ certificates });
}

export async function createCertificate(req: Request, res: Response) {
  const {
    title,
    issuer,
    issueDate,
    credentialId,
    verificationUrl,
    status,
    order,
  } = req.body;

  if (!title || !issuer || !issueDate) {
    return res.status(400).json({
      message: "Title, issuer, and issue date are required.",
    });
  }

  const certificate = await Certificate.create({
    title,
    issuer,
    issueDate,
    credentialId: credentialId || "",
    verificationUrl: verificationUrl || "#",
    skills: normalizeStringArray(req.body.skills),
    status: status || "Completed",
    order: Number(order) || 0,
  });

  return res.status(201).json({
    message: "Certificate created successfully",
    certificate,
  });
}

export async function updateCertificate(req: Request, res: Response) {
  const certificate = await Certificate.findById(req.params.id);

  if (!certificate) {
    return res.status(404).json({
      message: "Certificate not found",
    });
  }

  const allowedFields = [
    "title",
    "issuer",
    "issueDate",
    "credentialId",
    "verificationUrl",
    "status",
    "order",
  ] as const;

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (certificate as any)[field] = req.body[field];
    }
  });

  if (req.body.skills !== undefined) {
    certificate.skills = normalizeStringArray(req.body.skills);
  }

  await certificate.save();

  return res.json({
    message: "Certificate updated successfully",
    certificate,
  });
}

export async function deleteCertificate(req: Request, res: Response) {
  const certificate = await Certificate.findByIdAndDelete(req.params.id);

  if (!certificate) {
    return res.status(404).json({
      message: "Certificate not found",
    });
  }

  return res.json({
    message: "Certificate deleted successfully",
  });
}