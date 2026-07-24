export interface Issue {
  id: number;
  title: string;
  description: string;

  status: string;
  priority: string;

  assignee_id: number | null;

  project_id: number;
  created_by: number;

  created_at: string;
  updated_at: string;

  due_date: string | null;
}