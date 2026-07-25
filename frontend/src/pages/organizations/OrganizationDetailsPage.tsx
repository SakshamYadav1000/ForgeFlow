import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import { getOrganization } from "../../services/organizationService";

import type { Organization } from "../../types/organization";

export default function OrganizationDetailsPage() {
  const { organizationId } = useParams();

  const [organization, setOrganization] =
    useState<Organization | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        if (!organizationId) return;

        const data = await getOrganization(
          Number(organizationId)
        );

        setOrganization(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, [organizationId]);

  if (loading) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    );
  }

  if (!organization) {
    return (
      <MainLayout>
        <p>Organization not found.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold">
        {organization.name}
      </h1>

      <p className="mt-2 text-gray-600">
        {organization.description}
      </p>

      <div className="mt-6 rounded-lg bg-white p-6 shadow">
        <p>
          <strong>Slug:</strong>{" "}
          {organization.slug}
        </p>

        <p className="mt-2">
          <strong>Created By:</strong>{" "}
          {organization.created_by}
        </p>

        <p className="mt-2">
          <strong>Created At:</strong>{" "}
          {new Date(
            organization.created_at
          ).toLocaleString()}
        </p>

        {organization.logo_url && (
          <img
            src={organization.logo_url}
            alt={organization.name}
            className="mt-6 h-28 w-28 rounded-lg object-cover"
          />
        )}
      </div>
    </MainLayout>
  );
}