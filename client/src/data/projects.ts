export type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveUrl: string;
  status: "Completed" | "In Progress" | "Planning";
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Cyber Portfolio CMS",
    category: "Portfolio",
    description:
      "A modern cybersecurity portfolio with admin panel, AI assistant, and cyberpunk UI.",
    longDescription:
      "A full-stack personal portfolio designed for cybersecurity branding. It includes a modern frontend, hidden admin panel, project management, certificates, TryHackMe and Hack The Box status, and an AI portfolio assistant.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
    features: [
      "Modern cyberpunk interface",
      "Dark and light mode",
      "Hidden admin dashboard",
      "AI portfolio assistant",
      "Project and certificate management",
    ],
    githubUrl: "#",
    liveUrl: "#",
    status: "In Progress",
  },
  {
    id: 2,
    title: "FROSTO Online Shopping",
    category: "Web App",
    description:
      "A simple and modern online shopping web application with clean structure.",
    longDescription:
      "FROSTO is an online shopping system created using PHP and MySQL. It includes product browsing, customer-side features, admin management, and a clean user interface.",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    features: [
      "Product listing",
      "Admin product management",
      "Customer browsing",
      "Responsive pages",
      "Database integration",
    ],
    githubUrl: "https://github.com/tharunsasanka/FrostoOnlineShopping",
    liveUrl: "#",
    status: "Completed",
  },
  {
    id: 3,
    title: "ClubSphere",
    category: "Java",
    description:
      "A club and events management system built for university group project work.",
    longDescription:
      "ClubSphere is a Java-based web application for managing clubs, events, members, and student activities. It was designed as a structured academic project with database integration.",
    technologies: ["Java", "JSP", "Servlets", "MySQL", "Bootstrap"],
    features: [
      "Club management",
      "Event management",
      "Member management",
      "Database CRUD operations",
      "Responsive UI",
    ],
    githubUrl: "https://github.com/tharunsasanka/ClubSphere",
    liveUrl: "#",
    status: "Completed",
  },
  {
    id: 4,
    title: "Hostel Management System",
    category: "Desktop App",
    description:
      "A C# desktop application for managing hostel-related records and operations.",
    longDescription:
      "A Windows desktop application created to manage hostel records, students, rooms, and related administrative tasks using a structured desktop application approach.",
    technologies: ["C#", ".NET", "SQL Server", "Windows Forms"],
    features: [
      "Student records",
      "Room management",
      "Admin controls",
      "Database connection",
      "Desktop UI",
    ],
    githubUrl: "https://github.com/tharunsasanka/Hostel-Management-System",
    liveUrl: "#",
    status: "Completed",
  },
  {
    id: 5,
    title: "AI Digital Forensics Assistant",
    category: "Cybersecurity",
    description:
      "A planned cybersecurity research project for log analysis and incident investigation.",
    longDescription:
      "An AI-powered assistant concept for digital forensics, incident response, log analysis, and threat investigation. This project is planned as a strong individual cybersecurity research project.",
    technologies: ["Python", "AI", "Cybersecurity", "Log Analysis", "React"],
    features: [
      "Log analysis",
      "Threat investigation support",
      "Incident report generation",
      "Dataset-based evaluation",
      "Research-focused workflow",
    ],
    githubUrl: "#",
    liveUrl: "#",
    status: "Planning",
  },
  {
    id: 6,
    title: "Sripalee College Website",
    category: "Website",
    description:
      "A school website concept with pages for history, events, news, clubs, and contact.",
    longDescription:
      "A modern school website concept designed with responsive pages, structured content sections, and clean navigation for students, staff, and visitors.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP"],
    features: [
      "School information pages",
      "Events section",
      "News section",
      "Contact section",
      "Responsive design",
    ],
    githubUrl: "https://github.com/tharunsasanka/SPC_TemporyWeb",
    liveUrl: "#",
    status: "Completed",
  },
];