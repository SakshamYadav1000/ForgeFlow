import { useState } from "react";

import type {
  IssuePriority,
} from "../../types/issue";

interface Props {
  onCreate: (
    title: string,
    description: string,
    priority: IssuePriority,
    assigneeId: number | null,
    milestoneId: number | null
  ) => Promise<void>;
}

export default function CreateIssueModal({
  onCreate,
}: Props) {
  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState<IssuePriority>("MEDIUM");

  const [assigneeId, setAssigneeId] =
    useState<number | null>(null);

  const [milestoneId, setMilestoneId] =
    useState<number | null>(null);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await onCreate(
        title,
        description,
        priority,
        assigneeId,
        milestoneId
      );

      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setAssigneeId(null);
      setMilestoneId(null);

    } catch (error) {
      console.error(error);

      alert("Failed to create issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">
        Create Issue
      </h2>

      <input
        className="mb-3 w-full rounded border p-3"
        placeholder="Issue Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        className="mb-3 w-full rounded border p-3"
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <select
        className="mb-3 w-full rounded border p-3"
        value={priority}
        onChange={(e) =>
          setPriority(
            e.target.value as IssuePriority
          )
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

      <input
        type="number"
        className="mb-3 w-full rounded border p-3"
        placeholder="Assignee ID"
        value={assigneeId ?? ""}
        onChange={(e) =>
          setAssigneeId(
            e.target.value === ""
              ? null
              : Number(e.target.value)
          )
        }
      />

      <input
        type="number"
        className="mb-4 w-full rounded border p-3"
        placeholder="Milestone ID"
        value={milestoneId ?? ""}
        onChange={(e) =>
          setMilestoneId(
            e.target.value === ""
              ? null
              : Number(e.target.value)
          )
        }
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-400"
      >
        {loading
          ? "Creating..."
          : "Create Issue"}
      </button>
    </div>
  );
}