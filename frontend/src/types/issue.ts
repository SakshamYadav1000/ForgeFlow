export interface Issue {
  id: number;

  title: string;
  description: string;

  status: string;
  priority: string;

  assignee_id: number | null;
  milestone_id: number | null;

  project_id: number;
  reporter_id: number;

  created_at: string;
  updated_at: string;
}