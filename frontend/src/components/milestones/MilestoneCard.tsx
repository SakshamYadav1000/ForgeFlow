import { Link } from "react-router-dom";

import type { Milestone } from "../../types/milestone";


interface MilestoneCardProps {
  milestone: Milestone;

  onEdit: (
    milestone: Milestone
  ) => void;

  onDelete: (
    milestone: Milestone
  ) => void;
}


export default function MilestoneCard({
  milestone,
  onEdit,
  onDelete,
}: MilestoneCardProps) {


  return (

    <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg">


      {/* Clickable Milestone Details */}

      <Link
        to={`/milestones/${milestone.id}`}
      >

        <h2 className="text-xl font-semibold">
          {milestone.title}
        </h2>


        <p className="mt-2 text-gray-600">
          {milestone.description ||
            "No description"}
        </p>


        <div className="mt-4 space-y-2 text-sm">


          <p>
            <strong>Status:</strong>{" "}
            {milestone.status}
          </p>


          <p>
            <strong>Due Date:</strong>{" "}

            {milestone.due_date
              ? new Date(
                  milestone.due_date
                ).toLocaleDateString()
              : "No due date"}

          </p>


        </div>


      </Link>



      {/* Actions */}

      <div className="mt-6 flex gap-3">


        <button
          onClick={() =>
            onEdit(milestone)
          }
          className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
        >

          Edit

        </button>



        <button
          onClick={() =>
            onDelete(milestone)
          }
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >

          Delete

        </button>


      </div>


    </div>

  );
}