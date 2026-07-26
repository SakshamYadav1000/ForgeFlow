import { Link } from "react-router-dom";

import type { Issue } from "../../types/issue";

interface Props {
  issue: Issue;
}

export default function IssueCard({
  issue,
}: Props) {
  const priorityColor = {
    LOW: "bg-green-100 text-green-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    HIGH: "bg-orange-100 text-orange-700",
    CRITICAL: "bg-red-100 text-red-700",
  };

  const statusColor = {
    TODO: "bg-gray-100 text-gray-700",
    IN_PROGRESS:
      "bg-blue-100 text-blue-700",
    DONE: "bg-green-100 text-green-700",
  };

  return (
    <Link to={`/issues/${issue.id}`}>
      <div className="cursor-pointer rounded-xl bg-white p-6 shadow transition hover:scale-[1.01] hover:shadow-lg">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold">
            {issue.title}
          </h2>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              priorityColor[
                issue.priority
              ]
            }`}
          >
            {issue.priority}
          </span>
        </div>

        <p className="mt-3 text-gray-600">
          {issue.description ||
            "No description"}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              statusColor[
                issue.status
              ]
            }`}
          >
            {issue.status.replace(
              "_",
              " "
            )}
          </span>

          <span className="text-sm text-gray-500">
            Assignee:{" "}
            {issue.assignee_id ??
              "None"}
          </span>
        </div>
      </div>
    </Link>
  );
}