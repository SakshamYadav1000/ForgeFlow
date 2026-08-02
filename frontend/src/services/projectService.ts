import api from "./api";

import type {
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
} from "../types/project";


// create projects
export const createProject = async (
  organizationId: number,
  data: CreateProjectRequest
): Promise<Project> => {

  const response =
    await api.post<Project>(
      `/organizations/${organizationId}/projects`,
      data
    );

  return response.data;
};



// GET projects by organisation
export const getOrganizationProjects = async (
  organizationId: number
): Promise<Project[]> => {

  const response =
    await api.get<Project[]>(
      `/organizations/${organizationId}/projects`
    );

  return response.data;
};

//get user projects
export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<Project[]>(
    "/projects"
  );

  return response.data;
};

// GET projects
export const getProject = async (
  projectId: number
): Promise<Project> => {

  const response =
    await api.get<Project>(
      `/projects/${projectId}`
    );

  return response.data;
};



// update projects
export const updateProject = async (
  projectId: number,
  data: UpdateProjectRequest
): Promise<Project> => {

  const response =
    await api.patch<Project>(
      `/projects/${projectId}`,
      data
    );

  return response.data;
};



// DELETE project
export const deleteProject = async (
  projectId: number
): Promise<void> => {

  await api.delete(
    `/projects/${projectId}`
  );

};