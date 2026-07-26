import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import ProjectCard from "../../components/ui/ProjectCard";
import CreateProjectModal from "../../components/ui/CreateProjectModal";

import {
  getProjects,
  createProject,
} from "../../services/projectService";

import type { Project } from "../../types/project";


export default function ProjectsPage() {

  // Organization ID from URL
  const { organizationId } = useParams();


  // Projects state
  const [projects, setProjects] =
    useState<Project[]>([]);


  // Loading state
  const [loading, setLoading] =
    useState(true);



  // Fetch projects
  const fetchProjects = useCallback(async () => {

    if (!organizationId) return;


    try {

      const data = await getProjects(
        Number(organizationId)
      );

      setProjects(data);


    } catch (error) {

      console.error(error);


    } finally {

      setLoading(false);

    }

  }, [organizationId]);



  // Load projects when organization changes
  useEffect(() => {

    fetchProjects();

  }, [fetchProjects]);



  // Create project
  // POST /organizations/{organization_id}/projects
  const handleCreateProject = async (
    name: string,
    key: string,
    description: string
  ) => {

    if (!organizationId) return;


    try {

      await createProject(
        Number(organizationId),
        {
          name,
          key,
          description,
        }
      );


      // Refresh projects after creation
      await fetchProjects();


      alert(
        "Project created successfully!"
      );


    } catch (error: any) {

      console.error(error);


      alert(
        error.response?.data?.detail ??
        "Failed to create project."
      );

    }

  };



  return (

    <MainLayout>


      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Projects
        </h1>



        {/* 
          POST /organizations/{organization_id}/projects
        */}
        <CreateProjectModal
          onCreate={handleCreateProject}
        />

      </div>



      {/* 
        GET /organizations/{organization_id}/projects
      */}

      {loading ? (

        <p>
          Loading...
        </p>


      ) : projects.length === 0 ? (

        <p>
          No projects found.
        </p>


      ) : (

        <div className="grid grid-cols-2 gap-6">

          {projects.map((project) => (

            <ProjectCard
              key={project.id}
              project={project}
            />

          ))}

        </div>

      )}


    </MainLayout>

  );

}