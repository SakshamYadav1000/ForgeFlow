import type { Project } from "../../types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg">
      <h2 className="text-xl font-semibold">
        {project.name}
      </h2>

      <p className="mt-3 text-gray-600">
        {project.description}
      </p>
    </div>
  );
}