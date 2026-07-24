import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import { getIssues } from "../../services/issueService";

import type { Issue } from "../../types/issue";

export default function IssuesPage() {
  const { projectId } = useParams();

  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      if (!projectId) return;

      try {
        const data = await getIssues(Number(projectId));
        setIssues(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [projectId]);

  return (
    <MainLayout>
      <h1 className="mb-8 text-3xl font-bold">
        Issues
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : issues.length === 0 ? (
        <p>No issues found.</p>
      ) : (
        <div className="space-y-4">
          {issues.map((issue) => (
            <Link
              key={issue.id}
              to={`/issues/${issue.id}`}
              className="block rounded-xl bg-white p-6 shadow transition hover:shadow-lg hover:border-blue-500 border border-transparent"
            >
              <h2 className="text-xl font-semibold">
                {issue.title}
              </h2>

              <p className="mt-2 text-gray-600">
                {issue.description}
              </p>

              <div className="mt-4 flex gap-6 text-sm">
                <span>
                  Status: <strong>{issue.status}</strong>
                </span>

                <span>
                  Priority: <strong>{issue.priority}</strong>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </MainLayout>
  );
}