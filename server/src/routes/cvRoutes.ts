import { Router } from "express";
import { downloadCv } from "../controllers/cvController";

const router = Router();

router.get("/download", downloadCv);

export default router;