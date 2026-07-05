"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCyberLabs = getCyberLabs;
exports.createCyberLab = createCyberLab;
exports.updateCyberLab = updateCyberLab;
exports.deleteCyberLab = deleteCyberLab;
const CyberLab_1 = __importDefault(require("../models/CyberLab"));
function normalizeStringArray(value) {
    if (!Array.isArray(value))
        return [];
    return value
        .filter((item) => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean);
}
function normalizeStats(value) {
    if (!Array.isArray(value))
        return [];
    return value
        .filter((item) => item &&
        typeof item === "object" &&
        "label" in item &&
        "value" in item)
        .map((item) => {
        const stat = item;
        return {
            label: String(stat.label).trim(),
            value: String(stat.value).trim(),
        };
    })
        .filter((item) => item.label && item.value);
}
function normalizeProgress(value) {
    if (!Array.isArray(value))
        return [];
    return value
        .filter((item) => item &&
        typeof item === "object" &&
        "label" in item &&
        "value" in item)
        .map((item) => {
        const progress = item;
        return {
            label: String(progress.label).trim(),
            value: Math.min(100, Math.max(0, Number(progress.value) || 0)),
        };
    })
        .filter((item) => item.label);
}
async function getCyberLabs(_req, res) {
    const cyberLabs = await CyberLab_1.default.find().sort({
        order: 1,
        createdAt: -1,
    });
    return res.json({ cyberLabs });
}
async function createCyberLab(req, res) {
    const { name, username, rank, status, profileUrl, order } = req.body;
    if (!name || !username || !rank || !status || !profileUrl) {
        return res.status(400).json({
            message: "Name, username, rank, status, and profile URL are required.",
        });
    }
    const cyberLab = await CyberLab_1.default.create({
        name,
        username,
        rank,
        status,
        profileUrl,
        stats: normalizeStats(req.body.stats),
        progress: normalizeProgress(req.body.progress),
        learningAreas: normalizeStringArray(req.body.learningAreas),
        order: Number(order) || 0,
    });
    return res.status(201).json({
        message: "Cyber lab created successfully",
        cyberLab,
    });
}
async function updateCyberLab(req, res) {
    const cyberLab = await CyberLab_1.default.findById(req.params.id);
    if (!cyberLab) {
        return res.status(404).json({
            message: "Cyber lab not found",
        });
    }
    const allowedFields = [
        "name",
        "username",
        "rank",
        "status",
        "profileUrl",
        "order",
    ];
    allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cyberLab[field] = req.body[field];
        }
    });
    if (req.body.stats !== undefined) {
        cyberLab.set("stats", normalizeStats(req.body.stats));
    }
    if (req.body.progress !== undefined) {
        cyberLab.set("progress", normalizeProgress(req.body.progress));
    }
    if (req.body.learningAreas !== undefined) {
        cyberLab.learningAreas = normalizeStringArray(req.body.learningAreas);
    }
    await cyberLab.save();
    return res.json({
        message: "Cyber lab updated successfully",
        cyberLab,
    });
}
async function deleteCyberLab(req, res) {
    const cyberLab = await CyberLab_1.default.findByIdAndDelete(req.params.id);
    if (!cyberLab) {
        return res.status(404).json({
            message: "Cyber lab not found",
        });
    }
    return res.json({
        message: "Cyber lab deleted successfully",
    });
}
