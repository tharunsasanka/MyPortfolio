import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboardController";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

router.get("/stats", requireAuth, getDashboardStats);

export default router;