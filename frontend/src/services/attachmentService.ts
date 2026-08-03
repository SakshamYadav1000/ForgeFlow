import api from "./api";

import type { Attachment } from "../types/attachment";

export const getIssueAttachments = async (
  issueId: number
): Promise<Attachment[]> => {
  const response = await api.get<Attachment[]>(
    `/attachments/issues/${issueId}`
  );

  return response.data;
};

export const uploadAttachment = async (
  issueId: number,
  file: File
): Promise<Attachment> => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post<Attachment>(
    `/attachments/issues/${issueId}`,
    formData
  );

  return response.data;
};

export const deleteAttachment = async (
  attachmentId: number
): Promise<void> => {
  await api.delete(`/attachments/${attachmentId}`);
};

export const downloadAttachment = async (
  attachmentId: number
): Promise<Blob> => {
  const response = await api.get(
    `/attachments/${attachmentId}/download`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};