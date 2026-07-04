import { api } from "@/services/api";

export type CyberLabStat = {
  label: string;
  value: string;
};

export type CyberLabProgress = {
  label: string;
  value: number;
};

export type CyberLab = {
  _id: string;
  name: string;
  username: string;
  rank: string;
  status: string;
  profileUrl: string;
  stats: CyberLabStat[];
  progress: CyberLabProgress[];
  learningAreas: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type CyberLabFormData = {
  name: string;
  username: string;
  rank: string;
  status: string;
  profileUrl: string;
  stats: CyberLabStat[];
  progress: CyberLabProgress[];
  learningAreas: string[];
  order: number;
};

export async function getCyberLabs() {
  const response = await api.get<{ cyberLabs: CyberLab[] }>("/cyber-labs");
  return response.data.cyberLabs;
}

export async function createCyberLab(payload: CyberLabFormData) {
  const response = await api.post<{
    message: string;
    cyberLab: CyberLab;
  }>("/cyber-labs", payload);

  return response.data;
}

export async function updateCyberLab(id: string, payload: CyberLabFormData) {
  const response = await api.put<{
    message: string;
    cyberLab: CyberLab;
  }>(`/cyber-labs/${id}`, payload);

  return response.data;
}

export async function deleteCyberLab(id: string) {
  const response = await api.delete<{ message: string }>(`/cyber-labs/${id}`);
  return response.data;
}