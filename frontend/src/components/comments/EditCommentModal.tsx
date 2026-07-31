import { useEffect, useState } from "react";

import type { Comment } from "../../types/comment";

interface Props {
  open: boolean;
  comment: Comment | null;
  loading: boolean;
  onClose: () => void;
  onSave: (
    content: string
  ) => Promise<void>;
}

export default function EditCommentModal({
  open,
  comment,
  loading,
  onClose,
  onSave,
}: Props) {

  const [content, setContent] =
    useState("");


  useEffect(() => {

    if (comment) {
      setContent(comment.content);
    }

  }, [comment]);


  if (!open || !comment)
    return null;


  const handleSubmit = async () => {
    await onSave(content);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-lg rounded-xl bg-white p-6">

        <h2 className="mb-4 text-xl font-semibold">
          Edit Comment
        </h2>

        <textarea
          rows={5}
          className="mb-4 w-full rounded border p-3"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
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
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
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