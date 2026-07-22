import { useEffect, useState } from "react";

import { getDashboard } from "../../services/dashboardService";
import type { DashboardStats } from "../../types/dashboard";
import MainLayout from "../../layouts/MainLayout";

import StatCard from "../../components/ui/StatCard";

import {
  ClipboardList,
  Clock3,
  LoaderCircle,
  CheckCircle2,
  AlertTriangle,
  CircleDot,
  Flag,
  CalendarDays,
  CheckCheck,
  Activity,
} from "lucide-react";

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
    <MainLayout>
      <h1 className="mb-8 text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">
        <StatCard
  title="Total Issues"
  value={stats.total_issues}
  icon={<ClipboardList size={24} />}
/>

<StatCard
  title="Todo"
  value={stats.todo}
  icon={<Clock3 size={24} />}
/>

<StatCard
  title="In Progress"
  value={stats.in_progress}
  icon={<LoaderCircle size={24} />}
/>

<StatCard
  title="Completed"
  value={stats.done}
  icon={<CheckCircle2 size={24} />}
/>

<StatCard
  title="High Priority"
  value={stats.high_priority}
  icon={<AlertTriangle size={24} />}
/>

<StatCard
  title="Medium Priority"
  value={stats.medium_priority}
  icon={<CircleDot size={24} />}
/>

<StatCard
  title="Low Priority"
  value={stats.low_priority}
  icon={<Flag size={24} />}
/>

<StatCard
  title="Overdue Issues"
  value={stats.overdue_issues}
  icon={<AlertTriangle size={24} />}
/>

<StatCard
  title="Milestones"
  value={stats.total_milestones}
  icon={<CalendarDays size={24} />}
/>

<StatCard
  title="Completed Milestones"
  value={stats.completed_milestones}
  icon={<CheckCheck size={24} />}
/>

<StatCard
  title="Recent Activity"
  value={stats.recent_activity}
  icon={<Activity size={24} />}
/>
      </div>
    </MainLayout>
  );
}