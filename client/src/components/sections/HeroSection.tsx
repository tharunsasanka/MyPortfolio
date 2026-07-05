import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  HiArrowDownTray,
  HiArrowRight,
  HiCodeBracket,
  HiEnvelope,
  HiShieldCheck,
} from "react-icons/hi2";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { getProfile, type Profile } from "@/services/profileService";
import { scrollToSection } from "@/utils/scrollToSection";

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
    "I am a cybersecurity student and full-stack developer from Sri Lanka.",
  aboutSecondDescription:
    "My goal is to grow as an ethical hacker and developer by building real-world projects.",
  location: "Sri Lanka",
  email: "tharunsasanka1234@gmail.com",
  profileImageUrl: "",
};

export function HeroSection() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [cardStyle, setCardStyle] = useState({
    rotateX: "0deg",
    rotateY: "0deg",
    glowX: "50%",
    glowY: "50%",
  });

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

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const middleX = rect.width / 2;
    const middleY = rect.height / 2;

    const rotateY = ((x - middleX) / middleX) * 7;
    const rotateX = -((y - middleY) / middleY) * 7;

    setCardStyle({
      rotateX: `${rotateX}deg`,
      rotateY: `${rotateY}deg`,
      glowX: `${(x / rect.width) * 100}%`,
      glowY: `${(y / rect.height) * 100}%`,
    });
  }

  function handleMouseLeave() {
    setCardStyle({
      rotateX: "0deg",
      rotateY: "0deg",
      glowX: "50%",
      glowY: "50%",
    });
  }

  function openLink(url: string) {
    if (!url || url === "#") return;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-[1500px] items-start justify-center px-5 pb-16 pt-5"
    >
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65 }}
        className="hero-reference-stage hero-reference-stage-wide"
      >
        <div className="hero-reference-orbit hero-reference-orbit-one" />
        <div className="hero-reference-orbit hero-reference-orbit-two" />
        <div className="hero-reference-orbit hero-reference-orbit-three" />

        <div className="hero-reference-particles">
          {Array.from({ length: 34 }).map((_, index) => (
            <span
              key={index}
              style={
                {
                  "--x": `${(index * 37) % 100}%`,
                  "--y": `${(index * 53) % 100}%`,
                  "--delay": `${index * 0.2}s`,
                  "--duration": `${5 + (index % 6)}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div
          className="hero-reference-card hero-reference-card-final"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={
            {
              "--hero-rotate-x": cardStyle.rotateX,
              "--hero-rotate-y": cardStyle.rotateY,
              "--hero-glow-x": cardStyle.glowX,
              "--hero-glow-y": cardStyle.glowY,
            } as React.CSSProperties
          }
        >
          <div className="hero-reference-left-glow" />
          <div className="hero-reference-right-glow" />
          <div className="hero-cursor-glow" />
          <div className="hero-card-moving-shine" />

          <div className="hero-reference-status">
            <span />
            ACTIVE
          </div>

          <div className="hero-reference-shield hero-reference-shield-final">
            <HiShieldCheck />
          </div>

          <div className="hero-reference-content hero-reference-content-final">
            <div className="hero-reference-main">
              <div className="hero-reference-badge">
                <HiShieldCheck />
                {profile.badgeText}
              </div>

              <p className="hero-reference-code">{profile.codeText}</p>

              <h1 className="hero-reference-title hero-reference-title-final">
                I&apos;m {profile.name.split(" ")[0] || profile.name}
                <span>
                  {profile.name.split(" ").slice(1).join(" ") ||
                    profile.highlightedHeadline}
                </span>
              </h1>

              <h2 className="hero-reference-role hero-reference-role-final">
                {profile.headline} <span>{profile.highlightedHeadline}</span>
              </h2>

              <p className="hero-reference-description hero-reference-description-final">
                {profile.heroDescription}
              </p>

              <div className="hero-reference-actions hero-reference-actions-final">
                <Button
                  type="button"
                  onClick={() => scrollToSection("projects")}
                  className="hero-reference-primary-btn"
                >
                  View Projects
                  <HiArrowRight />
                </Button>

                <Button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className="hero-reference-secondary-btn"
                >
                  Contact Me
                </Button>

                <Button
                  type="button"
                  onClick={() => openLink(profile.cvUrl)}
                  className="hero-reference-secondary-btn"
                >
                  <HiArrowDownTray />
                  CV
                </Button>
              </div>
            </div>

            <div className="hero-reference-bottom hero-reference-bottom-final">
              <div className="hero-reference-socials">
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => openLink(profile.githubUrl)}
                >
                  <FaGithub />
                </Button>

                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => openLink(profile.linkedinUrl)}
                >
                  <FaLinkedin />
                </Button>

                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => scrollToSection("contact")}
                >
                  <HiEnvelope />
                </Button>
              </div>

              <div className="hero-reference-stack">
                <HiCodeBracket />
                {profile.techStackText}
              </div>

              <div className="hero-reference-stats">
                <div>
                  <h3>{profile.projectsStat}</h3>
                  <p>{profile.projectsLabel}</p>
                </div>

                <div>
                  <h3>{profile.domainsStat}</h3>
                  <p>{profile.domainsLabel}</p>
                </div>

                <div>
                  <h3>{profile.learningStat}</h3>
                  <p>{profile.learningLabel}</p>
                </div>
              </div>

              <div className="hero-reference-info hero-reference-info-final">
                <div>
                  <p>Status</p>
                  <h3>{profile.statusText}</h3>
                </div>

                <div>
                  <p>Contact</p>
                  <h3>{profile.contactText}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-reference-scroll">
          <div>
            <span />
          </div>
          <p>Scroll Down</p>
        </div>
      </motion.div>
    </section>
  );
}