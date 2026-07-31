import api from "./api";

import type {
  Comment,
  CreateCommentRequest,
  UpdateCommentRequest,
} from "../types/comment";


// POST /issues/{issue_id}/comments
export const createComment = async (
  issueId: number,
  data: CreateCommentRequest
): Promise<Comment> => {

  const response =
    await api.post<Comment>(
      `/issues/${issueId}/comments`,
      data
    );

  return response.data;
};


// GET /issues/{issue_id}/comments
export const getIssueComments = async (
  issueId: number
): Promise<Comment[]> => {

  const response =
    await api.get<Comment[]>(
      `/issues/${issueId}/comments`
    );

  return response.data;
};


// GET /comments/{comment_id}
export const getComment = async (
  commentId: number
): Promise<Comment> => {

  const response =
    await api.get<Comment>(
      `/comments/${commentId}`
    );

  return response.data;
};


// PATCH /comments/{comment_id}
export const updateComment = async (
  commentId: number,
  data: UpdateCommentRequest
): Promise<Comment> => {

  const response =
    await api.patch<Comment>(
      `/comments/${commentId}`,
      data
    );

  return response.data;
};


// DELETE /comments/{comment_id}
export const deleteComment = async (
  commentId: number
): Promise<void> => {

  await api.delete(
    `/comments/${commentId}`
  );

};