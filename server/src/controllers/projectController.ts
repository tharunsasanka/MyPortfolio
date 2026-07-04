import type { Request, Response } from "express";
import Project from "../models/Project";

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function getProjects(_req: Request, res: Response) {
  const projects = await Project.find().sort({ order: 1, createdAt: -1 });

  return res.json({
    projects,
  });
}

export async function getProjectById(req: Request, res: Response) {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  return res.json({
    project,
  });
}

export async function createProject(req: Request, res: Response) {
  const {
    title,
    category,
    description,
    longDescription,
    githubUrl,
    liveUrl,
    status,
    isFeatured,
    order,
  } = req.body;

  if (!title || !category || !description || !longDescription) {
    return res.status(400).json({
      message:
        "Title, category, description, and long description are required.",
    });
  }

  const project = await Project.create({
    title,
    category,
    description,
    longDescription,
    technologies: normalizeStringArray(req.body.technologies),
    features: normalizeStringArray(req.body.features),
    githubUrl: githubUrl || "#",
    liveUrl: liveUrl || "#",
    status: status || "Planning",
    isFeatured: Boolean(isFeatured),
    order: Number(order) || 0,
  });

  return res.status(201).json({
    message: "Project created successfully",
    project,
  });
}

export async function updateProject(req: Request, res: Response) {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  const allowedFields = [
    "title",
    "category",
    "description",
    "longDescription",
    "githubUrl",
    "liveUrl",
    "status",
    "isFeatured",
    "order",
  ] as const;

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (project as any)[field] = req.body[field];
    }
  });

  if (req.body.technologies !== undefined) {
    project.technologies = normalizeStringArray(req.body.technologies);
  }

  if (req.body.features !== undefined) {
    project.features = normalizeStringArray(req.body.features);
  }

  await project.save();

  return res.json({
    message: "Project updated successfully",
    project,
  });
}

export async function deleteProject(req: Request, res: Response) {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  return res.json({
    message: "Project deleted successfully",
  });
}