// Milestone Status
export type MilestoneStatus =
  | "OPEN"
  | "CLOSED";


// GET milestone
export interface Milestone {
  id: number;
  project_id: number;
  title: string;
  description: string | null;
  status: MilestoneStatus;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}


// POST milestone
export interface CreateMilestoneRequest {
  title: string;
  description?: string;
  due_date?: string | null;
}


// PATCH milestone
export interface UpdateMilestoneRequest {
  title?: string;
  description?: string;
  status?: MilestoneStatus;
  due_date?: string | null;
}