import { HeroSection } from "@/components/sections/HeroSection";

export function HomePage() {
  return (
    <>
      <HeroSection />

      <section id="about" className="mx-auto max-w-7xl px-5 py-24">
        <h2 className="text-3xl font-bold">About</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          This section will include your biography, education, achievements, and
          cybersecurity learning journey.
        </p>
      </section>

      <section id="skills" className="mx-auto max-w-7xl px-5 py-24">
        <h2 className="text-3xl font-bold">Skills</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Interactive skills will be added here.
        </p>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-5 py-24">
        <h2 className="text-3xl font-bold">Projects</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Project cards and preview modals will be added here.
        </p>
      </section>

      <section id="certificates" className="mx-auto max-w-7xl px-5 py-24">
        <h2 className="text-3xl font-bold">Certificates</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Certificate verification cards will be added here.
        </p>
      </section>

      <section id="cyber-labs" className="mx-auto max-w-7xl px-5 py-24">
        <h2 className="text-3xl font-bold">Cyber Labs</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          TryHackMe and Hack The Box learning status will be shown here.
        </p>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-5 py-24">
        <h2 className="text-3xl font-bold">Contact</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Contact form and social links will be added here.
        </p>
      </section>
    </>
  );
}