import { api } from "@/services/api";

export type ProjectStatus = "Completed" | "In Progress" | "Planning";

export type Project = {
  _id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveUrl: string;
  status: ProjectStatus;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type ProjectsResponse = {
  projects: Project[];
};

export async function getProjects() {
  const response = await api.get<ProjectsResponse>("/projects");
  return response.data.projects;
}