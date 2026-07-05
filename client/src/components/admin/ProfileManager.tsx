import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  type ProfileFormData,
} from "@/services/profileService";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

export function ProfileManager() {
  const [formData, setFormData] = useState<ProfileFormData>(emptyProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setIsLoading(true);
        const profile = await getProfile();

        if (isMounted) {
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
        }
      } catch {
        if (isMounted) {
          setMessage("Failed to load profile data.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
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

      setMessage("Profile updated successfully.");
    } catch {
      setMessage("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
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
      <div className="mb-6">
        <h2 className="text-2xl font-black">Profile Content</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Edit your Hero and About section content from here.
        </p>
      </div>

      {message && (
        <div className="mb-5 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="border-border bg-card/70">
          <CardContent className="space-y-5 p-6">
            <h3 className="text-lg font-bold">Hero Main Content</h3>

            <div className="grid gap-5 md:grid-cols-2">
              <InputField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              <InputField
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              />

              <InputField
                label="Badge Text"
                name="badgeText"
                value={formData.badgeText}
                onChange={handleChange}
              />

              <InputField
                label="Code Text"
                name="codeText"
                value={formData.codeText}
                onChange={handleChange}
              />

              <InputField
                label="Headline"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
              />

              <InputField
                label="Highlighted Headline"
                name="highlightedHeadline"
                value={formData.highlightedHeadline}
                onChange={handleChange}
              />
            </div>

            <TextAreaField
              label="Hero Description"
              name="heroDescription"
              value={formData.heroDescription}
              onChange={handleChange}
            />
          </CardContent>
        </Card>

        <Card className="border-border bg-card/70">
          <CardContent className="space-y-5 p-6">
            <h3 className="text-lg font-bold">Hero Links & Status</h3>

            <div className="grid gap-5 md:grid-cols-2">
              <InputField
                label="GitHub URL"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
              />

              <InputField
                label="LinkedIn URL"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
              />

              <InputField
                label="CV URL"
                name="cvUrl"
                value={formData.cvUrl}
                onChange={handleChange}
              />

              <InputField
                label="Tech Stack Text"
                name="techStackText"
                value={formData.techStackText}
                onChange={handleChange}
              />

              <InputField
                label="Status Text"
                name="statusText"
                value={formData.statusText}
                onChange={handleChange}
              />

              <InputField
                label="Contact Text"
                name="contactText"
                value={formData.contactText}
                onChange={handleChange}
              />

              <InputField
                label="Learning Text"
                name="learningText"
                value={formData.learningText}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/70">
          <CardContent className="space-y-5 p-6">
            <h3 className="text-lg font-bold">Hero Stats</h3>

            <div className="grid gap-5 md:grid-cols-3">
              <InputField
                label="Projects Stat"
                name="projectsStat"
                value={formData.projectsStat}
                onChange={handleChange}
              />

              <InputField
                label="Projects Label"
                name="projectsLabel"
                value={formData.projectsLabel}
                onChange={handleChange}
              />

              <InputField
                label="Domains Stat"
                name="domainsStat"
                value={formData.domainsStat}
                onChange={handleChange}
              />

              <InputField
                label="Domains Label"
                name="domainsLabel"
                value={formData.domainsLabel}
                onChange={handleChange}
              />

              <InputField
                label="Learning Stat"
                name="learningStat"
                value={formData.learningStat}
                onChange={handleChange}
              />

              <InputField
                label="Learning Label"
                name="learningLabel"
                value={formData.learningLabel}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/70">
          <CardContent className="space-y-5 p-6">
            <h3 className="text-lg font-bold">About Section</h3>

            <div className="grid gap-5 md:grid-cols-2">
              <InputField
                label="About Eyebrow"
                name="aboutEyebrow"
                value={formData.aboutEyebrow}
                onChange={handleChange}
              />

              <InputField
                label="About Title"
                name="aboutTitle"
                value={formData.aboutTitle}
                onChange={handleChange}
              />

              <InputField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />

              <InputField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <InputField
                label="Profile Image URL"
                name="profileImageUrl"
                value={formData.profileImageUrl}
                onChange={handleChange}
              />
            </div>

            <TextAreaField
              label="About Description"
              name="aboutDescription"
              value={formData.aboutDescription}
              onChange={handleChange}
            />

            <TextAreaField
              label="About Second Description"
              name="aboutSecondDescription"
              value={formData.aboutSecondDescription}
              onChange={handleChange}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSaving}
            className="rounded-full px-8"
          >
            {isSaving ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
}

type FieldProps = {
  label: string;
  name: keyof ProfileFormData;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

function InputField({ label, name, value, onChange }: FieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-muted-foreground">
        {label}
      </span>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-primary"
      />
    </label>
  );
}

function TextAreaField({ label, name, value, onChange }: FieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-muted-foreground">
        {label}
      </span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={5}
        className="mt-2 w-full resize-none rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-primary"
      />
    </label>
  );
}