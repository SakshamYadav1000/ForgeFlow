import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import EditIssueModal from "../../components/issues/EditIssueModal";

import CommentCard from "../../components/comments/CommentCard";
import CreateCommentModal from "../../components/comments/CreateCommentModal";
import EditCommentModal from "../../components/comments/EditCommentModal";

import {
  getIssue,
  updateIssue,
  deleteIssue,
} from "../../services/issueService";

import {
  createComment,
  getIssueComments,
  updateComment,
  deleteComment,
} from "../../services/commentService";

import type {
  Issue,
  UpdateIssueRequest,
} from "../../types/issue";

import type {
  Comment,
  UpdateCommentRequest,
} from "../../types/comment";

export default function IssueDetailsPage() {
  const { issueId } = useParams();

  const navigate = useNavigate();

  const [issue, setIssue] =
    useState<Issue | null>(null);

  const [comments, setComments] =
    useState<Comment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [commentsLoading, setCommentsLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [commentSaving, setCommentSaving] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showEditCommentModal, setShowEditCommentModal] =
    useState(false);

  const [selectedComment, setSelectedComment] =
    useState<Comment | null>(null);

  const fetchIssue = async () => {
    if (!issueId) return;

    try {
      const data = await getIssue(
        Number(issueId)
      );

      setIssue(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    if (!issueId) return;

    try {
      const data = await getIssueComments(
        Number(issueId)
      );

      setComments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    fetchIssue();
    fetchComments();
  }, [issueId]);

  const handleUpdate = async (
    data: UpdateIssueRequest
  ) => {
    if (!issueId) return;

    try {
      setSaving(true);

      await updateIssue(
        Number(issueId),
        data
      );

      await fetchIssue();

      setShowEditModal(false);

      alert("Issue updated successfully.");
    } catch (error) {
      console.error(error);

      alert("Failed to update issue.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!issue) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this issue?"
    );

    if (!confirmed) return;

    try {
      await deleteIssue(issue.id);

      alert("Issue deleted successfully.");

      navigate(-1);
    } catch (error) {
      console.error(error);

      alert("Failed to delete issue.");
    }
  };

  const handleCreateComment = async (
    content: string
  ) => {
    if (!issueId) return;

    try {
      await createComment(
        Number(issueId),
        { content }
      );

      await fetchComments();
    } catch (error) {
      console.error(error);

      throw error;
    }
  };

  const handleEditComment = (
    comment: Comment
  ) => {
    setSelectedComment(comment);

    setShowEditCommentModal(true);
  };

  const handleUpdateComment = async (
    content: string
  ) => {
    if (!selectedComment) return;

    try {
      setCommentSaving(true);

      const data: UpdateCommentRequest = {
        content,
      };

      await updateComment(
        selectedComment.id,
        data
      );

      await fetchComments();

      setShowEditCommentModal(false);

      setSelectedComment(null);

      alert("Comment updated successfully.");
    } catch (error) {
      console.error(error);

      alert("Failed to update comment.");
    } finally {
      setCommentSaving(false);
    }
  };

  const handleDeleteComment = async (
    commentId: number
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmed) return;

    try {
      await deleteComment(commentId);

      await fetchComments();

      alert("Comment deleted successfully.");
    } catch (error) {
      console.error(error);

      alert("Failed to delete comment.");
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
                onClick={() =>
                  setShowEditModal(true)
                }
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

          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-bold">
              Comments
            </h2>

            <CreateCommentModal
              onCreate={handleCreateComment}
            />

            <div className="mt-6 space-y-4">
              {commentsLoading ? (
                <p>Loading comments...</p>
              ) : comments.length === 0 ? (
                <p className="text-gray-500">
                  No comments yet.
                </p>
              ) : (
                comments.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    comment={comment}
                    onEdit={handleEditComment}
                    onDelete={handleDeleteComment}
                  />
                ))
              )}
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

          <EditCommentModal
            open={showEditCommentModal}
            comment={selectedComment}
            loading={commentSaving}
            onClose={() => {
              setShowEditCommentModal(false);
              setSelectedComment(null);
            }}
            onSave={handleUpdateComment}
          />
        </>
      )}
    </MainLayout>
  );
}