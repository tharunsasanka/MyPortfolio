"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjects = getProjects;
exports.getProjectById = getProjectById;
exports.createProject = createProject;
exports.updateProject = updateProject;
exports.deleteProject = deleteProject;
const Project_1 = __importDefault(require("../models/Project"));
const allowedFields = [
    "title",
    "category",
    "description",
    "longDescription",
    "technologies",
    "features",
    "imageUrl",
    "githubUrl",
    "liveUrl",
    "status",
    "isFeatured",
    "order",
];
async function getProjects(_req, res) {
    const projects = await Project_1.default.find().sort({ order: 1, createdAt: -1 });
    return res.json({ projects });
}
async function getProjectById(req, res) {
    const project = await Project_1.default.findById(req.params.id);
    if (!project) {
        return res.status(404).json({
            message: "Project not found",
        });
    }
    return res.json({ project });
}
async function createProject(req, res) {
    const project = await Project_1.default.create({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        longDescription: req.body.longDescription,
        technologies: req.body.technologies || [],
        features: req.body.features || [],
        imageUrl: req.body.imageUrl || "",
        githubUrl: req.body.githubUrl || "#",
        liveUrl: req.body.liveUrl || "#",
        status: req.body.status || "Completed",
        isFeatured: req.body.isFeatured || false,
        order: req.body.order || 0,
    });
    return res.status(201).json({
        message: "Project created successfully",
        project,
    });
}
async function updateProject(req, res) {
    const project = await Project_1.default.findById(req.params.id);
    if (!project) {
        return res.status(404).json({
            message: "Project not found",
        });
    }
    allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            project[field] = req.body[field];
        }
    });
    await project.save();
    return res.json({
        message: "Project updated successfully",
        project,
    });
}
async function deleteProject(req, res) {
    const project = await Project_1.default.findByIdAndDelete(req.params.id);
    if (!project) {
        return res.status(404).json({
            message: "Project not found",
        });
    }
    return res.json({
        message: "Project deleted successfully",
    });
}
