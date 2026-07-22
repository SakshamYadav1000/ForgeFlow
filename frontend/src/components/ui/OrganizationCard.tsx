import type { Organization } from "../../types/organization";

interface OrganizationCardProps {
  organization: Organization;
}

export default function OrganizationCard({
  organization,
}: OrganizationCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg">
      <h2 className="text-xl font-semibold">
        {organization.name}
      </h2>

      <p className="mt-3 text-gray-600">
        {organization.description}
      </p>

      <button className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Open
      </button>
    </div>
  );
}