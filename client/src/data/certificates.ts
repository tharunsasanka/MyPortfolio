export type Certificate = {
  id: number;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verificationUrl: string;
  skills: string[];
  status: "Verified" | "In Progress" | "Completed";
};

export const certificates: Certificate[] = [
  {
    id: 1,
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    issueDate: "2026",
    credentialId: "Replace-with-real-ID",
    verificationUrl: "#",
    skills: ["Cybersecurity", "Threats", "Network Security"],
    status: "Completed",
  },
  {
    id: 2,
    title: "Pre Security Learning Path",
    issuer: "TryHackMe",
    issueDate: "2026",
    credentialId: "TryHackMe-Profile",
    verificationUrl: "https://tryhackme.com",
    skills: ["Linux", "Networking", "Web Security"],
    status: "In Progress",
  },
  {
    id: 3,
    title: "Hack The Box Academy Progress",
    issuer: "Hack The Box",
    issueDate: "2026",
    credentialId: "HTB-Profile",
    verificationUrl: "https://academy.hackthebox.com",
    skills: ["Penetration Testing", "Labs", "Security Fundamentals"],
    status: "In Progress",
  },
  {
    id: 4,
    title: "Web Development Fundamentals",
    issuer: "Personal Learning",
    issueDate: "2026",
    credentialId: "Portfolio-Learning",
    verificationUrl: "#",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    status: "Completed",
  },
];