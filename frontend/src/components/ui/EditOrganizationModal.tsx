import { useState } from "react";

import type { Organization } from "../../types/organization";

interface EditOrganizationModalProps {
  organization: Organization;
  onClose: () => void;
  onSave: (
    id: number,
    name: string,
    slug: string,
    description: string,
    logoUrl: string
  ) => Promise<void>;
}

export default function EditOrganizationModal({
  organization,
  onClose,
  onSave,
}: EditOrganizationModalProps) {
  const [name, setName] = useState(organization.name);
  const [slug, setSlug] = useState(organization.slug);
  const [description, setDescription] = useState(
    organization.description ?? ""
  );
  const [logoUrl, setLogoUrl] = useState(
    organization.logo_url ?? ""
  );

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await onSave(
        organization.id,
        name,
        slug,
        description,
        logoUrl
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update organization.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold">
          Edit Organization
        </h2>

        <input
          className="mb-3 w-full rounded border p-3"
          placeholder="Organization Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="mb-3 w-full rounded border p-3"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <textarea
          className="mb-3 w-full rounded border p-3"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <input
          className="mb-6 w-full rounded border p-3"
          placeholder="Logo URL"
          value={logoUrl}
          onChange={(e) =>
            setLogoUrl(e.target.value)
          }
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {loading
              ? "Updating..."
              : "Update Organization"}
          </button>
        </div>
      </div>
    </div>
  );
}