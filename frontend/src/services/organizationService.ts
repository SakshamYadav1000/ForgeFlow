import api from "./api";
import type { Organization } from "../types/organization";

export interface CreateOrganizationRequest {
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
}

export interface UpdateOrganizationRequest {
  name?: string;
  slug?: string;
  description?: string;
  logo_url?: string;
}

// GET /organizations
export const getOrganizations = async (): Promise<
  Organization[]
> => {
  const response = await api.get<Organization[]>(
    "/organizations"
  );

  return response.data;
};

// GET /organizations/{id}
export const getOrganization = async (
  organizationId: number
): Promise<Organization> => {
  const response = await api.get<Organization>(
    `/organizations/${organizationId}`
  );

  return response.data;
};

// POST /organizations
export const createOrganization = async (
  data: CreateOrganizationRequest
): Promise<Organization> => {
  const response = await api.post<Organization>(
    "/organizations",
    data
  );

  return response.data;
};

// PATCH /organizations/{id}
export const updateOrganization = async (
  organizationId: number,
  data: UpdateOrganizationRequest
): Promise<Organization> => {
  const response = await api.patch<Organization>(
    `/organizations/${organizationId}`,
    data
  );

  return response.data;
};

// DELETE /organizations/{id}
export const deleteOrganization = async (
  organizationId: number
): Promise<void> => {
  await api.delete(
    `/organizations/${organizationId}`
  );
};