import type { Request, Response } from "express";
import CyberLab from "../models/CyberLab";

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeStats(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (item) =>
        item &&
        typeof item === "object" &&
        "label" in item &&
        "value" in item
    )
    .map((item) => {
      const stat = item as { label: unknown; value: unknown };

      return {
        label: String(stat.label).trim(),
        value: String(stat.value).trim(),
      };
    })
    .filter((item) => item.label && item.value);
}

function normalizeProgress(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (item) =>
        item &&
        typeof item === "object" &&
        "label" in item &&
        "value" in item
    )
    .map((item) => {
      const progress = item as { label: unknown; value: unknown };

      return {
        label: String(progress.label).trim(),
        value: Math.min(100, Math.max(0, Number(progress.value) || 0)),
      };
    })
    .filter((item) => item.label);
}

export async function getCyberLabs(_req: Request, res: Response) {
  const cyberLabs = await CyberLab.find().sort({
    order: 1,
    createdAt: -1,
  });

  return res.json({ cyberLabs });
}

export async function createCyberLab(req: Request, res: Response) {
  const { name, username, rank, status, profileUrl, order } = req.body;

  if (!name || !username || !rank || !status || !profileUrl) {
    return res.status(400).json({
      message: "Name, username, rank, status, and profile URL are required.",
    });
  }

  const cyberLab = await CyberLab.create({
    name,
    username,
    rank,
    status,
    profileUrl,
    stats: normalizeStats(req.body.stats),
    progress: normalizeProgress(req.body.progress),
    learningAreas: normalizeStringArray(req.body.learningAreas),
    order: Number(order) || 0,
  });

  return res.status(201).json({
    message: "Cyber lab created successfully",
    cyberLab,
  });
}

export async function updateCyberLab(req: Request, res: Response) {
  const cyberLab = await CyberLab.findById(req.params.id);

  if (!cyberLab) {
    return res.status(404).json({
      message: "Cyber lab not found",
    });
  }

  const allowedFields = [
    "name",
    "username",
    "rank",
    "status",
    "profileUrl",
    "order",
  ] as const;

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (cyberLab as any)[field] = req.body[field];
    }
  });

  if (req.body.stats !== undefined) {
    cyberLab.set("stats", normalizeStats(req.body.stats));
  }

  if (req.body.progress !== undefined) {
    cyberLab.set("progress", normalizeProgress(req.body.progress));
  }

  if (req.body.learningAreas !== undefined) {
    cyberLab.learningAreas = normalizeStringArray(req.body.learningAreas);
  }

  await cyberLab.save();

  return res.json({
    message: "Cyber lab updated successfully",
    cyberLab,
  });
}

export async function deleteCyberLab(req: Request, res: Response) {
  const cyberLab = await CyberLab.findByIdAndDelete(req.params.id);

  if (!cyberLab) {
    return res.status(404).json({
      message: "Cyber lab not found",
    });
  }

  return res.json({
    message: "Cyber lab deleted successfully",
  });
}