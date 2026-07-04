import { api } from "@/services/api";

export type Skill = {
  _id: string;
  name: string;
  category: string;
  level: number;
  icon: string;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type SkillFormData = {
  name: string;
  category: string;
  level: number;
  icon: string;
  description: string;
  order: number;
};

export async function getSkills() {
  const response = await api.get<{ skills: Skill[] }>("/skills");
  return response.data.skills;
}

export async function createSkill(payload: SkillFormData) {
  const response = await api.post<{
    message: string;
    skill: Skill;
  }>("/skills", payload);

  return response.data;
}

export async function updateSkill(id: string, payload: SkillFormData) {
  const response = await api.put<{
    message: string;
    skill: Skill;
  }>(`/skills/${id}`, payload);

  return response.data;
}

export async function deleteSkill(id: string) {
  const response = await api.delete<{ message: string }>(`/skills/${id}`);
  return response.data;
}