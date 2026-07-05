import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  HiAcademicCap,
  HiCodeBracket,
  HiEnvelope,
  HiMapPin,
  HiShieldCheck,
} from "react-icons/hi2";
import { getProfile, type Profile } from "@/services/profileService";

const fallbackProfile: Omit<Profile, "_id" | "createdAt" | "updatedAt"> = {
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
};

export function AboutSection() {
  const [profile, setProfile] = useState(fallbackProfile);

  useEffect(() => {
    async function loadProfile() {
      try {
        const profileData = await getProfile();
        setProfile(profileData);
      } catch {
        setProfile(fallbackProfile);
      }
    }

    void loadProfile();
  }, []);

  const aboutCards = [
    {
      title: "Cybersecurity",
      description: "Ethical hacking, secure systems, and defensive thinking.",
      icon: HiShieldCheck,
    },
    {
      title: "Development",
      description: "Modern web apps using React, Node.js, and databases.",
      icon: HiCodeBracket,
    },
    {
      title: "Learning",
      description: "Always improving through labs, projects, and research.",
      icon: HiAcademicCap,
    },
  ];

  return (
    <section id="about" className="relative px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
            {profile.aboutEyebrow}
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            {profile.aboutTitle}
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {profile.aboutDescription}
          </p>

          {profile.aboutSecondDescription && (
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              {profile.aboutSecondDescription}
            </p>
          )}
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {aboutCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                className="cyber-card rounded-[2rem] border border-border bg-card/60 p-7 backdrop-blur-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
                  <Icon className="text-3xl text-primary" />
                </div>

                <h3 className="text-xl font-black">{card.title}</h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-10 grid gap-6 md:grid-cols-2"
        >
          <div className="cyber-card rounded-[2rem] border border-border bg-card/60 p-7 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
                <HiMapPin className="text-3xl text-primary" />
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
                  Location
                </p>
                <h3 className="mt-1 text-xl font-black">{profile.location}</h3>
              </div>
            </div>
          </div>

          <div className="cyber-card rounded-[2rem] border border-border bg-card/60 p-7 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
                <HiEnvelope className="text-3xl text-primary" />
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
                  Email
                </p>
                <h3 className="mt-1 break-all text-xl font-black">
                  {profile.email}
                </h3>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}