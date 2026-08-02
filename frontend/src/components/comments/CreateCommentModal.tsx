import { useState } from "react";


interface CreateCommentModalProps {

  onCreate: (
    content: string
  ) => Promise<void>;

}



export default function CreateCommentModal({
  onCreate,
}: CreateCommentModalProps) {


  const [content, setContent] =
    useState("");

  const [loading, setLoading] =
    useState(false);



  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    if (!content.trim()) return;


    try {

      setLoading(true);


      await onCreate(content);


      setContent("");


    } finally {

      setLoading(false);

    }

  };



  return (

    <form
      onSubmit={handleSubmit}
      className="rounded-lg bg-white p-5 shadow"
    >

      <h2 className="mb-4 text-xl font-semibold">
        Add Comment
      </h2>


      <textarea

        value={content}

        onChange={(e) =>
          setContent(
            e.target.value
          )
        }

        placeholder="Write a comment..."

        className="w-full rounded border p-3"

        rows={4}

        required

      />



      <button

        type="submit"

        disabled={loading}

        className="mt-4 rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"

      >

        {loading
          ? "Adding..."
          : "Add Comment"}

      </button>


    </form>

  );

}