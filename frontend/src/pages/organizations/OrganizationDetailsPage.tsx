import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import { getOrganization } from "../../services/organizationService";

import type { Organization } from "../../types/organization";

export default function OrganizationDetailsPage() {

  // Organization ID from URL
  const { organizationId } = useParams();

  // Organization state
  const [organization, setOrganization] =
    useState<Organization | null>(null);

  // Loading state
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchOrganization = async () => {

      if (!organizationId) return;

      try {

        const data =
          await getOrganization(
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

      {/* Organization Header */}

      <h1 className="text-3xl font-bold">
        {organization.name}
      </h1>

      <p className="mt-2 text-gray-600">
        {organization.description}
      </p>

      {/* Organization Information */}

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

      {/* Organization Modules */}

      <div className="mt-10 grid gap-6 md:grid-cols-3">

        {/* Members */}

        <Link
          to={`/organizations/${organization.id}/members`}
          className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg"
        >

          <h2 className="text-xl font-semibold">
            Members
          </h2>

          <p className="mt-2 text-gray-600">
            View and manage organization members.
          </p>

        </Link>

        {/* Projects */}

        <Link
          to={`/organizations/${organization.id}/projects`}
          className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg"
        >

          <h2 className="text-xl font-semibold">
            Projects
          </h2>

          <p className="mt-2 text-gray-600">
            View and manage projects.
          </p>

        </Link>

        {/* Labels */}

        <Link
          to={`/organizations/${organization.id}/labels`}
          className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg"
        >

          <h2 className="text-xl font-semibold">
            Labels
          </h2>

          <p className="mt-2 text-gray-600">
            Create and manage organization labels.
          </p>

        </Link>

      </div>

    </MainLayout>

  );

}