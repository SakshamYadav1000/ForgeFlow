import api from "./api";
import type { Dashboard } from "../types/dashboard";

export const getDashboard = async (
  projectId: number
): Promise<Dashboard> => {
  const response = await api.get(
    `/dashboard/projects/${projectId}`
  );

  return response.data;
};