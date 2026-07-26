// Issue Status
export type IssueStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "DONE";


// Issue Priority
export type IssuePriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";


// GET issues by project
export interface Issue {
  id: number;
  project_id: number;
  milestone_id: number | null;
  title: string;
  description: string | null;
  status: IssueStatus;
  priority: IssuePriority;
  reporter_id: number;
  assignee_id: number | null;
  created_at: string;
  updated_at: string;
}


// create issues
export interface CreateIssueRequest {
  title: string;
  description?: string;
  priority: IssuePriority;
  assignee_id?: number | null;
  milestone_id?: number | null;
}


// PATCH issues
export interface UpdateIssueRequest {
  title?: string;
  description?: string;
  status?: IssueStatus;
  priority?: IssuePriority;
  assignee_id?: number | null;
  milestone_id?: number | null;
}