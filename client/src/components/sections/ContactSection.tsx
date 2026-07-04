import { useState } from "react";
import {
  HiEnvelope,
  HiMapPin,
  HiPaperAirplane,
  HiPhone,
} from "react-icons/hi2";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/data/profile";

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactSection() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitted(true);
    setForm(initialForm);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  }

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-24">
      <SectionHeading
        eyebrow="Contact"
        title="Let’s build something secure and modern"
        description="Have a project idea, collaboration request, or cybersecurity-related opportunity? Send me a message."
      />

      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          <Card className="cyber-card cyber-card border-border bg-card/70 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <HiEnvelope className="text-2xl" />
              </div>

              <h3 className="text-xl font-bold">Email</h3>

              <a
                href={`mailto:${profile.email}`}
                className="mt-2 block break-all text-muted-foreground transition hover:text-primary"
              >
                {profile.email}
              </a>
            </CardContent>
          </Card>

          <Card className="cyber-card border-border bg-card/70 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <HiMapPin className="text-2xl" />
              </div>

              <h3 className="text-xl font-bold">Location</h3>

              <p className="mt-2 text-muted-foreground">{profile.location}</p>
            </CardContent>
          </Card>

          <Card className="cyber-card border-border bg-card/70 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <HiPhone className="text-2xl" />
              </div>

              <h3 className="text-xl font-bold">Social Links</h3>

              <div className="mt-4 flex flex-wrap gap-3">
                {profile.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground transition hover:border-primary/50 hover:text-primary"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="cyber-card border-border bg-card/70 backdrop-blur-xl">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-muted-foreground">
                      Your Name
                    </label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                      className="border-border bg-background/60"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-muted-foreground">
                      Your Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                      className="border-border bg-background/60"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Subject
                  </label>
                  <Input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project, collaboration, or question"
                    className="border-border bg-background/60"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={7}
                    placeholder="Write your message..."
                    className="resize-none border-border bg-background/60"
                  />
                </div>

                {submitted && (
                  <div className="rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
                    Message prepared successfully. Backend message saving will
                    be connected in the next full-stack phase.
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Send Message
                  <HiPaperAirplane className="ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}