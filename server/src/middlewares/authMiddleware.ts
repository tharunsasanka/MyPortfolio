import type { NextFunction, Request, Response } from "express";
import { verifyAdminToken, type JwtAdminPayload } from "../utils/jwt";

export type AuthenticatedRequest = Request & {
  admin?: JwtAdminPayload;
};

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication token missing",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAdminToken(token);
    req.admin = decoded;

    return next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}