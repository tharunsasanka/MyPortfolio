import { Router } from "express";
import {
  createSkill,
  deleteSkill,
  getSkills,
  updateSkill,
} from "../controllers/skillController";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getSkills);

router.post("/", requireAuth, createSkill);
router.put("/:id", requireAuth, updateSkill);
router.delete("/:id", requireAuth, deleteSkill);

export default router;