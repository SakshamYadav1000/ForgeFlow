import { Link } from "react-router-dom";
import type { Organization } from "../../types/organization";

interface OrganizationCardProps {
  organization: Organization;
  onEdit: (organization: Organization) => void;
  onDelete: (organization: Organization) => void;
}

export default function OrganizationCard({
  organization,
  onEdit,
  onDelete,
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
        {organization.description || "No description"}
      </p>

      <p className="mt-4 text-sm text-gray-400">
        Slug: {organization.slug}
      </p>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEdit(organization);
          }}
          className="rounded bg-yellow-500 px-4 py-2 text-white transition hover:bg-yellow-600"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(organization);
          }}
          className="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </Link>
  );
}