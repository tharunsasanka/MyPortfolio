import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profileController";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getProfile);
router.put("/", requireAuth, updateProfile);

export default router;