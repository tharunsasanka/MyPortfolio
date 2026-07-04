import type { Request, Response } from "express";
import Skill from "../models/Skill";

export async function getSkills(_req: Request, res: Response) {
  const skills = await Skill.find().sort({
    order: 1,
    createdAt: -1,
  });

  return res.json({ skills });
}

export async function createSkill(req: Request, res: Response) {
  const { name, category, level, icon, description, order } = req.body;

  if (!name || !category) {
    return res.status(400).json({
      message: "Skill name and category are required.",
    });
  }

  const skill = await Skill.create({
    name,
    category,
    level: Math.min(100, Math.max(0, Number(level) || 50)),
    icon: icon || "",
    description: description || "",
    order: Number(order) || 0,
  });

  return res.status(201).json({
    message: "Skill created successfully",
    skill,
  });
}

export async function updateSkill(req: Request, res: Response) {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    return res.status(404).json({
      message: "Skill not found",
    });
  }

  if (req.body.name !== undefined) skill.name = req.body.name;
  if (req.body.category !== undefined) skill.category = req.body.category;
  if (req.body.icon !== undefined) skill.icon = req.body.icon;
  if (req.body.description !== undefined) skill.description = req.body.description;
  if (req.body.order !== undefined) skill.order = Number(req.body.order) || 0;

  if (req.body.level !== undefined) {
    skill.level = Math.min(100, Math.max(0, Number(req.body.level) || 0));
  }

  await skill.save();

  return res.json({
    message: "Skill updated successfully",
    skill,
  });
}

export async function deleteSkill(req: Request, res: Response) {
  const skill = await Skill.findByIdAndDelete(req.params.id);

  if (!skill) {
    return res.status(404).json({
      message: "Skill not found",
    });
  }

  return res.json({
    message: "Skill deleted successfully",
  });
}