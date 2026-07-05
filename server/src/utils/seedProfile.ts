import { connectDatabase } from "../config/db";
import Profile from "../models/Profile";

async function seedProfile() {
  await connectDatabase();

  const existingProfile = await Profile.findOne();

  if (existingProfile) {
    console.log("Profile already exists:");
    console.log(existingProfile.name);
    process.exit(0);
  }

  const profile = await Profile.create({
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

  console.log("Profile created successfully:");
  console.log(profile.name);

  process.exit(0);
}

seedProfile().catch((error) => {
  console.error("Profile seed failed");
  console.error(error);
  process.exit(1);
});