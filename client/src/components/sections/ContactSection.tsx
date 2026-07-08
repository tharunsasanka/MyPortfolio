import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiCheckCircle,
  HiEnvelope,
  HiMapPin,
  HiPaperAirplane,
  HiPhone,
} from "react-icons/hi2";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/common/SectionHeading";
import { sendContactMessage } from "@/services/contactService";

const contactInfo = [
  {
    icon: HiEnvelope,
    label: "Email",
    value: "tharunsasanka1234@gmail.com",
    href: "mailto:tharunsasanka1234@gmail.com",
  },
  {
    icon: HiPhone,
    label: "Phone",
    value: "Contact Available",
    href: "tel:+94715631787",
  },
  {
    icon: HiMapPin,
    label: "Location",
    value: "Horana, Sri Lanka",
    href: "#",
  },
];

const socialLinks = [
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/tharunsasanka",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tharun-sasanka-8280ba2b4/",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/94715631787",
  },
];

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSending(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await sendContactMessage(form);

      setSuccessMessage("Message sent successfully. I will reply soon.");
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch {
      setErrorMessage("Message failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-24">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something secure and modern"
        description="Have a project, collaboration idea, or cybersecurity-related opportunity? Send me a message directly from this portfolio."
      />

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="space-y-6"
        >
          <Card className="cyber-card border-border bg-card/70 backdrop-blur-xl">
            <CardContent className="p-7">
              <h3 className="text-2xl font-black">Contact Details</h3>

              <div className="mt-6 space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-4 rounded-2xl border border-border bg-background/60 p-4 transition hover:border-primary/50 hover:bg-primary/5"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="text-2xl" />
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="font-semibold">{item.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="cyber-card border-border bg-card/70 backdrop-blur-xl">
            <CardContent className="p-7">
              <h3 className="text-2xl font-black">Social Links</h3>

              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Button
                      key={item.label}
                      type="button"
                      variant="outline"
                      onClick={() => {
                        if (item.href !== "#") {
                          window.open(item.href, "_blank");
                        }
                      }}
                      className="rounded-full border-border bg-transparent"
                    >
                      <Icon className="mr-2" />
                      {item.label}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <Card className="cyber-card border-border bg-card/70 backdrop-blur-xl">
            <CardContent className="p-7">
              <h3 className="text-2xl font-black">Send Message</h3>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-muted-foreground">
                      Name
                    </label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="border-border bg-background/60"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-muted-foreground">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
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
                    placeholder="Project inquiry"
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
                    rows={6}
                    placeholder="Write your message..."
                    className="resize-none border-border bg-background/60"
                  />
                </div>

                {successMessage && (
                  <div className="flex items-center gap-2 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
                    <HiCheckCircle className="text-xl" />
                    {successMessage}
                  </div>
                )}

                {errorMessage && (
                  <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                    {errorMessage}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {sending ? "Sending..." : "Send Message"}
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