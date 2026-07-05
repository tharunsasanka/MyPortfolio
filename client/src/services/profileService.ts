import { api } from "@/services/api";

export type Profile = {
  _id: string;

  name: string;
  role: string;
  badgeText: string;
  codeText: string;
  headline: string;
  highlightedHeadline: string;
  heroDescription: string;

  githubUrl: string;
  linkedinUrl: string;
  cvUrl: string;

  statusText: string;
  contactText: string;
  learningText: string;
  techStackText: string;

  projectsStat: string;
  projectsLabel: string;
  domainsStat: string;
  domainsLabel: string;
  learningStat: string;
  learningLabel: string;

  aboutEyebrow: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutSecondDescription: string;

  location: string;
  email: string;
  profileImageUrl: string;

  createdAt: string;
  updatedAt: string;
};

export type ProfileFormData = Omit<
  Profile,
  "_id" | "createdAt" | "updatedAt"
>;

export async function getProfile() {
  const response = await api.get<{ profile: Profile }>("/profile");
  return response.data.profile;
}

export async function updateProfile(payload: ProfileFormData) {
  const response = await api.put<{
    message: string;
    profile: Profile;
  }>("/profile", payload);

  return response.data;
}