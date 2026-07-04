import { motion } from "framer-motion";
import { HiAcademicCap, HiBolt, HiShieldCheck } from "react-icons/hi2";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/common/SectionHeading";
import { aboutHighlights, educationTimeline } from "@/data/about";

const icons = [HiShieldCheck, HiBolt, HiAcademicCap];

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24">
      <SectionHeading
        eyebrow="About Me"
        title="Building secure and modern digital experiences"
        description="I focus on cybersecurity, software development, and creative design to build useful, professional, and visually strong digital solutions."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {aboutHighlights.map((item, index) => {
          const Icon = icons[index];

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <Card className="h-full cyber-card border-border bg-card/70 backdrop-blur-xl transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_35px_rgba(0,229,255,0.12)]">
                <CardContent className="p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="text-2xl" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Card className="cyber-card border-border bg-card/70 backdrop-blur-xl">
          <CardContent className="p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Profile
            </p>

            <h3 className="mt-4 text-2xl font-bold">Who I Am</h3>

            <p className="mt-5 leading-8 text-muted-foreground">
              I am a cybersecurity-focused computing student interested in
              ethical hacking, web application security, and full-stack
              development. My goal is to build professional systems that are not
              only visually impressive but also secure, scalable, and easy to
              use.
            </p>

            <p className="mt-5 leading-8 text-muted-foreground">
              This portfolio is designed to showcase my projects, certificates,
              skills, and continuous learning progress on platforms like
              TryHackMe and Hack The Box.
            </p>
          </CardContent>
        </Card>

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-border" />

          <div className="space-y-6">
            {educationTimeline.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="relative pl-12"
              >
                <span className="absolute left-[9px] top-2 h-4 w-4 rounded-full border-4 border-background bg-primary shadow-[0_0_20px_rgba(0,229,255,0.8)]" />

                <Card className="cyber-card border-border bg-card/70 backdrop-blur-xl">
                  <CardContent className="p-6">
                    <p className="text-sm font-semibold text-primary">
                      {item.year}
                    </p>

                    <h3 className="mt-2 text-xl font-bold">{item.title}</h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.place}
                    </p>

                    <p className="mt-4 leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}