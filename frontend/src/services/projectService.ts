import api from "./api";
import type { Project } from "../types/project";

export const getProjects = async (
  organizationId: number
): Promise<Project[]> => {
  const response = await api.get(
    `/organizations/${organizationId}/projects`
  );

  return response.data;
};