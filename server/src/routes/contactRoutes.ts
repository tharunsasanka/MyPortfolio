import { Router } from "express";
import {
  createContactMessage,
  deleteContactMessage,
  getContactMessages,
  markContactMessageAsRead,
  markContactMessageAsUnread,
} from "../controllers/contactController";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", createContactMessage);

router.get("/", requireAuth, getContactMessages);
router.patch("/:id/read", requireAuth, markContactMessageAsRead);
router.patch("/:id/unread", requireAuth, markContactMessageAsUnread);
router.delete("/:id", requireAuth, deleteContactMessage);

export default router;