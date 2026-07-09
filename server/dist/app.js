"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const certificateRoutes_1 = __importDefault(require("./routes/certificateRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const cyberLabRoutes_1 = __importDefault(require("./routes/cyberLabRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const profileRoutes_1 = __importDefault(require("./routes/profileRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const skillRoutes_1 = __importDefault(require("./routes/skillRoutes"));
const cvRoutes_1 = __importDefault(require("./routes/cvRoutes"));
const env_1 = require("./config/env");
const app = (0, express_1.default)();
const allowedOrigins = [
    env_1.env.clientUrl,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
].filter(Boolean);
app.set("trust proxy", 1);
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: {
        policy: "cross-origin",
    },
}));
app.use((0, cors_1.default)({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));
app.use(express_1.default.json({
    limit: "1mb",
}));
app.use(express_1.default.urlencoded({
    extended: true,
    limit: "1mb",
}));
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Too many requests. Please try again later.",
    },
});
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Too many login attempts. Please try again after 15 minutes.",
    },
});
app.use("/api", apiLimiter);
app.get("/api/health", (_req, res) => {
    return res.json({
        status: "ok",
        message: "CyberPortfolio API is running",
    });
});
app.use("/api/auth", authLimiter, authRoutes_1.default);
app.use("/api/projects", projectRoutes_1.default);
app.use("/api/certificates", certificateRoutes_1.default);
app.use("/api/cyber-labs", cyberLabRoutes_1.default);
app.use("/api/skills", skillRoutes_1.default);
app.use("/api/contact", contactRoutes_1.default);
app.use("/api/dashboard", dashboardRoutes_1.default);
app.use("/api/profile", profileRoutes_1.default);
app.use("/api/cv", cvRoutes_1.default);
app.use((_req, res) => {
    return res.status(404).json({
        message: "Route not found",
    });
});
exports.default = app;
