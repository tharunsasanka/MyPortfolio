import { Router } from "express";
import { getCurrentAdmin, loginAdmin } from "../controllers/authController";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", loginAdmin);
router.get("/me", requireAuth, getCurrentAdmin);

export default router;