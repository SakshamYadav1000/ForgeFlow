import api from "./api";
import type { Organization } from "../types/organization";

export const getOrganizations = async (): Promise<Organization[]> => {
  const response = await api.get("/organizations");
  return response.data;
};

export const createOrganization = async (data: {
  name: string;
  slug: string;
  description: string;
  logo_url: string;
}) => {
  const response = await api.post(
    "/organizations",
    data
  );

  return response.data;
};