import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import { getDashboard } from "../../services/dashboardService";

import type { Dashboard } from "../../types/dashboard";

export default function ProjectDashboardPage() {
  const { projectId } = useParams();

  const [dashboard, setDashboard] =
    useState<Dashboard | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!projectId) return;

      try {
        const data = await getDashboard(
          Number(projectId)
        );

        setDashboard(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [projectId]);

  return (
    <MainLayout>
      <h1 className="mb-8 text-3xl font-bold">
        Project Dashboard
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : dashboard ? (
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-gray-500">
              Total Issues
            </h2>

            <p className="mt-2 text-3xl font-bold">
              {dashboard.total_issues}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-gray-500">
              Todo
            </h2>

            <p className="mt-2 text-3xl font-bold">
              {dashboard.todo}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-gray-500">
              In Progress
            </h2>

            <p className="mt-2 text-3xl font-bold">
              {dashboard.in_progress}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-gray-500">
              Completed
            </h2>

            <p className="mt-2 text-3xl font-bold">
              {dashboard.done}
            </p>
          </div>
        </div>
      ) : (
        <p>Unable to load dashboard.</p>
      )}
    </MainLayout>
  );
}