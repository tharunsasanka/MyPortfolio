"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
const Profile_1 = __importDefault(require("../models/Profile"));
async function getProfile(_req, res) {
    let profile = await Profile_1.default.findOne();
    if (!profile) {
        profile = await Profile_1.default.create({
            name: "Tharun Sasanka",
            role: "Cybersecurity Student & Full-Stack Developer",
            badgeText: "Cyber Security",
            codeText: "<Hello World />",
            headline: "I'm a",
            highlightedHeadline: "Cybersecurity Student & Full-Stack Developer",
            heroDescription: "I am Tharun Sasanka, a cybersecurity student, ethical hacking learner, and developer focused on building secure web applications, digital systems, and cyber-focused projects.",
            githubUrl: "https://github.com/tharunsasanka",
            linkedinUrl: "#",
            cvUrl: "/cv.pdf",
            statusText: "Open to Projects",
            contactText: "Available",
            learningText: "24/7 Mode",
            techStackText: "React • Node.js • MongoDB • Cybersecurity",
            projectsStat: "10+",
            projectsLabel: "Projects",
            domainsStat: "4+",
            domainsLabel: "Tech Domains",
            learningStat: "24/7",
            learningLabel: "Learning Mode",
            aboutEyebrow: "About Me",
            aboutTitle: "Cybersecurity learner and full-stack developer",
            aboutDescription: "I am a cybersecurity student and full-stack developer from Sri Lanka. I focus on building secure, modern, and practical digital systems using web technologies, backend systems, databases, and cybersecurity concepts.",
            aboutSecondDescription: "My goal is to grow as an ethical hacker and developer by building real-world projects, improving my technical skills, and creating secure systems that solve practical problems.",
            location: "Sri Lanka",
            email: "tharunsasanka1234@gmail.com",
            profileImageUrl: "",
        });
    }
    return res.json({ profile });
}
async function updateProfile(req, res) {
    let profile = await Profile_1.default.findOne();
    if (!profile) {
        profile = await Profile_1.default.create({
            name: "Tharun Sasanka",
            role: "Cybersecurity Student & Full-Stack Developer",
            badgeText: "Cyber Security",
            codeText: "<Hello World />",
            headline: "I'm a",
            highlightedHeadline: "Cybersecurity Student & Full-Stack Developer",
            heroDescription: "I am Tharun Sasanka, a cybersecurity student, ethical hacking learner, and developer focused on building secure web applications, digital systems, and cyber-focused projects.",
            aboutTitle: "Cybersecurity learner and full-stack developer",
            aboutDescription: "I am a cybersecurity student and full-stack developer from Sri Lanka.",
        });
    }
    const allowedFields = [
        "name",
        "role",
        "badgeText",
        "codeText",
        "headline",
        "highlightedHeadline",
        "heroDescription",
        "githubUrl",
        "linkedinUrl",
        "cvUrl",
        "statusText",
        "contactText",
        "learningText",
        "techStackText",
        "projectsStat",
        "projectsLabel",
        "domainsStat",
        "domainsLabel",
        "learningStat",
        "learningLabel",
        "aboutEyebrow",
        "aboutTitle",
        "aboutDescription",
        "aboutSecondDescription",
        "location",
        "email",
        "profileImageUrl",
    ];
    allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            profile[field] = req.body[field];
        }
    });
    await profile.save();
    return res.json({
        message: "Profile updated successfully",
        profile,
    });
}
