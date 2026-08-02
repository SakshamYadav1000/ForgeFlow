import type { Comment } from "../../types/comment";


interface CommentCardProps {

  comment: Comment;

  onEdit: (
    comment: Comment
  ) => void;

  onDelete: (
    commentId: number
  ) => void;

}



export default function CommentCard({
  comment,
  onEdit,
  onDelete,
}: CommentCardProps) {


  return (

    <div className="rounded-lg bg-white p-5 shadow">


      {/* Comment content */}

      <p className="text-gray-700">
        {comment.content}
      </p>



      <div className="mt-3 text-sm text-gray-500">

        <p>
          User ID: {comment.user_id}
        </p>


        <p>
          Created:
          {" "}
          {new Date(
            comment.created_at
          ).toLocaleString()}
        </p>


      </div>




      <div className="mt-4 flex gap-3">


        <button

          onClick={() =>
            onEdit(comment)
          }

          className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"

        >

          Edit

        </button>




        <button
  onClick={() =>
    onDelete(comment.id)
  }
  className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
>
  Delete
</button>


      </div>


    </div>

  );

}