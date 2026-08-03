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
  getProjectIssues,
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

import type {
  IssueDependency,
  DependencyType,
} from "../../types/issueDependency";

// for labels
import AttachLabelModal from "../../components/labels/AttachLabelModal";

import type { Label } from "../../types/label";

import {
  getIssueLabels,
  attachLabelToIssue,
  removeLabelFromIssue,
} from "../../services/labelService";

//for dependencies
import DependencyCard from "../../components/dependencies/DependencyCard";
import CreateDependencyModal from "../../components/dependencies/CreateDependencyModal";

// for project
import {
  getProject,
} from "../../services/projectService";

import {
  createDependency,
  getDependencies,
  deleteDependency,
} from "../../services/issueDependencyService";

import ActivityCard from "../../components/activity/ActivityCard";

import {
  getIssueActivity,
} from "../../services/activityService";

import type {
  ActivityLog,
} from "../../types/activity";

//for attachments
import { Paperclip, Upload } from "lucide-react";

import AttachmentCard from "../../components/attachments/AttachmentCard";
import UploadAttachmentModal from "../../components/attachments/UploadAttachmentModal";

import {
  deleteAttachment,
  getIssueAttachments,
  uploadAttachment,
} from "../../services/attachmentService";

import type { Attachment } from "../../types/attachment";

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

  const [organizationId, setOrganizationId] =
    useState<number>();

  // Attached labels
  const [labels, setLabels] =
    useState<Label[]>([]);

  // Attach modal
  const [showAttachModal, setShowAttachModal] =
    useState(false);

  // Issue dependencies
  const [dependencies, setDependencies] =
    useState<IssueDependency[]>([]);

  const [projectIssues, setProjectIssues] =
    useState<Issue[]>([]);

  const [dependenciesLoading, setDependenciesLoading] =
    useState(true);

  const [dependencySaving, setDependencySaving] =
    useState(false);

  // Activity logs
  const [activities, setActivities] =
    useState<ActivityLog[]>([]);

  // Attachments
  const [attachments, setAttachments] =
    useState<Attachment[]>([]);

  const [showUploadAttachmentModal, setShowUploadAttachmentModal] =
    useState(false);

  const [attachmentSaving, setAttachmentSaving] =
    useState(false);

  const [deletingAttachmentId, setDeletingAttachmentId] =
    useState<number | null>(null);

  // fetching

  const fetchIssue = async () => {
    if (!issueId) return;

    try {
      const data =
        await getIssue(
          Number(issueId)
        );

      setIssue(data);

      const project =
        await getProject(
          data.project_id
        );

      setOrganizationId(
        project.organization_id
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch labels attached to this issue
  const fetchLabels = async () => {

    if (!issueId) return;

    try {

      const data =
        await getIssueLabels(
          Number(issueId)
        );

      setLabels(data);

    } catch (error) {

      console.error(error);

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

  //fetch activity logs
  const fetchActivity = async () => {

    if (!issueId) return;

    try {

      const data =
        await getIssueActivity(
          Number(issueId)
        );

      setActivities(data);

    } catch (error) {

      console.error(error);

    }

  };

  // Fetch attachments
  const fetchAttachments = async () => {
    if (!issueId) {
      return;
    }

    try {
      const data = await getIssueAttachments(
        Number(issueId)
      );

      setAttachments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUploadAttachment = async (
    file: File
  ) => {
    if (!issueId) {
      return;
    }

    try {
      setAttachmentSaving(true);

      await uploadAttachment(
        Number(issueId),
        file
      );

      await fetchAttachments();

      setShowUploadAttachmentModal(false);

      alert("Attachment uploaded successfully!");
    } catch (error) {
      console.error(error);

      alert("Failed to upload attachment.");
    } finally {
      setAttachmentSaving(false);
    }
  };

  const handleDeleteAttachment = async (
    attachmentId: number
  ) => {
    try {
      setDeletingAttachmentId(attachmentId);

      await deleteAttachment(attachmentId);

      await fetchAttachments();

      alert("Attachment deleted successfully!");
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete attachment. You may only delete files you uploaded."
      );
    } finally {
      setDeletingAttachmentId(null);
    }
  };

  useEffect(() => {
    fetchIssue();
    fetchComments();
    fetchLabels();
    fetchDependencies();
    fetchActivity();
    fetchAttachments();
  }, [issueId]);

  useEffect(() => {

    if (issue) {
      fetchProjectIssueList();
    }
  }, [issue]);

  // Fetch issue dependencies
  const fetchDependencies = async () => {

    if (!issueId) return;

    try {

      const data =
        await getDependencies(
          Number(issueId)
        );

      setDependencies(data);

    } catch (error) {

      console.error(error);

    } finally {

      setDependenciesLoading(false);

    }

  };

  // Fetch project issues for dependency selection
  const fetchProjectIssueList = async () => {

    if (!issue) return;

    try {

      const data =
        await getProjectIssues(
          issue.project_id
        );

      setProjectIssues(data);

    } catch (error) {

      console.error(error);

    }

  };

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

  const handleAttachLabel = async (
    labelId: number
  ) => {

    if (!issue) return;

    try {

      await attachLabelToIssue(
        issue.id,
        labelId
      );

      await fetchLabels();

      setShowAttachModal(false);

      alert("Label attached.");

    } catch (error) {

      console.error(error);

      alert("Failed to attach label.");

    }

  };

  const handleRemoveLabel = async (
    labelId: number
  ) => {

    if (!issue) return;

    try {

      await removeLabelFromIssue(
        issue.id,
        labelId
      );

      await fetchLabels();

    } catch (error) {

      console.error(error);

      alert("Failed to remove label.");

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

  const handleCreateDependency = async (
    targetIssueId: number,
    dependencyType: DependencyType
  ) => {

    if (!issue) return;

    try {

      setDependencySaving(true);

      await createDependency(
        issue.id,
        {
          target_issue_id: targetIssueId,
          dependency_type: dependencyType,
        }
      );


      await fetchDependencies();


      alert(
        "Dependency created successfully."
      );


    } catch (error) {

      console.error(error);

      alert(
        "Failed to create dependency."
      );


    } finally {

      setDependencySaving(false);

    }

  };



  const handleDeleteDependency = async (
    dependencyId: number
  ) => {

    if (!issue) return;


    const confirmed =
      window.confirm(
        "Are you sure you want to remove this dependency?"
      );


    if (!confirmed) return;



    try {


      await deleteDependency(
        issue.id,
        dependencyId
      );


      await fetchDependencies();


      alert(
        "Dependency removed successfully."
      );


    } catch (error) {

      console.error(error);


      alert(
        "Failed to remove dependency."
      );

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
          {/* Issue header */}
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">
              Issue
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

          {/* Issue detail */}
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
                  {issue.assignee_id ?? "Unassigned"}
                </p>
              </div>

              <div>
                <h3 className="text-sm text-gray-500">
                  Milestone
                </h3>
                <p>
                  {issue.milestone_id ?? "None"}
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

            {/* Labels */}
            <div className="mt-10">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold">
                  Labels
                </h3>

                <button
                  onClick={() => setShowAttachModal(true)}
                  className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  Attach Label
                </button>
              </div>

              {labels.length === 0 ? (
                <p className="text-gray-500">
                  No labels attached.
                </p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {labels.map((label) => (
                    <div
                      key={label.id}
                      className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white"
                      style={{
                        backgroundColor: label.color,
                      }}
                    >
                      <span>{label.name}</span>

                      <button
                        onClick={() =>
                          handleRemoveLabel(label.id)
                        }
                        className="font-bold"
                        title="Remove label"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dependencies */}
            <div className="mt-10">
              <h2 className="mb-4 text-2xl font-bold">
                Dependencies
              </h2>

              {dependenciesLoading ? (
                <p>Loading dependencies...</p>
              ) : dependencies.length === 0 ? (
                <p className="text-gray-500">
                  No dependencies.
                </p>
              ) : (
                <div className="space-y-4">
                  {dependencies.map((dependency) => (
                    <DependencyCard
                      key={dependency.id}
                      dependency={dependency}
                      onDelete={handleDeleteDependency}
                    />
                  ))}
                </div>
              )}

              <div className="mt-5">
                <CreateDependencyModal
                  issues={projectIssues.filter(
                    (item) => item.id !== issue.id
                  )}
                  loading={dependencySaving}
                  onCreate={handleCreateDependency}
                />
              </div>
            </div>

            {/* Attachments */}
            <div className="mt-10">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Paperclip size={22} />

                  <h2 className="text-2xl font-bold">
                    Attachments
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowUploadAttachmentModal(true)
                  }
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  <Upload size={18} />
                  Upload File
                </button>
              </div>

              {attachments.length === 0 ? (
                <p className="text-gray-500">
                  No attachments yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {attachments.map((attachment) => (
                    <AttachmentCard
                      key={attachment.id}
                      attachment={attachment}
                      deleting={
                        deletingAttachmentId === attachment.id
                      }
                      onDelete={handleDeleteAttachment}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Comments */}
          <div className="mt-10">
            <h2 className="mb-4 text-2xl font-bold">
              Comments
            </h2>

            <div className="space-y-4">
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

            <div className="mt-6">
              <CreateCommentModal
                onCreate={handleCreateComment}
              />
            </div>
          </div>

          {/* Activity */}
          <div className="mt-10">
            <h2 className="mb-4 text-2xl font-bold">
              Activity
            </h2>

            {activities.length === 0 ? (
              <p className="text-gray-500">
                No activity yet.
              </p>
            ) : (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Modals */}
          <EditIssueModal
            open={showEditModal}
            issue={issue}
            loading={saving}
            onClose={() => setShowEditModal(false)}
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

          <AttachLabelModal
            open={showAttachModal}
            organizationId={organizationId ?? 0}
            loading={false}
            onClose={() => setShowAttachModal(false)}
            onAttach={handleAttachLabel}
          />

          <UploadAttachmentModal
            open={showUploadAttachmentModal}
            loading={attachmentSaving}
            onClose={() =>
              setShowUploadAttachmentModal(false)
            }
            onUpload={handleUploadAttachment}
          />
        </>
      )}
    </MainLayout>
  );
}