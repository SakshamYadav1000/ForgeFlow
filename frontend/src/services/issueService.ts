import api from "./api";

import type {
  Issue,
  CreateIssueRequest,
  UpdateIssueRequest,
} from "../types/issue";

// create issues by projects
export const createIssue = async (
  projectId: number,
  data: CreateIssueRequest
): Promise<Issue> => {
  const response =
    await api.post<Issue>(
      `/projects/${projectId}/issues`,
      data
    );

  return response.data;
};

// GET issues by projects
export const getProjectIssues = async (
  projectId: number,
  params?: {
    title?: string;
    status?: string;
    priority?: string;
    assignee_id?: number;
    milestone_id?: number;
    reporter_id?: number;
    page?: number;
    limit?: number;
    sort_by?: string;
    order?: "asc" | "desc";
  }
): Promise<Issue[]> => {
  const response =
    await api.get<Issue[]>(
      `/projects/${projectId}/issues`,
      {
        params,
      }
    );

  return response.data;
};

//Global issues
export const getIssues = async (): Promise<Issue[]> => {

  const response =
    await api.get<Issue[]>(
      "/issues"
    );

  return response.data;

};

// GET issues by id
export const getIssue = async (
  issueId: number
): Promise<Issue> => {
  const response =
    await api.get<Issue>(
      `/issues/${issueId}`
    );

  return response.data;
};

// PATCH issues
export const updateIssue = async (
  issueId: number,
  data: UpdateIssueRequest
): Promise<Issue> => {
  const response =
    await api.patch<Issue>(
      `/issues/${issueId}`,
      data
    );

  return response.data;
};

// DELETE issues
export const deleteIssue = async (
  issueId: number
): Promise<void> => {
  await api.delete(
    `/issues/${issueId}`
  );
};