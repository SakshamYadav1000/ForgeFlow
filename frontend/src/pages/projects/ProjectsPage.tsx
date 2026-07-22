import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import ProjectCard from "../../components/ui/ProjectCard";

import { getProjects } from "../../services/projectService";

import type { Project } from "../../types/project";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <MainLayout>
      <h1 className="mb-8 text-3xl font-bold">
        Projects
      </h1>

      {loading ? (
        <p>Loading...</p>
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