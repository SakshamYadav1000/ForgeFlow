import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import LabelCard from "../../components/labels/LabelCard";
import CreateLabelModal from "../../components/labels/CreateLabelModal";
import EditLabelModal from "../../components/labels/EditLabelModal";

import {
  getLabels,
  createLabel,
  updateLabel,
  deleteLabel,
} from "../../services/labelService";

import type { Label } from "../../types/label";

export default function LabelsPage() {

  // Organization ID from URL
  const { organizationId } = useParams();

  // Labels state
  const [labels, setLabels] =
    useState<Label[]>([]);

  // Loading state
  const [loading, setLoading] =
    useState(true);

  // Selected label for editing
  const [selectedLabel, setSelectedLabel] =
    useState<Label | null>(null);

  // Edit modal state
  const [showEditModal, setShowEditModal] =
    useState(false);

  // Saving state
  const [saving, setSaving] =
    useState(false);

  // Fetch all labels
  const fetchLabels = async () => {

    if (!organizationId) return;

    try {

      const data =
        await getLabels(
          Number(organizationId)
        );

      setLabels(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchLabels();

  }, [organizationId]);

  // Create label
  const handleCreateLabel = async (
    name: string,
    color: string
  ) => {

    if (!organizationId) return;

    try {

      await createLabel(
        Number(organizationId),
        {
          name,
          color,
        }
      );

      await fetchLabels();

      alert("Label created successfully.");

    } catch (error) {

      console.error(error);

      alert("Failed to create label.");

    }

  };

  // Update label
  const handleUpdateLabel = async (
    name: string,
    color: string
  ) => {

    if (!selectedLabel) return;

    try {

      setSaving(true);

      await updateLabel(
        selectedLabel.id,
        {
          name,
          color,
        }
      );

      await fetchLabels();

      setShowEditModal(false);

      setSelectedLabel(null);

      alert("Label updated successfully.");

    } catch (error) {

      console.error(error);

      alert("Failed to update label.");

    } finally {

      setSaving(false);

    }

  };

  // Delete label
  const handleDeleteLabel = async (
    label: Label
  ) => {

    const confirmed =
      window.confirm(
        `Delete "${label.name}"?`
      );

    if (!confirmed) return;

    try {

      await deleteLabel(label.id);

      await fetchLabels();

      alert("Label deleted successfully.");

    } catch (error) {

      console.error(error);

      alert("Failed to delete label.");

    }

  };

  return (

    <MainLayout>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Labels
        </h1>

        <CreateLabelModal
          onCreate={handleCreateLabel}
        />

      </div>

      {/* Labels */}
      {loading ? (

        <p>Loading...</p>

      ) : labels.length === 0 ? (

        <p>No labels found.</p>

      ) : (

        <div className="grid grid-cols-2 gap-6">

          {labels.map((label) => (

            <div
              key={label.id}
              className="relative"
            >

              <LabelCard
                label={label}
              />

              <div className="mt-3 flex gap-2">

                <button
                  onClick={() => {

                    setSelectedLabel(label);

                    setShowEditModal(true);

                  }}
                  className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDeleteLabel(label)
                  }
                  className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

      <EditLabelModal
        open={showEditModal}
        label={selectedLabel}
        loading={saving}
        onClose={() => {

          setShowEditModal(false);

          setSelectedLabel(null);

        }}
        onSave={handleUpdateLabel}
      />

    </MainLayout>

  );

}