import api from "./api";
import type { Issue } from "../types/issue";

export const getIssues = async (
  projectId: number
): Promise<Issue[]> => {
  const response = await api.get(
    `/projects/${projectId}/issues`
  );

  return response.data;
};