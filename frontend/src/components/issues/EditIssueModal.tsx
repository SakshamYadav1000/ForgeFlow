import { useEffect, useState } from "react";

import type { Issue } from "../../types/issue";

interface EditIssueModalProps {
  issue: Issue;
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSave: (data: {
    title: string;
    description: string;
    status: string;
    priority: string;
    assignee_id: number | null;
    milestone_id: number | null;
  }) => Promise<void>;
}

export default function EditIssueModal({
  issue,
  open,
  loading = false,
  onClose,
  onSave,
}: EditIssueModalProps) {
  const [title, setTitle] = useState(issue.title);
  const [description, setDescription] =
    useState(issue.description);

  const [status, setStatus] =
    useState(issue.status);

  const [priority, setPriority] =
    useState(issue.priority);

  const [assigneeId, setAssigneeId] =
    useState<number | null>(
      issue.assignee_id
    );

  const [milestoneId, setMilestoneId] =
    useState<number | null>(
      issue.milestone_id
    );

  useEffect(() => {
    setTitle(issue.title);
    setDescription(issue.description);
    setStatus(issue.status);
    setPriority(issue.priority);
    setAssigneeId(issue.assignee_id);
    setMilestoneId(issue.milestone_id);
  }, [issue]);

  if (!open) return null;

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    await onSave({
      title,
      description,
      status,
      priority,
      assignee_id: assigneeId,
      milestone_id: milestoneId,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-xl rounded-xl bg-white p-8">
        <h2 className="mb-6 text-2xl font-bold">
          Edit Issue
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block font-medium">
              Title
            </label>

            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full rounded border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="w-full rounded border p-3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block font-medium">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
                className="w-full rounded border p-3"
              >
                <option value="TODO">
                  TODO
                </option>

                <option value="IN_PROGRESS">
                  IN_PROGRESS
                </option>

                <option value="DONE">
                  DONE
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(
                    e.target.value
                  )
                }
                className="w-full rounded border p-3"
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
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Assignee ID
            </label>

            <input
              type="number"
              value={assigneeId ?? ""}
              onChange={(e) =>
                setAssigneeId(
                  e.target.value === ""
                    ? null
                    : Number(
                        e.target.value
                      )
                )
              }
              className="w-full rounded border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Milestone ID
            </label>

            <input
              type="number"
              value={milestoneId ?? ""}
              onChange={(e) =>
                setMilestoneId(
                  e.target.value === ""
                    ? null
                    : Number(
                        e.target.value
                      )
                )
              }
              className="w-full rounded border p-3"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-gray-300 px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded bg-blue-600 px-5 py-2 text-white disabled:opacity-60"
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}