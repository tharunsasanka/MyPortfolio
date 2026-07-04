import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { ElementType } from "react";
import {
  HiCodeBracket,
  HiCpuChip,
  HiGlobeAlt,
  HiServerStack,
  HiShieldCheck,
  HiWrenchScrewdriver,
} from "react-icons/hi2";
import {
  SiGithub,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiNodedotjs,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { getSkills, type Skill } from "@/services/skillService";

function getIcon(icon: string) {
  const normalizedIcon = icon.toLowerCase();

  const iconMap: Record<string, ElementType> = {
    react: SiReact,
    typescript: SiTypescript,
    javascript: SiJavascript,
    nodejs: SiNodedotjs,
    mongodb: SiMongodb,
    linux: SiLinux,
    github: SiGithub,
    git: SiGithub,
    shield: HiShieldCheck,
    cybersecurity: HiShieldCheck,
    security: HiShieldCheck,
    backend: HiServerStack,
    server: HiServerStack,
    frontend: HiCodeBracket,
    code: HiCodeBracket,
    network: HiGlobeAlt,
    networking: HiGlobeAlt,
    tools: HiWrenchScrewdriver,
  };

  return iconMap[normalizedIcon] || HiCpuChip;
}

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSkills() {
      try {
        const data = await getSkills();
        setSkills(data);
      } catch {
        setSkills([]);
      } finally {
        setLoading(false);
      }
    }

    loadSkills();
  }, []);

  const groupedSkills = useMemo(() => {
    return skills.reduce<Record<string, Skill[]>>((groups, skill) => {
      if (!groups[skill.category]) {
        groups[skill.category] = [];
      }

      groups[skill.category].push(skill);
      return groups;
    }, {});
  }, [skills]);

  return (
    <section id="skills" className="mx-auto max-w-7xl px-5 py-24">
      <SectionHeading
        eyebrow="Skills"
        title="Technical skills and tools I use"
        description="A practical skill set focused on cybersecurity, modern web development, backend systems, databases, and tools."
      />

      {loading && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <Card
              key={item}
              className="border-border bg-card/70 backdrop-blur-xl"
            >
              <CardContent className="space-y-4 p-6">
                <div className="h-12 w-12 animate-pulse rounded-2xl bg-muted" />
                <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-2 w-full animate-pulse rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && skills.length === 0 && (
        <Card className="mx-auto max-w-2xl border-border bg-card/70 text-center backdrop-blur-xl">
          <CardContent className="p-8">
            <HiCpuChip className="mx-auto mb-4 text-5xl text-primary" />
            <h3 className="text-2xl font-bold">No skills found yet</h3>
            <p className="mt-3 text-muted-foreground">
              Skills will appear here after you add them from the hidden admin
              dashboard.
            </p>
          </CardContent>
        </Card>
      )}

      {!loading && skills.length > 0 && (
        <div className="space-y-10">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                  {category}
                </h3>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {categorySkills.map((skill, index) => {
                  const Icon = getIcon(skill.icon || skill.name);

                  return (
                    <motion.div
                      key={skill._id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.45 }}
                    >
                      <Card className="cyber-card group h-full border-border bg-card/70 backdrop-blur-xl transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_35px_rgba(0,229,255,0.12)]">
                        <CardContent className="p-6">
                          <div className="mb-5 flex items-center justify-between">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:scale-110">
                              <Icon className="text-3xl" />
                            </div>

                            <span className="text-sm font-semibold text-primary">
                              {skill.level}%
                            </span>
                          </div>

                          <h4 className="text-xl font-bold">{skill.name}</h4>

                          <p className="mt-3 min-h-12 text-sm leading-6 text-muted-foreground">
                            {skill.description}
                          </p>

                          <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.15, duration: 0.8 }}
                              className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}