import { useEffect, useState } from "react";
import {
  HiChartBar,
  HiIdentification,
  HiLink,
  HiUserCircle,
} from "react-icons/hi2";
import {
  getProfile,
  updateProfile,
  type ProfileFormData,
} from "@/services/profileService";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ProfileTab = "hero" | "links" | "stats" | "about";

const emptyProfile: ProfileFormData = {
  name: "",
  role: "",
  badgeText: "",
  codeText: "",
  headline: "",
  highlightedHeadline: "",
  heroDescription: "",

  githubUrl: "",
  linkedinUrl: "",
  cvUrl: "",

  statusText: "",
  contactText: "",
  learningText: "",
  techStackText: "",

  projectsStat: "",
  projectsLabel: "",
  domainsStat: "",
  domainsLabel: "",
  learningStat: "",
  learningLabel: "",

  aboutEyebrow: "",
  aboutTitle: "",
  aboutDescription: "",
  aboutSecondDescription: "",

  location: "",
  email: "",
  profileImageUrl: "",
};

const profileTabs = [
  {
    id: "hero" as const,
    title: "Hero Content",
    description: "Main homepage card text.",
    icon: HiUserCircle,
  },
  {
    id: "links" as const,
    title: "Links & Status",
    description: "Social links and availability.",
    icon: HiLink,
  },
  {
    id: "stats" as const,
    title: "Stats",
    description: "Project and learning counters.",
    icon: HiChartBar,
  },
  {
    id: "about" as const,
    title: "About Content",
    description: "About section information.",
    icon: HiIdentification,
  },
];

export function ProfileManager() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("hero");
  const [formData, setFormData] = useState<ProfileFormData>(emptyProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  async function loadProfile() {
    try {
      setIsLoading(true);
      setMessage("");

      const profile = await getProfile();

      setFormData({
        name: profile.name,
        role: profile.role,
        badgeText: profile.badgeText,
        codeText: profile.codeText,
        headline: profile.headline,
        highlightedHeadline: profile.highlightedHeadline,
        heroDescription: profile.heroDescription,

        githubUrl: profile.githubUrl,
        linkedinUrl: profile.linkedinUrl,
        cvUrl: profile.cvUrl,

        statusText: profile.statusText,
        contactText: profile.contactText,
        learningText: profile.learningText,
        techStackText: profile.techStackText,

        projectsStat: profile.projectsStat,
        projectsLabel: profile.projectsLabel,
        domainsStat: profile.domainsStat,
        domainsLabel: profile.domainsLabel,
        learningStat: profile.learningStat,
        learningLabel: profile.learningLabel,

        aboutEyebrow: profile.aboutEyebrow,
        aboutTitle: profile.aboutTitle,
        aboutDescription: profile.aboutDescription,
        aboutSecondDescription: profile.aboutSecondDescription,

        location: profile.location,
        email: profile.email,
        profileImageUrl: profile.profileImageUrl,
      });
    } catch {
      setMessageType("error");
      setMessage("Failed to load profile data.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void Promise.resolve().then(loadProfile);
  }, []);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSaving(true);
      setMessage("");

      await updateProfile(formData);

      setMessageType("success");
      setMessage("Profile updated successfully. Refresh the public page to see changes.");
    } catch {
      setMessageType("error");
      setMessage("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  }

  function renderActiveTab() {
    if (activeTab === "hero") {
      return (
        <Card className="border-border bg-card/70">
          <CardContent className="space-y-5 p-6">
            <SectionTitle
              icon={<HiUserCircle />}
              title="Hero Main Content"
              description="Edit the main card content shown at the top of your portfolio."
            />

            <div className="grid gap-5 md:grid-cols-2">
              <InputField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tharun Sasanka"
              />

              <InputField
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Cybersecurity Student & Full-Stack Developer"
              />

              <InputField
                label="Badge Text"
                name="badgeText"
                value={formData.badgeText}
                onChange={handleChange}
                placeholder="Cyber Security"
              />

              <InputField
                label="Code Text"
                name="codeText"
                value={formData.codeText}
                onChange={handleChange}
                placeholder="<Hello World />"
              />

              <InputField
                label="Headline"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                placeholder="I'm a"
              />

              <InputField
                label="Highlighted Headline"
                name="highlightedHeadline"
                value={formData.highlightedHeadline}
                onChange={handleChange}
                placeholder="Cybersecurity Student & Full-Stack Developer"
              />
            </div>

            <TextAreaField
              label="Hero Description"
              name="heroDescription"
              value={formData.heroDescription}
              onChange={handleChange}
              placeholder="Write your short hero introduction..."
            />
          </CardContent>
        </Card>
      );
    }

    if (activeTab === "links") {
      return (
        <Card className="border-border bg-card/70">
          <CardContent className="space-y-5 p-6">
            <SectionTitle
              icon={<HiLink />}
              title="Hero Links & Status"
              description="Edit social links, CV link, tech stack, and availability labels."
            />

            <div className="grid gap-5 md:grid-cols-2">
              <InputField
                label="GitHub URL"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/username"
              />

              <InputField
                label="LinkedIn URL"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
              />

              <InputField
                label="CV URL"
                name="cvUrl"
                value={formData.cvUrl}
                onChange={handleChange}
                placeholder="/cv.pdf"
              />

              <InputField
                label="Tech Stack Text"
                name="techStackText"
                value={formData.techStackText}
                onChange={handleChange}
                placeholder="React • Node.js • MongoDB • Cybersecurity"
              />

              <InputField
                label="Status Text"
                name="statusText"
                value={formData.statusText}
                onChange={handleChange}
                placeholder="Open to Projects"
              />

              <InputField
                label="Contact Text"
                name="contactText"
                value={formData.contactText}
                onChange={handleChange}
                placeholder="Available"
              />

              <InputField
                label="Learning Text"
                name="learningText"
                value={formData.learningText}
                onChange={handleChange}
                placeholder="24/7 Mode"
              />
            </div>
          </CardContent>
        </Card>
      );
    }

    if (activeTab === "stats") {
      return (
        <Card className="border-border bg-card/70">
          <CardContent className="space-y-5 p-6">
            <SectionTitle
              icon={<HiChartBar />}
              title="Hero Stats"
              description="Edit the three small statistic cards inside the hero card."
            />

            <div className="grid gap-5 md:grid-cols-3">
              <InputField
                label="Projects Stat"
                name="projectsStat"
                value={formData.projectsStat}
                onChange={handleChange}
                placeholder="10+"
              />

              <InputField
                label="Projects Label"
                name="projectsLabel"
                value={formData.projectsLabel}
                onChange={handleChange}
                placeholder="Projects"
              />

              <InputField
                label="Domains Stat"
                name="domainsStat"
                value={formData.domainsStat}
                onChange={handleChange}
                placeholder="4+"
              />

              <InputField
                label="Domains Label"
                name="domainsLabel"
                value={formData.domainsLabel}
                onChange={handleChange}
                placeholder="Tech Domains"
              />

              <InputField
                label="Learning Stat"
                name="learningStat"
                value={formData.learningStat}
                onChange={handleChange}
                placeholder="24/7"
              />

              <InputField
                label="Learning Label"
                name="learningLabel"
                value={formData.learningLabel}
                onChange={handleChange}
                placeholder="Learning Mode"
              />
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <p className="text-sm font-semibold text-primary">
                Preview:
              </p>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <PreviewStat
                  value={formData.projectsStat || "10+"}
                  label={formData.projectsLabel || "Projects"}
                />
                <PreviewStat
                  value={formData.domainsStat || "4+"}
                  label={formData.domainsLabel || "Tech Domains"}
                />
                <PreviewStat
                  value={formData.learningStat || "24/7"}
                  label={formData.learningLabel || "Learning Mode"}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="border-border bg-card/70">
        <CardContent className="space-y-5 p-6">
          <SectionTitle
            icon={<HiIdentification />}
            title="About Section"
            description="Edit your public About section text, location, and email."
          />

          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              label="About Eyebrow"
              name="aboutEyebrow"
              value={formData.aboutEyebrow}
              onChange={handleChange}
              placeholder="About Me"
            />

            <InputField
              label="About Title"
              name="aboutTitle"
              value={formData.aboutTitle}
              onChange={handleChange}
              placeholder="Cybersecurity learner and full-stack developer"
            />

            <InputField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Sri Lanka"
            />

            <InputField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
            />

            <InputField
              label="Profile Image URL"
              name="profileImageUrl"
              value={formData.profileImageUrl}
              onChange={handleChange}
              placeholder="https://example.com/profile.png"
            />
          </div>

          <TextAreaField
            label="About Description"
            name="aboutDescription"
            value={formData.aboutDescription}
            onChange={handleChange}
            placeholder="Write your main about section paragraph..."
          />

          <TextAreaField
            label="About Second Description"
            name="aboutSecondDescription"
            value={formData.aboutSecondDescription}
            onChange={handleChange}
            placeholder="Write your second about paragraph..."
          />
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="border-border bg-card/70">
        <CardContent className="p-6 text-muted-foreground">
          Loading profile editor...
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black">Profile Content</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Edit your Hero and About section content from one clean editor.
          </p>
        </div>

        <Button
          type="button"
          onClick={loadProfile}
          variant="outline"
          className="rounded-full border-border bg-transparent"
        >
          Reload
        </Button>
      </div>

      {message && (
        <div
          className={`mb-5 rounded-2xl border px-4 py-3 text-sm font-semibold ${
            messageType === "success"
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-destructive/30 bg-destructive/10 text-destructive"
          }`}
        >
          {message}
        </div>
      )}

      <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {profileTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className="text-left"
            >
              <Card
                className={`cyber-card h-full border-border transition hover:-translate-y-1 hover:border-primary/50 ${
                  isActive ? "bg-primary/10" : "bg-card/70"
                }`}
              >
                <CardContent className="p-5">
                  <Icon className="text-3xl text-primary" />

                  <h3 className="mt-4 text-lg font-black">{tab.title}</h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {tab.description}
                  </p>

                  {isActive && (
                    <div className="mt-4 inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      Active
                    </div>
                  )}
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {renderActiveTab()}

        <div className="sticky bottom-4 z-20 flex justify-end">
          <div className="rounded-full border border-border bg-background/75 p-2 backdrop-blur-xl">
            <Button
              type="submit"
              disabled={isSaving}
              className="rounded-full px-8"
            >
              {isSaving ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

type SectionTitleProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function SectionTitle({ icon, title, description }: SectionTitleProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-2xl text-primary">
        {icon}
      </div>

      <div>
        <h3 className="text-lg font-black">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  name: keyof ProfileFormData;
  value: string;
  placeholder?: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

function InputField({
  label,
  name,
  value,
  placeholder,
  onChange,
}: FieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-muted-foreground">
        {label}
      </span>

      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/50 focus:border-primary"
      />
    </label>
  );
}

function TextAreaField({
  label,
  name,
  value,
  placeholder,
  onChange,
}: FieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-muted-foreground">
        {label}
      </span>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={6}
        className="mt-2 w-full resize-none rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-muted-foreground/50 focus:border-primary"
      />
    </label>
  );
}

type PreviewStatProps = {
  value: string;
  label: string;
};

function PreviewStat({ value, label }: PreviewStatProps) {
  return (
    <div className="rounded-2xl border border-border bg-background/40 p-4">
      <h4 className="text-3xl font-black text-primary">{value}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}