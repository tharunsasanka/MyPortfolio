import { connectDatabase } from "../config/db";
import Certificate from "../models/Certificate";

type CertificateSeed = {
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verificationUrl: string;
  skills: string[];
  status: "Completed" | "In Progress" | "Verified";
  order: number;
};

const defaultCertificates: CertificateSeed[] = [
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
  await connectDatabase();

  for (const certificate of defaultCertificates) {
    const existingCertificate = await Certificate.findOne({
      title: certificate.title,
      issuer: certificate.issuer,
    });

    if (existingCertificate) {
      console.log(`Skipped existing certificate: ${certificate.title}`);
      continue;
    }

    await Certificate.create(certificate);
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