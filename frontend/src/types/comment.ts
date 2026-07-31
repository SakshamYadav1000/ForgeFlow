// GET /issues/{issue_id}/comments
export interface Comment {
  id: number;
  issue_id: number;
  user_id: number;
  content: string;
  created_at: string;
  updated_at: string;
}

// POST /issues/{issue_id}/comments
export interface CreateCommentRequest {
  content: string;
}

// PATCH /comments/{comment_id}
export interface UpdateCommentRequest {
  content: string;
}