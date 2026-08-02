import { useEffect, useState } from "react";

import type { Label } from "../../types/label";

interface Props {
  open: boolean;
  label: Label | null;
  loading: boolean;
  onClose: () => void;
  onSave: (
    name: string,
    color: string
  ) => Promise<void>;
}

export default function EditLabelModal({
  open,
  label,
  loading,
  onClose,
  onSave,
}: Props) {

  const [name, setName] =
    useState("");

  const [color, setColor] =
    useState("#3B82F6");

  useEffect(() => {

    if (label) {

      setName(label.name);

      setColor(label.color);

    }

  }, [label]);

  if (!open || !label)
    return null;

  const handleSubmit = async () => {
    await onSave(
      name,
      color
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-lg rounded-xl bg-white p-6">

        <h2 className="mb-4 text-xl font-semibold">
          Edit Label
        </h2>

        <input
          className="mb-3 w-full rounded border p-3"
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

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            {loading
              ? "Saving..."
              : "Save"}
          </button>

        </div>

      </div>

    </div>
  );
}