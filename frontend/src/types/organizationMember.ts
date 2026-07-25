// GET /organizations/{organization_id}/members
export interface OrganizationMember {
  id: number;
  organization_id: number;
  user_id: number;
  role: string;
  joined_at: string;
}

// POST /organizations/{organization_id}/members
export interface CreateOrganizationMemberRequest {
  user_id: number;
  role: string;
}

// PATCH /organizations/{organization_id}/members/{user_id}
export interface UpdateOrganizationMemberRequest {
  role: string;
}