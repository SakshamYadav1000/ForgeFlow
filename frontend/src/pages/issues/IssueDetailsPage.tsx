import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import EditIssueModal from "../../components/issues/EditIssueModal";

import {
  getIssue,
  updateIssue,
  deleteIssue,
} from "../../services/issueService";

import type { Issue } from "../../types/issue";

export default function IssueDetailsPage() {
  const { issueId } = useParams();

  const navigate = useNavigate();

  const [issue, setIssue] =
    useState<Issue | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const fetchIssue = async () => {
    if (!issueId) return;

    try {
      const data = await getIssue(Number(issueId));
      setIssue(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssue();
  }, [issueId]);

  const handleUpdate = async (data: {
    title: string;
    description: string;
    status: string;
    priority: string;
    assignee_id: number | null;
    milestone_id: number | null;
  }) => {
    if (!issueId) return;

    try {
      setSaving(true);

      await updateIssue(Number(issueId), data);

      await fetchIssue();

      setShowEditModal(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update issue.");
    } finally {
      setSaving(false);
    }
  };

const handleDelete = async () => {
  if (!issueId) return;

  const confirmed = window.confirm(
    "Are you sure you want to delete this issue?"
  );

  if (!confirmed) return;

  try {
    await deleteIssue(Number(issueId));

    navigate("/projects");
  } catch (error) {
    console.error(error);

    alert("Failed to delete issue.");
  }
};

  return (
    <MainLayout>
      {loading ? (
        <p>Loading...</p>
      ) : !issue ? (
        <p>Issue not found.</p>
      ) : (
        <>
          <div className="mb-8 flex items-center justify-between">
  <h1 className="text-3xl font-bold">
    Issue Details
  </h1>

  <div className="flex gap-3">
    <button
      onClick={() => setShowEditModal(true)}
      className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
    >
      Edit Issue
    </button>

    <button
      onClick={handleDelete}
      className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
    >
      Delete Issue
    </button>
  </div>
</div>

          <div className="rounded-xl bg-white p-8 shadow">
            <h2 className="text-2xl font-bold">
              {issue.title}
            </h2>

            <p className="mt-4 text-gray-600">
              {issue.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm text-gray-500">
                  Status
                </h3>

                <p className="font-semibold">
                  {issue.status}
                </p>
              </div>

              <div>
                <h3 className="text-sm text-gray-500">
                  Priority
                </h3>

                <p className="font-semibold">
                  {issue.priority}
                </p>
              </div>

              <div>
                <h3 className="text-sm text-gray-500">
                  Reporter
                </h3>

                <p>{issue.reporter_id}</p>
              </div>

              <div>
                <h3 className="text-sm text-gray-500">
                  Assignee
                </h3>

                <p>
                  {issue.assignee_id ??
                    "Unassigned"}
                </p>
              </div>

              <div>
                <h3 className="text-sm text-gray-500">
                  Milestone
                </h3>

                <p>
                  {issue.milestone_id ??
                    "None"}
                </p>
              </div>

              <div>
                <h3 className="text-sm text-gray-500">
                  Project ID
                </h3>

                <p>{issue.project_id}</p>
              </div>

              <div>
                <h3 className="text-sm text-gray-500">
                  Created
                </h3>

                <p>
                  {new Date(
                    issue.created_at
                  ).toLocaleString()}
                </p>
              </div>

              <div>
                <h3 className="text-sm text-gray-500">
                  Updated
                </h3>

                <p>
                  {new Date(
                    issue.updated_at
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <EditIssueModal
            open={showEditModal}
            issue={issue}
            loading={saving}
            onClose={() =>
              setShowEditModal(false)
            }
            onSave={handleUpdate}
          />
        </>
      )}
    </MainLayout>
  );
}