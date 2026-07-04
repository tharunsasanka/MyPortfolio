import { motion } from "framer-motion";
import {
  HiArrowTopRightOnSquare,
  HiCheckBadge,
  HiIdentification,
} from "react-icons/hi2";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/common/SectionHeading";
import { certificates } from "@/data/certificates";

export function CertificatesSection() {
  return (
    <section id="certificates" className="mx-auto max-w-7xl px-5 py-24">
      <SectionHeading
        eyebrow="Certificates"
        title="Learning proof and verified achievements"
        description="Certificates and learning progress that show my continuous improvement in cybersecurity, development, and technology."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {certificates.map((certificate, index) => (
          <motion.div
            key={certificate.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.45 }}
          >
            <Card className="group h-full overflow-hidden cyber-card border-border bg-card/70 backdrop-blur-xl transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_35px_rgba(0,229,255,0.12)]">
              <CardContent className="flex h-full flex-col p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:scale-110">
                    <HiCheckBadge className="text-3xl" />
                  </div>

                  <Badge
                    variant="outline"
                    className="border-border text-muted-foreground"
                  >
                    {certificate.status}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold leading-tight text-foreground">
                  {certificate.title}
                </h3>

                <p className="mt-3 text-sm font-medium text-primary">
                  {certificate.issuer}
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Issued: {certificate.issueDate}
                </p>

                <div className="mt-5 flex items-start gap-2 rounded-2xl border border-border bg-background/60 p-3 text-sm text-muted-foreground">
                  <HiIdentification className="mt-0.5 shrink-0 text-primary" />
                  <span className="break-all">{certificate.credentialId}</span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {certificate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  <Button
                    onClick={() => {
                      if (certificate.verificationUrl !== "#") {
                        window.open(certificate.verificationUrl, "_blank");
                      }
                    }}
                    className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Verify Certificate
                    <HiArrowTopRightOnSquare className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}