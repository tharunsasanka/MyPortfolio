"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = getDashboardStats;
const Certificate_1 = __importDefault(require("../models/Certificate"));
const ContactMessage_1 = __importDefault(require("../models/ContactMessage"));
const CyberLab_1 = __importDefault(require("../models/CyberLab"));
const Project_1 = __importDefault(require("../models/Project"));
const Skill_1 = __importDefault(require("../models/Skill"));
async function getDashboardStats(_req, res) {
    const [projectsCount, certificatesCount, cyberLabsCount, skillsCount, messagesCount, unreadMessagesCount,] = await Promise.all([
        Project_1.default.countDocuments(),
        Certificate_1.default.countDocuments(),
        CyberLab_1.default.countDocuments(),
        Skill_1.default.countDocuments(),
        ContactMessage_1.default.countDocuments(),
        ContactMessage_1.default.countDocuments({ isRead: false }),
    ]);
    return res.json({
        stats: {
            projectsCount,
            certificatesCount,
            cyberLabsCount,
            skillsCount,
            messagesCount,
            unreadMessagesCount,
        },
    });
}
