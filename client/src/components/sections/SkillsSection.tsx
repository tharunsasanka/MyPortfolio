import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/common/SectionHeading";
import { skills } from "@/data/skills";

export function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-7xl px-5 py-24">
      <SectionHeading
        eyebrow="Technical Skills"
        title="Tools and technologies I work with"
        description="A focused set of development, cybersecurity, design, and database skills used in my learning journey and projects."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {skills.map((skill, index) => {
          const Icon = skill.icon;

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03, duration: 0.45 }}
            >
              <Card className="group h-full overflow-hidden cyber-card border-border bg-card/70 backdrop-blur-xl transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_35px_rgba(0,229,255,0.12)]">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:scale-110">
                      <Icon className="text-2xl" />
                    </div>

                    <Badge
                      variant="outline"
                      className="border-border text-muted-foreground"
                    >
                      {skill.category}
                    </Badge>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-foreground">
                    {skill.name}
                  </h3>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Level</span>
                      <span className="font-semibold text-primary">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary"
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2 opacity-80 transition group-hover:opacity-100">
                    {skill.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}