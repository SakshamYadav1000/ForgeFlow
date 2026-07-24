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
      className="block rounded-xl bg-white p-6 shadow transition hover:shadow-lg hover:scale-[1.02]"
    >
      <h2 className="text-xl font-semibold">
        {organization.name}
      </h2>

      <p className="mt-2 text-gray-600">
        {organization.description}
      </p>

      <p className="mt-4 text-sm text-gray-400">
        Slug: {organization.slug}
      </p>
    </Link>
  );
}