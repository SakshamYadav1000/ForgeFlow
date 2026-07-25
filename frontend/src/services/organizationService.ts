import api from "./api";
import type { Organization } from "../types/organization";

export interface CreateOrganizationRequest {
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
}

export const getOrganizations = async () => {
  const response = await api.get<Organization[]>(
    "/organizations"
  );

  return response.data;
};

export const createOrganization = async (
  data: CreateOrganizationRequest
) => {
  const response = await api.post<Organization>(
    "/organizations",
    data
  );

  return response.data;
};