import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import OrganizationCard from "../../components/ui/OrganizationCard";
import CreateOrganizationModal from "../../components/ui/CreateOrganizationModal";

import {
  getOrganizations,
  createOrganization,
} from "../../services/organizationService";

import type { Organization } from "../../types/organization";

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrganizations = async () => {
    try {
      const data = await getOrganizations();
      setOrganizations(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrganization = async (
    name: string,
    slug: string,
    description: string,
    logoUrl: string
  ) => {
    try {
      await createOrganization({
        name,
        slug,
        description,
        logo_url: logoUrl,
      });

      await fetchOrganizations();

      alert("Organization created successfully!");
    } catch (error: any) {
      console.log(error.response?.data);
      console.error(error);

      alert("Failed to create organization.");
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <MainLayout>
      <h1 className="mb-8 text-3xl font-bold">
        Organizations
      </h1>

      <div className="mb-8">
        <CreateOrganizationModal
          onCreate={handleCreateOrganization}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : organizations.length === 0 ? (
        <p>No organizations found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {organizations.map((organization) => (
            <OrganizationCard
              key={organization.id}
              organization={organization}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
}