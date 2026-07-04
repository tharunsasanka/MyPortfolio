import { AboutSection } from "@/components/sections/AboutSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CyberLabsSection } from "@/components/sections/CyberLabsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificatesSection />
      <CyberLabsSection />
      <ContactSection />
    </>
  );
}