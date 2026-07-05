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
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  status: ProjectStatus;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type ProjectFormData = {
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  status: ProjectStatus;
  isFeatured: boolean;
  order: number;
};

export type ProjectsResponse = {
  projects: Project[];
};

export async function getProjects() {
  const response = await api.get<ProjectsResponse>("/projects");
  return response.data.projects;
}

export async function createProject(payload: ProjectFormData) {
  const response = await api.post<{
    project: Project;
    message: string;
  }>("/projects", payload);

  return response.data;
}

export async function updateProject(id: string, payload: ProjectFormData) {
  const response = await api.put<{
    project: Project;
    message: string;
  }>(`/projects/${id}`, payload);

  return response.data;
}

export async function deleteProject(id: string) {
  const response = await api.delete<{
    message: string;
  }>(`/projects/${id}`);

  return response.data;
}