import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import OrganizationCard from "../../components/ui/OrganizationCard";
import CreateOrganizationModal from "../../components/ui/CreateOrganizationModal";
import EditOrganizationModal from "../../components/ui/EditOrganizationModal";

import {
  getOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from "../../services/organizationService";

import type { Organization } from "../../types/organization";

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingOrganization, setEditingOrganization] =
    useState<Organization | null>(null);

  const fetchOrganizations = async () => {
    setLoading(true);

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
      console.error(error);

      alert(
        error.response?.data?.detail ??
          "Failed to create organization."
      );
    }
  };

  const handleUpdateOrganization = async (
    id: number,
    name: string,
    slug: string,
    description: string,
    logoUrl: string
  ) => {
    try {
      await updateOrganization(id, {
        name,
        slug,
        description,
        logo_url: logoUrl,
      });

      setEditingOrganization(null);

      await fetchOrganizations();

      alert("Organization updated successfully!");
    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data?.detail ??
          "Failed to update organization."
      );
    }
  };

  const handleDeleteOrganization = async (
    organization: Organization
  ) => {
    const confirmed = window.confirm(
      `Delete "${organization.name}"?`
    );

    if (!confirmed) return;

    try {
      await deleteOrganization(organization.id);

      await fetchOrganizations();

      alert("Organization deleted successfully!");
    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data?.detail ??
          "Failed to delete organization."
      );
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <MainLayout>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Organizations
        </h1>

        <CreateOrganizationModal
          onCreate={handleCreateOrganization}
        />
      </div>

      {loading ? (
        <p>Loading organizations...</p>
      ) : organizations.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          <h2 className="text-xl font-semibold">
            No organizations found
          </h2>

          <p className="mt-2 text-gray-500">
            Create your first organization to get
            started.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {organizations.map((organization) => (
            <OrganizationCard
              key={organization.id}
              organization={organization}
              onEdit={setEditingOrganization}
              onDelete={handleDeleteOrganization}
            />
          ))}
        </div>
      )}

      {editingOrganization && (
        <EditOrganizationModal
          organization={editingOrganization}
          onClose={() => setEditingOrganization(null)}
          onSave={handleUpdateOrganization}
        />
      )}
    </MainLayout>
  );
}