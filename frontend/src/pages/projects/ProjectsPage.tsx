import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import ProjectCard from "../../components/ui/ProjectCard";

import { getProjects } from "../../services/projectService";

import type { Project } from "../../types/project";

export default function ProjectsPage() {
  const { organizationId } = useParams();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!organizationId) return;

    const fetchProjects = async () => {
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
    };

    fetchProjects();
  }, [organizationId]);

  return (
    <MainLayout>
      <h1 className="mb-8 text-3xl font-bold">
        Projects
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
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