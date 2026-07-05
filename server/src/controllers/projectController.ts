import type { Request, Response } from "express";
import Project from "../models/Project";

const allowedFields = [
  "title",
  "category",
  "description",
  "longDescription",
  "technologies",
  "features",
  "imageUrl",
  "githubUrl",
  "liveUrl",
  "status",
  "isFeatured",
  "order",
] as const;

export async function getProjects(_req: Request, res: Response) {
  const projects = await Project.find().sort({ order: 1, createdAt: -1 });

  return res.json({ projects });
}

export async function getProjectById(req: Request, res: Response) {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  return res.json({ project });
}

export async function createProject(req: Request, res: Response) {
  const project = await Project.create({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    longDescription: req.body.longDescription,
    technologies: req.body.technologies || [],
    features: req.body.features || [],
    imageUrl: req.body.imageUrl || "",
    githubUrl: req.body.githubUrl || "#",
    liveUrl: req.body.liveUrl || "#",
    status: req.body.status || "Completed",
    isFeatured: req.body.isFeatured || false,
    order: req.body.order || 0,
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

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (project as any)[field] = req.body[field];
    }
  });

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