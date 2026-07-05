"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = loginAdmin;
exports.getCurrentAdmin = getCurrentAdmin;
const Admin_1 = __importDefault(require("../models/Admin"));
const jwt_1 = require("../utils/jwt");
async function loginAdmin(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required",
        });
    }
    const admin = await Admin_1.default.findOne({ email }).select("+password");
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
    const token = (0, jwt_1.signAdminToken)({
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
async function getCurrentAdmin(req, res) {
    if (!req.admin) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    const admin = await Admin_1.default.findById(req.admin.adminId);
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
