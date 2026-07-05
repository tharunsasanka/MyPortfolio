import { api } from "@/services/api";

export type DashboardStats = {
  projectsCount: number;
  certificatesCount: number;
  cyberLabsCount: number;
  skillsCount: number;
  messagesCount: number;
  unreadMessagesCount: number;
};

export async function getDashboardStats() {
  const response = await api.get<{ stats: DashboardStats }>(
    "/dashboard/stats"
  );

  return response.data.stats;
}