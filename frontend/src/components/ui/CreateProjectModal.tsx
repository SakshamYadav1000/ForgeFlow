import { useState } from "react";

interface Props {
  onCreate: (
    name: string,
    key: string,
    description: string
  ) => Promise<void>;
}

export default function CreateProjectModal({
  onCreate,
}: Props) {
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await onCreate(
        name,
        key,
        description
      );

      setName("");
      setKey("");
      setDescription("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">
        Create Project
      </h2>

      <input
        className="mb-3 w-full rounded border p-3"
        placeholder="Project Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        className="mb-3 w-full rounded border p-3"
        placeholder="Project Key (FF)"
        value={key}
        onChange={(e) =>
          setKey(e.target.value.toUpperCase())
        }
      />

      <textarea
        className="mb-4 w-full rounded border p-3"
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-400"
      >
        {loading
          ? "Creating..."
          : "Create Project"}
      </button>
    </div>
  );
}