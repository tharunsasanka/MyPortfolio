import type { Response } from "express";
import Admin from "../models/Admin";
import type { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { signAdminToken } from "../utils/jwt";

export async function loginAdmin(req: AuthenticatedRequest, res: Response) {
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const admin = await Admin.findOne({ email }).select("+password") as any;

  if (!admin) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await admin.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = signAdminToken({
    adminId: admin._id.toString(),
    email: admin.email,
    role: "admin",
  });

  return res.json({
    message: "Login successful",
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
}

export async function getCurrentAdmin(
  req: AuthenticatedRequest,
  res: Response
) {
  if (!req.admin) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const admin = await Admin.findById(req.admin.adminId);

  if (!admin) {
    return res.status(404).json({
      message: "Admin not found",
    });
  }

  return res.json({
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
}