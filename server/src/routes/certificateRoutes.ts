import { Router } from "express";
import {
  createCertificate,
  deleteCertificate,
  getCertificates,
  updateCertificate,
} from "../controllers/certificateController";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getCertificates);

router.post("/", requireAuth, createCertificate);
router.put("/:id", requireAuth, updateCertificate);
router.delete("/:id", requireAuth, deleteCertificate);

export default router;