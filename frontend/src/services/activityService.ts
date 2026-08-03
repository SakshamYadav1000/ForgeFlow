import api from "./api";

import type {
  ActivityLog,
} from "../types/activity";


// Project activity
export const getProjectActivity = async (
  projectId: number
): Promise<ActivityLog[]> => {

  const response =
    await api.get<ActivityLog[]>(
      `/activity/projects/${projectId}`
    );

  return response.data;
};



// Issue activity
export const getIssueActivity = async (
  issueId: number
): Promise<ActivityLog[]> => {

  const response =
    await api.get<ActivityLog[]>(
      `/activity/issues/${issueId}`
    );

  return response.data;
};



// My activity
export const getMyActivity = async (): Promise<ActivityLog[]> => {

  const response =
    await api.get<ActivityLog[]>(
      "/activity/me"
    );

  return response.data;
};