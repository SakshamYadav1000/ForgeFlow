export type ActivityType =
  | "PROJECT_CREATED"
  | "PROJECT_UPDATED"
  | "PROJECT_DELETED"
  | "ISSUE_CREATED"
  | "ISSUE_UPDATED"
  | "ISSUE_DELETED";


export interface ActivityLog {

  id: number;

  user_id: number;

  project_id: number;

  issue_id: number | null;

  activity_type: ActivityType;

  description: string;

  created_at: string;

}