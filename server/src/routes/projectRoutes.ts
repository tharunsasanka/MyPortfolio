import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "../controllers/projectController";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);

router.post("/", requireAuth, createProject);
router.put("/:id", requireAuth, updateProject);
router.delete("/:id", requireAuth, deleteProject);

export default router;