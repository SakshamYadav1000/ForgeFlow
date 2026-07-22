import api from "../api/axios";
import type { DashboardStats } from "../types/dashboard";

export const getDashboard = async (
  projectId: number
): Promise<DashboardStats> => {
  const response = await api.get(
    `/dashboard/projects/${projectId}`
  );

  return response.data;
};