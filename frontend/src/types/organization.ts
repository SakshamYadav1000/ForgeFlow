export interface Organization {
  id: number;
  name: string;
  slug: string;
  description: string;
  logo_url: string | null;
  created_by: number;
}