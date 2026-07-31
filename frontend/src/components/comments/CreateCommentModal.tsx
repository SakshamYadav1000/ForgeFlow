import { useState } from "react";

interface Props {
  onCreate: (
    content: string
  ) => Promise<void>;
}

export default function CreateCommentModal({
  onCreate,
}: Props) {

  const [content, setContent] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  const handleSubmit = async () => {

    if (!content.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {

      setLoading(true);

      await onCreate(content);

      setContent("");

    } catch (error) {

      console.error(error);

      alert(
        "Failed to create comment."
      );

    } finally {

      setLoading(false);

    }

  };


  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-4 text-xl font-semibold">
        Add Comment
      </h2>

      <textarea
        className="mb-4 w-full rounded border p-3"
        rows={4}
        placeholder="Write a comment..."
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:bg-green-400"
      >
        {loading
          ? "Posting..."
          : "Post Comment"}
      </button>

    </div>
  );
}