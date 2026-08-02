import { useEffect, useState } from "react";

import {
  getLabels,
} from "../../services/labelService";

import type {
  Label,
} from "../../types/label";

interface AttachLabelModalProps {

  open: boolean;

  organizationId: number;

  loading: boolean;

  onClose: () => void;

  onAttach: (
    labelId: number
  ) => Promise<void>;

}

export default function AttachLabelModal({

  open,

  organizationId,

  loading,

  onClose,

  onAttach,

}: AttachLabelModalProps) {

  const [labels, setLabels] =
    useState<Label[]>([]);

  const [selectedLabel, setSelectedLabel] =
    useState<number>();

  useEffect(() => {

    if (!open) return;

    const fetchLabels = async () => {

      try {

        const data =
          await getLabels(
            organizationId
          );

        setLabels(data);

      } catch (error) {

        console.error(error);

      }

    };

    fetchLabels();

  }, [
    open,
    organizationId,
  ]);

  if (!open) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-xl bg-white p-6">

        <h2 className="mb-6 text-xl font-bold">

          Attach Label

        </h2>

        <select

          className="mb-6 w-full rounded-lg border p-3"

          value={selectedLabel}

          onChange={(e) =>
            setSelectedLabel(
              Number(e.target.value)
            )
          }

        >

          <option value="">

            Select Label

          </option>

          {labels.map((label) => (

            <option

              key={label.id}

              value={label.id}

            >

              {label.name}

            </option>

          ))}

        </select>

        <div className="flex justify-end gap-3">

          <button

            onClick={onClose}

            className="rounded-lg border px-4 py-2"

          >

            Cancel

          </button>

          <button

            disabled={
              loading ||
              !selectedLabel
            }

            onClick={() => {

              if (selectedLabel) {

                onAttach(
                  selectedLabel
                );

              }

            }}

            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"

          >

            Attach

          </button>

        </div>

      </div>

    </div>

  );

}