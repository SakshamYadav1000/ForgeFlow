// GET projects
export interface Project {
  id: number;
  organization_id: number;
  name: string;
  key: string;
  description: string | null;
  created_by: number;
  created_at: string;
}


// create projects
export interface CreateProjectRequest {
  name: string;
  key: string;
  description?: string;
}


// update projects
export interface UpdateProjectRequest {
  name?: string;
  description?: string;
}