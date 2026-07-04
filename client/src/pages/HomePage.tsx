import { AboutSection } from "@/components/sections/AboutSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
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

      <section id="contact" className="mx-auto max-w-7xl px-5 py-24">
        <h2 className="text-3xl font-bold">Contact</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Contact form and social links will be added here.
        </p>
      </section>
    </>
  );
}