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

export const getIssue = async (
  issueId: number
): Promise<Issue> => {
  const response = await api.get(
    `/issues/${issueId}`
  );

  return response.data;
};

export const updateIssue = async (
  issueId: number,
  data: {
    title: string;
    description: string;
    status: string;
    priority: string;
    assignee_id: number | null;
    milestone_id: number | null;
  }

  
): Promise<Issue> => {
  const response = await api.patch(
    `/issues/${issueId}`,
    {
      ...data,
      assignee_id: data.assignee_id ?? 0,
      milestone_id: data.milestone_id ?? 0,
    }
  );
  
  return response.data;
};

export const deleteIssue = async (
  issueId: number
) => {
  await api.delete(`/issues/${issueId}`);
};