import api from "./api";

import type {
  Milestone,
  CreateMilestoneRequest,
  UpdateMilestoneRequest,
} from "../types/milestone";


// POST /projects/{projectId}/milestones
export const createMilestone = async (
  projectId: number,
  data: CreateMilestoneRequest
): Promise<Milestone> => {

  const response = await api.post(
    `/projects/${projectId}/milestones`,
    data
  );

  return response.data;

};


// GET /projects/{projectId}/milestones
export const getProjectMilestones = async (
  projectId: number
): Promise<Milestone[]> => {

  const response = await api.get(
    `/projects/${projectId}/milestones`
  );

  return response.data;

};


// GET /milestones/{milestoneId}
export const getMilestone = async (
  milestoneId: number
): Promise<Milestone> => {

  const response = await api.get(
    `/milestones/${milestoneId}`
  );

  return response.data;

};


// PATCH /milestones/{milestoneId}
export const updateMilestone = async (
  milestoneId: number,
  data: UpdateMilestoneRequest
): Promise<Milestone> => {

  const response = await api.patch(
    `/milestones/${milestoneId}`,
    data
  );

  return response.data;

};


// DELETE /milestones/{milestoneId}
export const deleteMilestone = async (
  milestoneId: number
): Promise<void> => {

  await api.delete(
    `/milestones/${milestoneId}`
  );

};