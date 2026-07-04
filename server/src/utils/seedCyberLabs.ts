import { connectDatabase } from "../config/db";
import CyberLab from "../models/CyberLab";

const defaultCyberLabs = [
  {
    name: "TryHackMe",
    username: "Update-your-username",
    rank: "Learning",
    status: "Active",
    profileUrl: "https://tryhackme.com",
    stats: [
      { label: "Rooms", value: "Update" },
      { label: "Badges", value: "Update" },
      { label: "Streak", value: "Update" },
    ],
    progress: [
      { label: "Pre Security", value: 65 },
      { label: "Web Fundamentals", value: 55 },
      { label: "Linux", value: 60 },
      { label: "Networking", value: 50 },
    ],
    learningAreas: [
      "Web Security",
      "Network Security",
      "Linux",
      "OWASP Top 10",
      "Burp Suite",
    ],
    order: 1,
  },
  {
    name: "Hack The Box",
    username: "Update-your-username",
    rank: "Beginner",
    status: "Active",
    profileUrl: "https://app.hackthebox.com",
    stats: [
      { label: "Machines", value: "Update" },
      { label: "Challenges", value: "Update" },
      { label: "Academy", value: "Update" },
    ],
    progress: [
      { label: "Academy Modules", value: 45 },
      { label: "Web Requests", value: 40 },
      { label: "Linux Fundamentals", value: 55 },
      { label: "Penetration Testing", value: 35 },
    ],
    learningAreas: [
      "Digital Forensics",
      "Penetration Testing",
      "Reconnaissance",
      "Linux",
      "Web Requests",
    ],
    order: 2,
  },
];

async function seedCyberLabs() {
  await connectDatabase();

  for (const lab of defaultCyberLabs) {
    const existingLab = await CyberLab.findOne({
      name: lab.name,
    });

    if (existingLab) {
      console.log(`Skipped existing cyber lab: ${lab.name}`);
      continue;
    }

    await CyberLab.create(lab);
    console.log(`Created cyber lab: ${lab.name}`);
  }

  console.log("Cyber lab seeding completed");
  process.exit(0);
}

seedCyberLabs().catch((error) => {
  console.error("Cyber lab seed failed");
  console.error(error);
  process.exit(1);
});