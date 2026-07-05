import type { Request, Response } from "express";
import Profile from "../models/Profile";

export async function getProfile(_req: Request, res: Response) {
  let profile = await Profile.findOne();

  if (!profile) {
    profile = await Profile.create({
      name: "Tharun Sasanka",
      role: "Cybersecurity Student & Full-Stack Developer",
      badgeText: "Cyber Security",
      codeText: "<Hello World />",
      headline: "I'm a",
      highlightedHeadline: "Cybersecurity Student & Full-Stack Developer",
      heroDescription:
        "I am Tharun Sasanka, a cybersecurity student, ethical hacking learner, and developer focused on building secure web applications, digital systems, and cyber-focused projects.",
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
      aboutDescription:
        "I am a cybersecurity student and full-stack developer from Sri Lanka. I focus on building secure, modern, and practical digital systems using web technologies, backend systems, databases, and cybersecurity concepts.",
      aboutSecondDescription:
        "My goal is to grow as an ethical hacker and developer by building real-world projects, improving my technical skills, and creating secure systems that solve practical problems.",
      location: "Sri Lanka",
      email: "tharunsasanka1234@gmail.com",
      profileImageUrl: "",
    });
  }

  return res.json({ profile });
}

export async function updateProfile(req: Request, res: Response) {
  let profile = await Profile.findOne();

  if (!profile) {
    profile = await Profile.create({
      name: "Tharun Sasanka",
      role: "Cybersecurity Student & Full-Stack Developer",
      badgeText: "Cyber Security",
      codeText: "<Hello World />",
      headline: "I'm a",
      highlightedHeadline: "Cybersecurity Student & Full-Stack Developer",
      heroDescription:
        "I am Tharun Sasanka, a cybersecurity student, ethical hacking learner, and developer focused on building secure web applications, digital systems, and cyber-focused projects.",
      aboutTitle: "Cybersecurity learner and full-stack developer",
      aboutDescription:
        "I am a cybersecurity student and full-stack developer from Sri Lanka.",
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
  ] as const;

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (profile as any)[field] = req.body[field];
    }
  });

  await profile.save();

  return res.json({
    message: "Profile updated successfully",
    profile,
  });
}