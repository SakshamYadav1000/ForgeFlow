import api from "./api";
import type { Organization } from "../types/organization";
import type {
  OrganizationMember,
  CreateOrganizationMemberRequest,
  UpdateOrganizationMemberRequest,
} from "../types/organizationMember";

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

// GET organizations
export const getOrganizations = async (): Promise<
  Organization[]
> => {
  const response = await api.get<Organization[]>(
    "/organizations"
  );

  return response.data;
};

// GET organizations by id
export const getOrganization = async (
  organizationId: number
): Promise<Organization> => {
  const response = await api.get<Organization>(
    `/organizations/${organizationId}`
  );

  return response.data;
};

// create organizations
export const createOrganization = async (
  data: CreateOrganizationRequest
): Promise<Organization> => {
  const response = await api.post<Organization>(
    "/organizations",
    data
  );

  return response.data;
};

// update organizations by id
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

// DELETE organizations by id
export const deleteOrganization = async (
  organizationId: number
): Promise<void> => {
  await api.delete(
    `/organizations/${organizationId}`
  );
};

//get organisation members
export const getOrganizationMembers = async (
  organizationId: number
): Promise<OrganizationMember[]> => {
  const response = await api.get<OrganizationMember[]>(
    `/organizations/${organizationId}/members`
  );

  return response.data;
};

//add organisation member
export const addOrganizationMember = async (
  organizationId: number,
  data: CreateOrganizationMemberRequest
): Promise<OrganizationMember> => {
  const response =
    await api.post<OrganizationMember>(
      `/organizations/${organizationId}/members`,
      data
    );

  return response.data;
};

//update members roles
export const updateOrganizationMember = async (
  organizationId: number,
  userId: number,
  data: UpdateOrganizationMemberRequest
): Promise<OrganizationMember> => {
  const response =
    await api.patch<OrganizationMember>(
      `/organizations/${organizationId}/members/${userId}`,
      data
    );

  return response.data;
};

// Remove Organization Member
export const removeOrganizationMember = async (
  organizationId: number,
  userId: number
) => {
  await api.delete(
    `/organizations/${organizationId}/members/${userId}`
  );
};