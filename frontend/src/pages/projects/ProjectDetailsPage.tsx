import { useEffect, useState } from "react";
import {
  useParams,
  Link,
} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import EditProjectModal from "../../components/ui/EditProjectModal";

import {
  getProject,
  updateProject,
  deleteProject,
} from "../../services/projectService";

import type { Project } from "../../types/project";

// activity
import ActivityCard from "../../components/activity/ActivityCard";

import {
  getProjectActivity,
} from "../../services/activityService";

import type {
  ActivityLog,
} from "../../types/activity";


export default function ProjectDetailsPage() {

  // Project ID from URL
  const { projectId } = useParams();


  // Project data
  const [project, setProject] =
    useState<Project | null>(null);


  // Edit modal state
  const [editing, setEditing] =
    useState(false);


  // Loading state
  const [loading, setLoading] =
    useState(true);

  // Activity logs  
  const [activities, setActivities] =
  useState<ActivityLog[]>([]);

  // Fetch project details
  const fetchProject = async () => {

    if (!projectId) return;


    try {

      const data =
        await getProject(
          Number(projectId)
        );


      setProject(data);

    } catch(error) {

      console.error(error);


    } finally {

      setLoading(false);

    }

  };

// Fetch project activity
const fetchActivity = async () => {

  if (!projectId) return;

  try {

    const data =
      await getProjectActivity(
        Number(projectId)
      );

    setActivities(data);

  } catch(error) {

    console.error(error);

  }

};

  useEffect(() => {

    fetchProject();
    fetchActivity();


  }, [projectId]);





  // Update project
  const handleUpdateProject = async (
    name: string,
    description: string
  ) => {

    if (!projectId) return;


    try {

      await updateProject(
        Number(projectId),
        {
          name,
          description,
        }
      );



      setEditing(false);


      await fetchProject();


      alert(
        "Project updated successfully!"
      );



    } catch(error) {


      console.error(error);

      alert(
        "Failed to update project."
      );

    }

  };


  // Delete project
  const handleDeleteProject = async () => {


    if (!projectId) return;

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this project?"
      );


    if (!confirmDelete) return;


    try {


      await deleteProject(
        Number(projectId)
      );


      alert(
        "Project deleted successfully!"
      );



      window.location.href =
        `/organizations/${project?.organization_id}/projects`;



    } catch(error) {


      console.error(error);



      alert(
        "Failed to delete project."
      );


    }


  };


  return (

    <MainLayout>


      {loading ? (

        <p>
          Loading...
        </p>


      ) : project ? (


        <div className="rounded-xl bg-white p-6 shadow">


          {/* Project Details */}

          <h1 className="text-3xl font-bold">
            {project.name}
          </h1>



          <p className="mt-4 text-gray-600">
            {project.description}
          </p>



          <p className="mt-4 text-sm text-gray-400">
            Key: {project.key}
          </p>


          {/* Project Modules */}

          <div className="mt-6 flex gap-4">


            {/* Issues */}

            <Link

              to={`/projects/${project.id}/issues`}

              className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"

            >

              View Issues

            </Link>

            {/* Milestones */}

            <Link

              to={`/projects/${project.id}/milestones`}

              className="rounded-lg bg-purple-600 px-5 py-2 text-white hover:bg-purple-700"

            >

              View Milestones

            </Link>


          </div>

          {/* Project Actions */}

          <div className="mt-8 flex gap-4">


            {/* PATCH /projects/{project_id} */}

            <button

              onClick={() =>
                setEditing(true)
              }

              className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"

            >

              Edit Project

            </button>

            {/* DELETE /projects/{project_id} */}

            <button

              onClick={handleDeleteProject}

              className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"

            >

              Delete Project

            </button>



          </div>

           {/* Activity Logs */}

<div className="mt-10">

  <h2 className="mb-4 text-2xl font-bold">
    Activity
  </h2>


  {
    activities.length === 0 ? (

      <p className="text-gray-500">
        No activity yet.
      </p>

    ) : (

      <div className="space-y-4">

        {
          activities.map((activity) => (

            <ActivityCard

              key={activity.id}

              activity={activity}

            />

          ))
        }

      </div>

    )
  }

</div>   

          {/* Edit Modal */}

          {editing && (

            <div className="mt-6">


              <EditProjectModal

                project={project}

                onUpdate={
                  handleUpdateProject
                }

              />


            </div>

          )}



        </div>



      ) : (


        <p>
          Project not found.
        </p>


      )}



    </MainLayout>

  );

}