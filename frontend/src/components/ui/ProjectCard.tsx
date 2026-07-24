import type { Project } from "../../types/project";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {

  return (
  <Link to={`/projects/${project.id}`}>
    <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg hover:scale-[1.01] cursor-pointer">
      <h2 className="text-xl font-semibold">
        {project.name}
      </h2>

      <p className="mt-3 text-gray-600">
        {project.description}
      </p>
    </div>
  </Link>
);
}