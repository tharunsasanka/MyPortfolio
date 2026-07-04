import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  HiArrowTopRightOnSquare,
  HiBolt,
  HiShieldCheck,
} from "react-icons/hi2";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/common/SectionHeading";
import { getCyberLabs, type CyberLab } from "@/services/cyberLabService";

export function CyberLabsSection() {
  const [cyberLabs, setCyberLabs] = useState<CyberLab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCyberLabs() {
      try {
        const data = await getCyberLabs();
        setCyberLabs(data);
      } catch {
        setCyberLabs([]);
      } finally {
        setLoading(false);
      }
    }

    loadCyberLabs();
  }, []);

  const learningAreas = useMemo(() => {
    const areas = cyberLabs.flatMap((lab) => lab.learningAreas);
    return [...new Set(areas)];
  }, [cyberLabs]);

  return (
    <section id="cyber-labs" className="mx-auto max-w-7xl px-5 py-24">
      <SectionHeading
        eyebrow="Cyber Labs"
        title="My cybersecurity learning status"
        description="A focused overview of my hands-on cybersecurity learning progress through TryHackMe, Hack The Box, and practical lab-based training."
      />

      {loading && (
        <div className="grid gap-6 lg:grid-cols-2">
          {[1, 2].map((item) => (
            <Card
              key={item}
              className="border-border bg-card/70 backdrop-blur-xl"
            >
              <CardContent className="space-y-5 p-7">
                <div className="h-8 w-40 animate-pulse rounded bg-muted" />
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-20 animate-pulse rounded-2xl bg-muted" />
                  <div className="h-20 animate-pulse rounded-2xl bg-muted" />
                  <div className="h-20 animate-pulse rounded-2xl bg-muted" />
                </div>
                <div className="h-32 animate-pulse rounded-2xl bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && cyberLabs.length === 0 && (
        <Card className="mx-auto max-w-2xl border-border bg-card/70 text-center backdrop-blur-xl">
          <CardContent className="p-8">
            <HiShieldCheck className="mx-auto mb-4 text-5xl text-primary" />
            <h3 className="text-2xl font-bold">No cyber labs found yet</h3>
            <p className="mt-3 text-muted-foreground">
              Cyber lab data will appear here after you add it from the hidden
              admin dashboard.
            </p>
          </CardContent>
        </Card>
      )}

      {!loading && cyberLabs.length > 0 && (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            {cyberLabs.map((platform, index) => (
              <motion.div
                key={platform._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
              >
                <Card className="cyber-card h-full overflow-hidden border-border bg-card/70 backdrop-blur-xl transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_35px_rgba(0,229,255,0.12)]">
                  <CardContent className="p-7">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <Badge className="mb-4 border border-primary/30 bg-primary/10 text-primary hover:bg-primary/10">
                          {platform.status}
                        </Badge>

                        <h3 className="text-3xl font-black text-foreground">
                          {platform.name}
                        </h3>

                        <p className="mt-2 text-muted-foreground">
                          @{platform.username}
                        </p>
                      </div>

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <HiShieldCheck className="text-3xl" />
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {platform.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-2xl border border-border bg-background/60 p-4"
                        >
                          <p className="text-xl font-bold text-primary">
                            {stat.value}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-7 space-y-5">
                      {platform.progress.map((item) => (
                        <div key={item.label}>
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {item.label}
                            </span>
                            <span className="font-semibold text-primary">
                              {item.value}%
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-muted">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.value}%` }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.2, duration: 0.8 }}
                              className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                      <p className="text-sm text-muted-foreground">
                        Current rank:{" "}
                        <span className="font-semibold text-foreground">
                          {platform.rank}
                        </span>
                      </p>

                      <Button
                        onClick={() => window.open(platform.profileUrl, "_blank")}
                        className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        View Profile
                        <HiArrowTopRightOnSquare className="ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="cyber-card mt-10 border-border bg-card/70 backdrop-blur-xl">
            <CardContent className="p-7">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                    Learning Areas
                  </p>

                  <h3 className="mt-3 text-2xl font-bold">
                    Topics I am actively improving
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <HiBolt className="text-2xl" />
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                {learningAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground transition hover:border-primary/50 hover:text-primary"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </section>
  );
}