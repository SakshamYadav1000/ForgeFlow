// GET /organizations/{organization_id}/labels
export interface Label {
  id: number;
  organization_id: number;
  name: string;
  color: string;
}

// POST /organizations/{organization_id}/labels
export interface CreateLabelRequest {
  name: string;
  color: string;
}

// PATCH /labels/{label_id}
export interface UpdateLabelRequest {
  name?: string;
  color?: string;
}