import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import EditLabelModal from "../../components/labels/EditLabelModal";

import {
  getLabel,
  updateLabel,
  deleteLabel,
} from "../../services/labelService";

import type {
  Label,
  UpdateLabelRequest,
} from "../../types/label";

export default function LabelDetailsPage() {

  // Label ID from URL
  const { labelId } = useParams();

  const navigate = useNavigate();

  // Label state
  const [label, setLabel] =
    useState<Label | null>(null);

  // Loading state
  const [loading, setLoading] =
    useState(true);

  // Saving state
  const [saving, setSaving] =
    useState(false);

  // Edit modal state
  const [showEditModal, setShowEditModal] =
    useState(false);

  // Fetch label
  const fetchLabel = async () => {

    if (!labelId) return;

    try {

      const data =
        await getLabel(
          Number(labelId)
        );

      setLabel(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchLabel();

  }, [labelId]);

  // Update label
  const handleUpdate = async (
    data: UpdateLabelRequest
  ) => {

    if (!labelId) return;

    try {

      setSaving(true);

      await updateLabel(
        Number(labelId),
        data
      );

      await fetchLabel();

      setShowEditModal(false);

      alert("Label updated successfully.");

    } catch (error) {

      console.error(error);

      alert("Failed to update label.");

    } finally {

      setSaving(false);

    }

  };

  // Delete label
  const handleDelete = async () => {

    if (!label) return;

    const confirmed =
      window.confirm(
        "Delete this label?"
      );

    if (!confirmed) return;

    try {

      await deleteLabel(label.id);

      alert("Label deleted successfully.");

      navigate(-1);

    } catch (error) {

      console.error(error);

      alert("Failed to delete label.");

    }

  };

  return (

    <MainLayout>

      {loading ? (

        <p>Loading...</p>

      ) : !label ? (

        <p>Label not found.</p>

      ) : (

        <>

          {/* Header */}

          <div className="mb-8 flex items-center justify-between">

            <h1 className="text-3xl font-bold">
              Label Details
            </h1>

            <div className="flex gap-3">

              <button
                onClick={() =>
                  setShowEditModal(true)
                }
                className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
              >
                Edit Label
              </button>

              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
              >
                Delete Label
              </button>

            </div>

          </div>

          {/* Label Info */}

          <div className="rounded-xl bg-white p-8 shadow">

            <div className="flex items-center gap-4">

              <div
                className="h-10 w-10 rounded-full border"
                style={{
                  backgroundColor: label.color,
                }}
              />

              <div>

                <h2 className="text-2xl font-bold">
                  {label.name}
                </h2>

                <p className="text-gray-500">
                  {label.color}
                </p>

              </div>

            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">

              <div>

                <h3 className="text-sm text-gray-500">
                  Label ID
                </h3>

                <p>{label.id}</p>

              </div>

              <div>

                <h3 className="text-sm text-gray-500">
                  Organization ID
                </h3>

                <p>{label.organization_id}</p>

              </div>

            </div>

          </div>

          {/* Edit Modal */}

          <EditLabelModal
            open={showEditModal}
            label={label}
            loading={saving}
            onClose={() =>
              setShowEditModal(false)
            }
            onSave={(
              name,
              color
            ) =>
              handleUpdate({
                name,
                color,
              })
            }
          />

        </>

      )}

    </MainLayout>

  );

}