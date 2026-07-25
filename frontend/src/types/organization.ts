export interface Organization {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  created_by: number;
  created_at: string;
}