import { Router } from "express";
import {
  createCyberLab,
  deleteCyberLab,
  getCyberLabs,
  updateCyberLab,
} from "../controllers/cyberLabController";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getCyberLabs);

router.post("/", requireAuth, createCyberLab);
router.put("/:id", requireAuth, updateCyberLab);
router.delete("/:id", requireAuth, deleteCyberLab);

export default router;