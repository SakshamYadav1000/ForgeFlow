import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon?: ReactNode;
}

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-500">
          {title}
        </h2>

        <div className="text-blue-600">
          {icon}
        </div>
      </div>

      <p className="text-4xl font-bold text-gray-800">
        {value}
      </p>
    </div>
  );
}