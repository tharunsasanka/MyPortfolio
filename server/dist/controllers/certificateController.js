"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCertificates = getCertificates;
exports.createCertificate = createCertificate;
exports.updateCertificate = updateCertificate;
exports.deleteCertificate = deleteCertificate;
const Certificate_1 = __importDefault(require("../models/Certificate"));
function normalizeStringArray(value) {
    if (!Array.isArray(value))
        return [];
    return value
        .filter((item) => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean);
}
async function getCertificates(_req, res) {
    const certificates = await Certificate_1.default.find().sort({
        order: 1,
        createdAt: -1,
    });
    return res.json({ certificates });
}
async function createCertificate(req, res) {
    const { title, issuer, issueDate, credentialId, verificationUrl, status, order, } = req.body;
    if (!title || !issuer || !issueDate) {
        return res.status(400).json({
            message: "Title, issuer, and issue date are required.",
        });
    }
    const certificate = await Certificate_1.default.create({
        title,
        issuer,
        issueDate,
        credentialId: credentialId || "",
        verificationUrl: verificationUrl || "#",
        skills: normalizeStringArray(req.body.skills),
        status: status || "Completed",
        order: Number(order) || 0,
    });
    return res.status(201).json({
        message: "Certificate created successfully",
        certificate,
    });
}
async function updateCertificate(req, res) {
    const certificate = await Certificate_1.default.findById(req.params.id);
    if (!certificate) {
        return res.status(404).json({
            message: "Certificate not found",
        });
    }
    const allowedFields = [
        "title",
        "issuer",
        "issueDate",
        "credentialId",
        "verificationUrl",
        "status",
        "order",
    ];
    allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            certificate[field] = req.body[field];
        }
    });
    if (req.body.skills !== undefined) {
        certificate.skills = normalizeStringArray(req.body.skills);
    }
    await certificate.save();
    return res.json({
        message: "Certificate updated successfully",
        certificate,
    });
}
async function deleteCertificate(req, res) {
    const certificate = await Certificate_1.default.findByIdAndDelete(req.params.id);
    if (!certificate) {
        return res.status(404).json({
            message: "Certificate not found",
        });
    }
    return res.json({
        message: "Certificate deleted successfully",
    });
}
