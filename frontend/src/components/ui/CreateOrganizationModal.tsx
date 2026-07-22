import { useState } from "react";

interface CreateOrganizationModalProps {
  onCreate: (
    name: string,
    slug: string,
    description: string,
    logoUrl: string
  ) => void;
}

export default function CreateOrganizationModal({
  onCreate,
}: CreateOrganizationModalProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">
        Create Organization
      </h2>

      <input
        className="mb-3 w-full rounded border p-3"
        placeholder="Organization Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="mb-3 w-full rounded border p-3"
        placeholder="Slug (example: forgeflow)"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />

      <textarea
        className="mb-3 w-full rounded border p-3"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="mb-4 w-full rounded border p-3"
        placeholder="Logo URL"
        value={logoUrl}
        onChange={(e) => setLogoUrl(e.target.value)}
      />

      <button
        onClick={() =>
          onCreate(
            name,
            slug,
            description,
            logoUrl
          )
        }
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Create Organization
      </button>
    </div>
  );
}