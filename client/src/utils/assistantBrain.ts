import { certificates } from "@/data/certificates";
import { cyberLabPlatforms } from "@/data/cyberLabs";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

function formatList(items: string[]) {
  return items.map((item) => `• ${item}`).join("\n");
}

export function getAssistantReply(question: string): string {
  const query = question.toLowerCase().trim();

  if (!query) {
    return "Please ask me something about Tharun, his projects, skills, certificates, or cybersecurity learning progress.";
  }

  if (
    query.includes("about") ||
    query.includes("who") ||
    query.includes("tharun")
  ) {
    return `${profile.name} is a cybersecurity-focused computing student from ${profile.location}. He is interested in ethical hacking, full-stack development, secure web applications, and creative technology.\n\n${profile.summary}`;
  }

  if (
    query.includes("project") ||
    query.includes("work") ||
    query.includes("latest")
  ) {
    const projectList = projects
      .slice(0, 5)
      .map(
        (project) =>
          `• ${project.title} — ${project.description} [${project.status}]`
      )
      .join("\n");

    return `Here are some featured projects:\n\n${projectList}\n\nYou can scroll to the Projects section to preview each project in detail.`;
  }

  if (
    query.includes("skill") ||
    query.includes("technology") ||
    query.includes("technologies") ||
    query.includes("programming")
  ) {
    const topSkills = skills
      .slice(0, 10)
      .map((skill) => `• ${skill.name} — ${skill.category} (${skill.level}%)`)
      .join("\n");

    return `Tharun works with these technologies and tools:\n\n${topSkills}`;
  }

  if (
    query.includes("cyber") ||
    query.includes("security") ||
    query.includes("hacking") ||
    query.includes("pentest")
  ) {
    const cyberSkills = skills
      .filter((skill) => skill.category === "Cybersecurity")
      .map((skill) => `• ${skill.name} — ${skill.tools.join(", ")}`)
      .join("\n");

    return `Tharun is focused on cybersecurity learning and practical labs.\n\nCybersecurity tools and areas:\n\n${cyberSkills || "• Web Security\n• Linux\n• Networking\n• OWASP\n• TryHackMe\n• Hack The Box"}`;
  }

  if (
    query.includes("certificate") ||
    query.includes("certification") ||
    query.includes("cert")
  ) {
    const certificateList = certificates
      .map(
        (certificate) =>
          `• ${certificate.title} — ${certificate.issuer} (${certificate.status})`
      )
      .join("\n");

    return `Here are the certificates and learning achievements currently listed:\n\n${certificateList}`;
  }

  if (query.includes("tryhackme") || query.includes("try hack me")) {
    const tryHackMe = cyberLabPlatforms.find(
      (platform) => platform.name === "TryHackMe"
    );

    if (!tryHackMe) {
      return "TryHackMe details are not available yet.";
    }

    return `TryHackMe status:\n\nUsername: ${tryHackMe.username}\nRank: ${tryHackMe.rank}\nStatus: ${tryHackMe.status}\n\nProgress:\n${tryHackMe.progress
      .map((item) => `• ${item.label}: ${item.value}%`)
      .join("\n")}`;
  }

  if (
    query.includes("hack the box") ||
    query.includes("hackthebox") ||
    query.includes("htb")
  ) {
    const htb = cyberLabPlatforms.find(
      (platform) => platform.name === "Hack The Box"
    );

    if (!htb) {
      return "Hack The Box details are not available yet.";
    }

    return `Hack The Box status:\n\nUsername: ${htb.username}\nRank: ${htb.rank}\nStatus: ${htb.status}\n\nProgress:\n${htb.progress
      .map((item) => `• ${item.label}: ${item.value}%`)
      .join("\n")}`;
  }

  if (
    query.includes("contact") ||
    query.includes("email") ||
    query.includes("hire")
  ) {
    return `You can contact Tharun through:\n\nEmail: ${profile.email}\nLocation: ${profile.location}\n\nSocial links:\n${profile.socials
      .map((social) => `• ${social.label}: ${social.href}`)
      .join("\n")}`;
  }

  if (query.includes("service") || query.includes("offer")) {
    return `Tharun can help with:\n\n${formatList([
      "Modern portfolio websites",
      "Full-stack web development",
      "Frontend UI design",
      "Cybersecurity learning projects",
      "Basic website security improvements",
      "Technical documentation",
    ])}`;
  }

  if (query.includes("education") || query.includes("university")) {
    return "Tharun is a computing undergraduate focused on cybersecurity, software development, and practical project-based learning.";
  }

  return "I can answer questions about Tharun’s projects, skills, certificates, cybersecurity learning status, TryHackMe, Hack The Box, services, and contact details. Try asking: “Show your projects” or “What cybersecurity skills do you have?”";
}