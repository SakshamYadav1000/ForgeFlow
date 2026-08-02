import api from "./api";

import type {
  Label,
  CreateLabelRequest,
  UpdateLabelRequest,
} from "../types/label";


// POST /organizations/{organization_id}/labels
export const createLabel = async (
  organizationId: number,
  data: CreateLabelRequest
): Promise<Label> => {

  const response =
    await api.post<Label>(
      `/organizations/${organizationId}/labels`,
      data
    );

  return response.data;

};


// GET /organizations/{organization_id}/labels
export const getLabels = async (
  organizationId: number
): Promise<Label[]> => {

  const response =
    await api.get<Label[]>(
      `/organizations/${organizationId}/labels`
    );

  return response.data;

};


// GET /labels/{label_id}
export const getLabel = async (
  labelId: number
): Promise<Label> => {

  const response =
    await api.get<Label>(
      `/labels/${labelId}`
    );

  return response.data;

};


// PATCH /labels/{label_id}
export const updateLabel = async (
  labelId: number,
  data: UpdateLabelRequest
): Promise<Label> => {

  const response =
    await api.patch<Label>(
      `/labels/${labelId}`,
      data
    );

  return response.data;

};


// DELETE /labels/{label_id}
export const deleteLabel = async (
  labelId: number
): Promise<void> => {

  await api.delete(
    `/labels/${labelId}`
  );

};

// Attach label and issue

// POST /issues/{issue_id}/labels/{label_id}
export const attachLabelToIssue = async (
  issueId: number,
  labelId: number
): Promise<void> => {

  await api.post(
    `/issues/${issueId}/labels/${labelId}`
  );

};

// GET /issues/{issue_id}/labels
export const getIssueLabels = async (
  issueId: number
): Promise<Label[]> => {

  const response =
    await api.get<Label[]>(
      `/issues/${issueId}/labels`
    );

  return response.data;

};

// DELETE /issues/{issue_id}/labels/{label_id}
export const removeLabelFromIssue = async (
  issueId: number,
  labelId: number
): Promise<void> => {

  await api.delete(
    `/issues/${issueId}/labels/${labelId}`
  );

};