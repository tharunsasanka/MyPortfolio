import { useState } from "react";
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
import { scrollToSection } from "@/utils/scrollToSection";

export function HeroSection() {
  const [cardStyle, setCardStyle] = useState({
    rotateX: "0deg",
    rotateY: "0deg",
    glowX: "50%",
    glowY: "50%",
  });

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
                Cyber Security
              </div>

              <p className="hero-reference-code">&lt;Hello World /&gt;</p>

              <h1 className="hero-reference-title hero-reference-title-final">
                I&apos;m Tharun
                <span>Sasanka</span>
              </h1>

              <h2 className="hero-reference-role hero-reference-role-final">
                I&apos;m a{" "}
                <span>Cybersecurity Student & Full-Stack Developer</span>
              </h2>

              <p className="hero-reference-description hero-reference-description-final">
                I am Tharun Sasanka, a cybersecurity student, ethical hacking
                learner, and developer focused on building secure web
                applications, digital systems, and cyber-focused projects.
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
                  onClick={() => window.open("/cv.pdf", "_blank")}
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
                  onClick={() =>
                    window.open("https://github.com/tharunsasanka", "_blank")
                  }
                >
                  <FaGithub />
                </Button>

                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => window.open("#", "_blank")}
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
                React • Node.js • MongoDB • Cybersecurity
              </div>

              <div className="hero-reference-stats">
                <div>
                  <h3>10+</h3>
                  <p>Projects</p>
                </div>

                <div>
                  <h3>4+</h3>
                  <p>Tech Domains</p>
                </div>

                <div>
                  <h3>24/7</h3>
                  <p>Learning Mode</p>
                </div>
              </div>

              <div className="hero-reference-info hero-reference-info-final">
                <div>
                  <p>Status</p>
                  <h3>Open to Projects</h3>
                </div>

                <div>
                  <p>Contact</p>
                  <h3>Available</h3>
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