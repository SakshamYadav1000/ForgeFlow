import { useState } from "react";

interface CreateOrganizationModalProps {
  onCreate: (
    name: string,
    slug: string,
    description: string,
    logoUrl: string
  ) => Promise<void>;
}

export default function CreateOrganizationModal({
  onCreate,
}: CreateOrganizationModalProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim() || !slug.trim()) {
      alert("Name and Slug are required.");
      return;
    }

    try {
      setLoading(true);

      await onCreate(
        name.trim(),
        slug.trim(),
        description.trim(),
        logoUrl.trim()
      );

      setName("");
      setSlug("");
      setDescription("");
      setLogoUrl("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">
        Create Organization
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        <input
          className="w-full rounded border p-3"
          placeholder="Organization Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full rounded border p-3"
          placeholder="Slug (example: forgeflow)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <textarea
          className="w-full rounded border p-3"
          placeholder="Description (Optional)"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <input
          className="w-full rounded border p-3"
          placeholder="Logo URL (Optional)"
          value={logoUrl}
          onChange={(e) =>
            setLogoUrl(e.target.value)
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Creating..."
            : "Create Organization"}
        </button>
      </form>
    </div>
  );
}