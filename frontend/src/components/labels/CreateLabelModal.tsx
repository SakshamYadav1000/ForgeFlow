import { useState } from "react";

interface Props {
  onCreate: (
    name: string,
    color: string
  ) => Promise<void>;
}

export default function CreateLabelModal({
  onCreate,
}: Props) {

  const [name, setName] =
    useState("");

  const [color, setColor] =
    useState("#3B82F6");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async () => {

    try {

      setLoading(true);

      await onCreate(
        name,
        color
      );

      setName("");

      setColor("#3B82F6");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-4 text-xl font-semibold">
        Create Label
      </h2>

      <input
        className="mb-3 w-full rounded border p-3"
        placeholder="Label Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        type="color"
        className="mb-4 h-12 w-full rounded border"
        value={color}
        onChange={(e) =>
          setColor(e.target.value)
        }
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        {loading
          ? "Creating..."
          : "Create Label"}
      </button>

    </div>
  );
}