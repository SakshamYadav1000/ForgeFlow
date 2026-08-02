import { useState } from "react";

import type {
  CreateMilestoneRequest,
} from "../../types/milestone";


interface CreateMilestoneModalProps {

  open: boolean;

  loading: boolean;

  onClose: () => void;

  onSave: (
    data: CreateMilestoneRequest
  ) => void;

}


export default function CreateMilestoneModal({
  open,
  loading,
  onClose,
  onSave,
}: CreateMilestoneModalProps) {


  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");



  if (!open) return null;



  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    onSave({

      title,

      description:
        description || undefined,

      due_date:
        dueDate
          ? new Date(dueDate).toISOString()
          : null,

    });


  };



  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black/40">


      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">


        <h2 className="mb-6 text-xl font-bold">
          Create Milestone
        </h2>



        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >


          {/* Title */}

          <input
            type="text"
            placeholder="Milestone title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full rounded border p-3"
            required
          />



          {/* Description */}

          <textarea

            placeholder="Description"

            value={description}

            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }

            className="w-full rounded border p-3"

          />



          {/* Due Date */}

          <input

            type="datetime-local"

            value={dueDate}

            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }

            className="w-full rounded border p-3"

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

              type="submit"

              disabled={loading}

              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"

            >

              {loading
                ? "Creating..."
                : "Create"}

            </button>


          </div>


        </form>


      </div>


    </div>

  );
}