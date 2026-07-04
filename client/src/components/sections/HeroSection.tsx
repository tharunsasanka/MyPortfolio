import { motion } from "framer-motion";
import { HiArrowDownTray, HiArrowRight } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/data/profile";
import { scrollToSection } from "@/utils/scrollToSection";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center px-5 pt-20"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Badge className="mb-5 border border-primary/30 bg-primary/10 text-primary hover:bg-primary/10">
            Cybersecurity Portfolio
          </Badge>

          <h1 className="max-w-4xl text-5xl font-black tracking-tight text-foreground md:text-7xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {profile.name}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
            {profile.title}
          </p>

          <p className="mt-5 max-w-2xl leading-8 text-muted-foreground">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              type="button"
              onClick={() => scrollToSection("projects")}
              className="rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90"
            >
              View Projects
              <HiArrowRight className="ml-2" />
            </Button>

            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-7 py-2 text-sm"
            >
              Download CV
              <HiArrowDownTray className="ml-2" />
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
            {profile.stats.map((stat) => (
              <div
                key={stat.label}
                className="cyber-card rounded-2xl border border-border bg-card/60 p-4 backdrop-blur"
              >
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 blur-2xl" />

          <div className="cyber-card relative rounded-[2rem] border border-border bg-card/70 p-6 shadow-2xl backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-border bg-background/60 p-6">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
              </div>

              <div className="font-mono text-sm leading-8 text-muted-foreground">
                <p>
                  <span className="text-primary">$</span> whoami
                </p>
                <p className="text-foreground">Tharun Sasanka</p>

                <p className="mt-4">
                  <span className="text-primary">$</span> focus --current
                </p>
                <p className="text-foreground">
                  Cybersecurity • Web Development • Ethical Hacking
                </p>

                <p className="mt-4">
                  <span className="text-primary">$</span> status
                </p>
                <p className="text-accent">Learning. Building. Improving.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}