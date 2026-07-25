import { Link } from "react-router-dom";
import type { Organization } from "../../types/organization";

interface OrganizationCardProps {
  organization: Organization;
}

export default function OrganizationCard({
  organization,
}: OrganizationCardProps) {
  return (
    <Link
      to={`/organizations/${organization.id}/projects`}
      className="block rounded-xl bg-white p-6 shadow transition hover:scale-[1.02] hover:shadow-lg"
    >
      <h2 className="text-xl font-semibold">
        {organization.name}
      </h2>

      <p className="mt-2 text-gray-600">
        {organization.description ??
          "No description available."}
      </p>

      <div className="mt-4 space-y-1 text-sm text-gray-500">
        <p>Slug: {organization.slug}</p>
      </div>
    </Link>
  );
}