import { useState } from "react";

import type {
  Issue,
  UpdateIssueRequest,
} from "../../types/issue";


interface Props {
  open: boolean;
  issue: Issue;
  loading: boolean;
  onClose: () => void;
  onSave: (
    data: UpdateIssueRequest
  ) => Promise<void>;
}


export default function EditIssueModal({
  open,
  issue,
  loading,
  onClose,
  onSave,
}: Props) {

  const [title, setTitle] =
    useState(issue.title);

  const [description, setDescription] =
    useState(issue.description ?? "");

  const [status, setStatus] =
    useState(issue.status);

  const [priority, setPriority] =
    useState(issue.priority);


  const handleSubmit = async () => {

    await onSave({
      title,
      description,
      status,
      priority,
      assignee_id: issue.assignee_id,
      milestone_id: issue.milestone_id,
    });

  };


  if (!open) return null;


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">

      <div className="rounded-xl bg-white p-6 shadow-lg w-96">

        <h2 className="mb-4 text-xl font-bold">
          Edit Issue
        </h2>


        <input
          className="mb-3 w-full rounded border p-3"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />


        <textarea
          className="mb-3 w-full rounded border p-3"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />


        <select
          className="mb-3 w-full rounded border p-3"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as any)
          }
        >
          <option value="TODO">
            TODO
          </option>

          <option value="IN_PROGRESS">
            IN PROGRESS
          </option>

          <option value="DONE">
            DONE
          </option>

        </select>


        <select
          className="mb-3 w-full rounded border p-3"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as any)
          }
        >
          <option value="LOW">
            LOW
          </option>

          <option value="MEDIUM">
            MEDIUM
          </option>

          <option value="HIGH">
            HIGH
          </option>

          <option value="CRITICAL">
            CRITICAL
          </option>

        </select>


        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded bg-gray-300 px-4 py-2"
          >
            Cancel
          </button>


          <button
            disabled={loading}
            onClick={handleSubmit}
            className="rounded bg-blue-600 px-4 py-2 text-white"
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