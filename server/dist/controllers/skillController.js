"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSkills = getSkills;
exports.createSkill = createSkill;
exports.updateSkill = updateSkill;
exports.deleteSkill = deleteSkill;
const Skill_1 = __importDefault(require("../models/Skill"));
async function getSkills(_req, res) {
    const skills = await Skill_1.default.find().sort({
        order: 1,
        createdAt: -1,
    });
    return res.json({ skills });
}
async function createSkill(req, res) {
    const { name, category, level, icon, description, order } = req.body;
    if (!name || !category) {
        return res.status(400).json({
            message: "Skill name and category are required.",
        });
    }
    const skill = await Skill_1.default.create({
        name,
        category,
        level: Math.min(100, Math.max(0, Number(level) || 50)),
        icon: icon || "",
        description: description || "",
        order: Number(order) || 0,
    });
    return res.status(201).json({
        message: "Skill created successfully",
        skill,
    });
}
async function updateSkill(req, res) {
    const skill = await Skill_1.default.findById(req.params.id);
    if (!skill) {
        return res.status(404).json({
            message: "Skill not found",
        });
    }
    if (req.body.name !== undefined)
        skill.name = req.body.name;
    if (req.body.category !== undefined)
        skill.category = req.body.category;
    if (req.body.icon !== undefined)
        skill.icon = req.body.icon;
    if (req.body.description !== undefined)
        skill.description = req.body.description;
    if (req.body.order !== undefined)
        skill.order = Number(req.body.order) || 0;
    if (req.body.level !== undefined) {
        skill.level = Math.min(100, Math.max(0, Number(req.body.level) || 0));
    }
    await skill.save();
    return res.json({
        message: "Skill updated successfully",
        skill,
    });
}
async function deleteSkill(req, res) {
    const skill = await Skill_1.default.findByIdAndDelete(req.params.id);
    if (!skill) {
        return res.status(404).json({
            message: "Skill not found",
        });
    }
    return res.json({
        message: "Skill deleted successfully",
    });
}
