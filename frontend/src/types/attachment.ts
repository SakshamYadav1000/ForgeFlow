export interface Attachment {
  id: number;
  issue_id: number;
  uploaded_by: number;
  file_name: string;
  file_size: number;
  mime_type: string;
  created_at: string;
}