import { useState } from "react";

import type {
  ChangeEvent,
  FormEvent,
} from "react";

import {
  Upload,
  X,
} from "lucide-react";

interface Props {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<void>;
}

export default function UploadAttachmentModal({
  open,
  loading,
  onClose,
  onUpload,
}: Props) {
  const [file, setFile] = useState<File | null>(
    null
  );

  if (!open) {
    return null;
  }

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFile(event.target.files?.[0] ?? null);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!file) {
      alert("Please choose a file.");

      return;
    }

    await onUpload(file);

    setFile(null);
  };

  const handleClose = () => {
    if (loading) {
      return;
    }

    setFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Upload Attachment
          </h2>

          <button
            type="button"
            onClick={handleClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form
          className="mt-6"
          onSubmit={handleSubmit}
        >
          <label className="block text-sm font-medium text-gray-700">
            File
          </label>

          <input
            type="file"
            onChange={handleFileChange}
            className="mt-2 block w-full rounded border p-2"
            disabled={loading}
          />

          {file && (
            <p className="mt-2 text-sm text-gray-500">
              Selected: {file.name}
            </p>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-lg border px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !file}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Upload size={18} />

              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}