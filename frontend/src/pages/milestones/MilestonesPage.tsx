import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import MilestoneCard from "../../components/milestones/MilestoneCard";

import CreateMilestoneModal from "../../components/milestones/CreateMilestoneModal";

import EditMilestoneModal from "../../components/milestones/EditMilestoneModal";


import {
  getProjectMilestones,
  createMilestone,
  updateMilestone,
  deleteMilestone,
} from "../../services/milestoneService";


import type {
  Milestone,
  CreateMilestoneRequest,
  UpdateMilestoneRequest,
} from "../../types/milestone";



export default function MilestonesPage() {


  const { projectId } =
    useParams();



  const [milestones, setMilestones] =
    useState<Milestone[]>([]);



  const [loading, setLoading] =
    useState(true);



  const [saving, setSaving] =
    useState(false);



  const [showCreateModal, setShowCreateModal] =
    useState(false);



  const [selectedMilestone, setSelectedMilestone] =
    useState<Milestone | null>(null);



  // Fetch milestones
  const fetchMilestones = async () => {

    if (!projectId) return;


    try {

      const data =
        await getProjectMilestones(
          Number(projectId)
        );


      setMilestones(data);


    } catch(error) {

      console.error(error);


    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchMilestones();

  }, [projectId]);





  // Create milestone
  const handleCreate = async (
    data: CreateMilestoneRequest
  ) => {


    if (!projectId) return;


    try {

      setSaving(true);


      await createMilestone(
        Number(projectId),
        data
      );


      await fetchMilestones();


      setShowCreateModal(false);


      alert(
        "Milestone created successfully."
      );


    } catch(error) {

      console.error(error);


      alert(
        "Failed to create milestone."
      );


    } finally {

      setSaving(false);

    }

  };






  // Update milestone
  const handleUpdate = async (
    data: UpdateMilestoneRequest
  ) => {


    if (!selectedMilestone) return;


    try {

      setSaving(true);


      await updateMilestone(
        selectedMilestone.id,
        data
      );


      await fetchMilestones();


      setSelectedMilestone(null);


      alert(
        "Milestone updated successfully."
      );


    } catch(error) {

      console.error(error);


      alert(
        "Failed to update milestone."
      );


    } finally {

      setSaving(false);

    }

  };







  // Delete milestone
  const handleDelete = async (
    milestone: Milestone
  ) => {


    const confirmed =
      window.confirm(
        "Delete this milestone?"
      );


    if (!confirmed) return;



    try {


      await deleteMilestone(
        milestone.id
      );



      await fetchMilestones();



      alert(
        "Milestone deleted successfully."
      );



    } catch(error) {


      console.error(error);



      alert(
        "Failed to delete milestone."
      );


    }

  };






  return (

    <MainLayout>


      <div className="mb-8 flex items-center justify-between">


        <h1 className="text-3xl font-bold">
          Milestones
        </h1>



        <button

          onClick={() =>
            setShowCreateModal(true)
          }

          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"

        >

          Create Milestone

        </button>


      </div>





      {loading ? (

        <p>
          Loading...
        </p>



      ) : milestones.length === 0 ? (


        <p>
          No milestones found.
        </p>



      ) : (


        <div className="grid gap-4">


          {milestones.map(
            (milestone) => (

              <MilestoneCard

                key={milestone.id}

                milestone={milestone}

                onEdit={
                  setSelectedMilestone
                }

                onDelete={
                  handleDelete
                }

              />

            )
          )}


        </div>


      )}







      <CreateMilestoneModal

        open={
          showCreateModal
        }

        loading={
          saving
        }

        onClose={() =>
          setShowCreateModal(false)
        }

        onSave={
          handleCreate
        }

      />





      {selectedMilestone && (

        <EditMilestoneModal

          open={
            true
          }

          milestone={
            selectedMilestone
          }

          loading={
            saving
          }

          onClose={() =>
            setSelectedMilestone(null)
          }

          onSave={
            handleUpdate
          }

        />

      )}



    </MainLayout>

  );

}