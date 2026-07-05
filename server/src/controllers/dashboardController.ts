import type { Request, Response } from "express";
import Certificate from "../models/Certificate";
import ContactMessage from "../models/ContactMessage";
import CyberLab from "../models/CyberLab";
import Project from "../models/Project";
import Skill from "../models/Skill";

export async function getDashboardStats(_req: Request, res: Response) {
  const [
    projectsCount,
    certificatesCount,
    cyberLabsCount,
    skillsCount,
    messagesCount,
    unreadMessagesCount,
  ] = await Promise.all([
    Project.countDocuments(),
    Certificate.countDocuments(),
    CyberLab.countDocuments(),
    Skill.countDocuments(),
    ContactMessage.countDocuments(),
    ContactMessage.countDocuments({ isRead: false }),
  ]);

  return res.json({
    stats: {
      projectsCount,
      certificatesCount,
      cyberLabsCount,
      skillsCount,
      messagesCount,
      unreadMessagesCount,
    },
  });
}