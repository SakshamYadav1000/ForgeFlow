import { useEffect, useState } from "react";

import { getDashboard } from "../../services/dashboardService";
import type { DashboardStats } from "../../types/dashboard";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard(2);
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, []);

  if (!stats) {
    return <h1 className="p-8 text-2xl">Loading...</h1>;
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">
        ForgeFlow Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2>Total Issues</h2>
          <p className="mt-2 text-3xl font-bold">
            {stats.total_issues}
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2>Todo</h2>
          <p className="mt-2 text-3xl font-bold">
            {stats.todo}
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2>In Progress</h2>
          <p className="mt-2 text-3xl font-bold">
            {stats.in_progress}
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2>Completed</h2>
          <p className="mt-2 text-3xl font-bold">
            {stats.done}
          </p>
        </div>
      </div>
    </div>
  );
}