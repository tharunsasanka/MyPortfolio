import type { Request, Response } from "express";
import ContactMessage from "../models/ContactMessage";

export async function createContactMessage(req: Request, res: Response) {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      message: "Name, email, subject, and message are required.",
    });
  }

  const contactMessage = await ContactMessage.create({
    name,
    email,
    subject,
    message,
  });

  return res.status(201).json({
    message: "Message sent successfully",
    contactMessage,
  });
}

export async function getContactMessages(_req: Request, res: Response) {
  const messages = await ContactMessage.find().sort({
    createdAt: -1,
  });

  return res.json({ messages });
}

export async function markContactMessageAsRead(req: Request, res: Response) {
  const message = await ContactMessage.findById(req.params.id);

  if (!message) {
    return res.status(404).json({
      message: "Contact message not found",
    });
  }

  message.isRead = true;
  await message.save();

  return res.json({
    message: "Message marked as read",
    contactMessage: message,
  });
}

export async function deleteContactMessage(req: Request, res: Response) {
  const message = await ContactMessage.findByIdAndDelete(req.params.id);

  if (!message) {
    return res.status(404).json({
      message: "Contact message not found",
    });
  }

  return res.json({
    message: "Contact message deleted successfully",
  });
}