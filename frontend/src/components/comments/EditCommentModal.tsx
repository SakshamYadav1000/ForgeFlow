import { useEffect, useState } from "react";


import type { Comment } from "../../types/comment";



interface EditCommentModalProps {

  open: boolean;

  comment: Comment | null;

  loading: boolean;

  onClose: () => void;

  onSave: (
    content: string
  ) => void;

}




export default function EditCommentModal({

  open,

  comment,

  loading,

  onClose,

  onSave,

}: EditCommentModalProps) {


  const [content, setContent] =
    useState("");



useEffect(() => {

  if(comment){

    setContent(
      comment.content
    );

  }

}, [comment]);




if (!open || !comment) {
  return null;
}




  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black/40">


      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow">


        <h2 className="mb-5 text-xl font-bold">
          Edit Comment
        </h2>



        <form

          onSubmit={(e)=>{

            e.preventDefault();

            onSave(content);

          }}

          className="space-y-4"

        >



          <textarea

            value={content}

            onChange={(e)=>
              setContent(
                e.target.value
              )
            }

            className="w-full rounded border p-3"

            required

          />




          <div className="flex justify-end gap-3">


            <button

              type="button"

              onClick={onClose}

              className="rounded bg-gray-300 px-4 py-2"

            >

              Cancel

            </button>




            <button

              disabled={loading}

              className="rounded bg-blue-600 px-4 py-2 text-white"

            >

              {loading
                ? "Saving..."
                : "Save"}

            </button>


          </div>


        </form>


      </div>


    </div>

  );

}