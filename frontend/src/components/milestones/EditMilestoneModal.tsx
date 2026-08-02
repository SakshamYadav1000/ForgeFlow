import { useEffect, useState } from "react";

import type {
  Milestone,
  UpdateMilestoneRequest,
} from "../../types/milestone";


interface EditMilestoneModalProps {

  open: boolean;

  milestone: Milestone;

  loading: boolean;

  onClose: () => void;

  onSave: (
    data: UpdateMilestoneRequest
  ) => void;

}


export default function EditMilestoneModal({
  open,
  milestone,
  loading,
  onClose,
  onSave,
}: EditMilestoneModalProps) {


  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [status, setStatus] =
    useState<"OPEN" | "CLOSED">(
      "OPEN"
    );

  const [dueDate, setDueDate] =
    useState("");



  // Fill existing milestone data
  useEffect(() => {

    if (!milestone) return;


    setTitle(
      milestone.title
    );


    setDescription(
      milestone.description || ""
    );


    setStatus(
      milestone.status
    );


    setDueDate(
      milestone.due_date
        ? milestone.due_date.slice(0,16)
        : ""
    );


  }, [milestone]);



  if (!open) return null;



  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    onSave({

      title,

      description:
        description || undefined,


      status,


      due_date:
        dueDate
          ? new Date(
              dueDate
            ).toISOString()
          : null,

    });


  };



  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black/40">


      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">


        <h2 className="mb-6 text-xl font-bold">
          Edit Milestone
        </h2>



        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >


          {/* Title */}

          <input

            type="text"

            value={title}

            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }

            className="w-full rounded border p-3"

            required

          />



          {/* Description */}

          <textarea

            value={description}

            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }

            className="w-full rounded border p-3"

            placeholder="Description"

          />



          {/* Status */}

          <select

            value={status}

            onChange={(e) =>
              setStatus(
                e.target.value as
                "OPEN" | "CLOSED"
              )
            }

            className="w-full rounded border p-3"

          >

            <option value="OPEN">
              OPEN
            </option>

            <option value="CLOSED">
              CLOSED
            </option>


          </select>




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
                ? "Saving..."
                : "Save"}

            </button>


          </div>


        </form>


      </div>


    </div>

  );

}