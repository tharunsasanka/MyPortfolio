import { connectDatabase } from "../config/db";
import Skill from "../models/Skill";

const defaultSkills = [
  {
    name: "React",
    category: "Frontend",
    level: 85,
    icon: "react",
    description: "Modern frontend development using React and TypeScript.",
    order: 1,
  },
  {
    name: "TypeScript",
    category: "Frontend",
    level: 80,
    icon: "typescript",
    description: "Type-safe JavaScript development for scalable apps.",
    order: 2,
  },
  {
    name: "Node.js",
    category: "Backend",
    level: 78,
    icon: "nodejs",
    description: "Backend API development using Node.js and Express.",
    order: 3,
  },
  {
    name: "MongoDB",
    category: "Database",
    level: 75,
    icon: "mongodb",
    description: "NoSQL database design and CRUD operations.",
    order: 4,
  },
  {
    name: "Cybersecurity",
    category: "Security",
    level: 82,
    icon: "shield",
    description: "Security fundamentals, web security, and ethical hacking labs.",
    order: 5,
  },
  {
    name: "Linux",
    category: "Security",
    level: 76,
    icon: "linux",
    description: "Linux commands, permissions, services, and security basics.",
    order: 6,
  },
  {
    name: "Networking",
    category: "Security",
    level: 74,
    icon: "network",
    description: "TCP/IP, ports, protocols, routing, and network security.",
    order: 7,
  },
  {
    name: "Git & GitHub",
    category: "Tools",
    level: 80,
    icon: "github",
    description: "Version control, branching, commits, and GitHub workflow.",
    order: 8,
  },
];

async function seedSkills() {
  await connectDatabase();

  for (const skill of defaultSkills) {
    const existingSkill = await Skill.findOne({
      name: skill.name,
      category: skill.category,
    });

    if (existingSkill) {
      console.log(`Skipped existing skill: ${skill.name}`);
      continue;
    }

    await Skill.create(skill);
    console.log(`Created skill: ${skill.name}`);
  }

  console.log("Skill seeding completed");
  process.exit(0);
}

seedSkills().catch((error) => {
  console.error("Skill seed failed");
  console.error(error);
  process.exit(1);
});