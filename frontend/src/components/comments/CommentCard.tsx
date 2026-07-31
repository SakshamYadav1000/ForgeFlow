import type { Comment } from "../../types/comment";

interface CommentCardProps {
  comment: Comment;
  onEdit: (comment: Comment) => void;
  onDelete: (commentId: number) => void;
}

export default function CommentCard({
  comment,
  onEdit,
  onDelete,
}: CommentCardProps) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">

        <div className="flex-1">

          <p className="whitespace-pre-wrap">
            {comment.content}
          </p>

          <p className="mt-4 text-xs text-gray-500">
            User #{comment.user_id}
          </p>

          <p className="text-xs text-gray-400">
            {new Date(
              comment.created_at
            ).toLocaleString()}
          </p>

        </div>

        <div className="ml-6 flex gap-2">

          <button
            onClick={() => onEdit(comment)}
            className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
          >
            Edit
          </button>

          <button
            onClick={() =>
              onDelete(comment.id)
            }
            className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}