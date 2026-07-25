//get organisation
export interface Organization {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  created_by: number;
  created_at: string;
}

//create organisation
export interface CreateOrganizationRequest {
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
}

//Upadte organisation
export interface UpdateOrganizationRequest {
  name?: string;
  slug?: string;
  description?: string;
  logo_url?: string;
}