"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const Certificate_1 = __importDefault(require("../models/Certificate"));
const defaultCertificates = [
    {
        title: "Introduction to Cybersecurity",
        issuer: "Cisco Networking Academy",
        issueDate: "2026",
        credentialId: "Replace-with-real-ID",
        verificationUrl: "#",
        skills: ["Cybersecurity", "Threats", "Network Security"],
        status: "Completed",
        order: 1,
    },
    {
        title: "Pre Security Learning Path",
        issuer: "TryHackMe",
        issueDate: "2026",
        credentialId: "TryHackMe-Profile",
        verificationUrl: "https://tryhackme.com",
        skills: ["Linux", "Networking", "Web Security"],
        status: "In Progress",
        order: 2,
    },
    {
        title: "Hack The Box Academy Progress",
        issuer: "Hack The Box",
        issueDate: "2026",
        credentialId: "HTB-Profile",
        verificationUrl: "https://academy.hackthebox.com",
        skills: ["Penetration Testing", "Labs", "Security Fundamentals"],
        status: "In Progress",
        order: 3,
    },
    {
        title: "Web Development Fundamentals",
        issuer: "Personal Learning",
        issueDate: "2026",
        credentialId: "Portfolio-Learning",
        verificationUrl: "#",
        skills: ["HTML", "CSS", "JavaScript", "React"],
        status: "Completed",
        order: 4,
    },
];
async function seedCertificates() {
    await (0, db_1.connectDatabase)();
    for (const certificate of defaultCertificates) {
        const existingCertificate = await Certificate_1.default.findOne({
            title: certificate.title,
            issuer: certificate.issuer,
        });
        if (existingCertificate) {
            console.log(`Skipped existing certificate: ${certificate.title}`);
            continue;
        }
        await Certificate_1.default.create(certificate);
        console.log(`Created certificate: ${certificate.title}`);
    }
    console.log("Certificate seeding completed");
    process.exit(0);
}
seedCertificates().catch((error) => {
    console.error("Certificate seed failed");
    console.error(error);
    process.exit(1);
});
