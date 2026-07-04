export type CyberLabPlatform = {
  id: number;
  name: string;
  username: string;
  rank: string;
  status: string;
  profileUrl: string;
  stats: {
    label: string;
    value: string;
  }[];
  progress: {
    label: string;
    value: number;
  }[];
};

export const cyberLabPlatforms: CyberLabPlatform[] = [
  {
    id: 1,
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
  },
  {
    id: 2,
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
  },
];

export const learningAreas = [
  "Web Security",
  "Network Security",
  "Linux",
  "OWASP Top 10",
  "Digital Forensics",
  "Penetration Testing",
  "Burp Suite",
  "Reconnaissance",
];