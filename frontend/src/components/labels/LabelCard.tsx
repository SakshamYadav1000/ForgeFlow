import { Link } from "react-router-dom";

import type { Label } from "../../types/label";

interface LabelCardProps {
  label: Label;
}

export default function LabelCard({
  label,
}: LabelCardProps) {
  return (
    <Link
      to={`/labels/${label.id}`}
    >
      <div className="cursor-pointer rounded-xl bg-white p-6 shadow transition hover:scale-[1.01] hover:shadow-lg">

        <div className="flex items-center gap-3">

          <div
            className="h-5 w-5 rounded-full border"
            style={{
              backgroundColor: label.color,
            }}
          />

          <h2 className="text-xl font-semibold">
            {label.name}
          </h2>

        </div>

        <p className="mt-4 text-sm text-gray-500">
          {label.color}
        </p>

      </div>
    </Link>
  );
}