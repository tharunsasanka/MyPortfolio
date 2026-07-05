"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getRequiredEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}
exports.env = {
    nodeEnv: process.env.NODE_ENV || "development",
    port: Number(process.env.PORT || 5000),
    clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
    mongoUri: getRequiredEnv("MONGO_URI"),
    jwtSecret: getRequiredEnv("JWT_SECRET"),
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
    adminName: process.env.ADMIN_NAME || "Admin",
    adminEmail: getRequiredEnv("ADMIN_EMAIL"),
    adminPassword: getRequiredEnv("ADMIN_PASSWORD"),
};
if (exports.env.jwtSecret.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters long.");
}
if (exports.env.adminPassword.length < 8) {
    throw new Error("ADMIN_PASSWORD must be at least 8 characters long.");
}
