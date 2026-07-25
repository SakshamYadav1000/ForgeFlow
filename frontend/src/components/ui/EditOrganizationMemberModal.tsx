import { useState } from "react";

import type { OrganizationMember } from "../../types/organizationMember";

interface Props {
  member: OrganizationMember;
  onUpdate: (role: string) => Promise<void>;
}

export default function EditOrganizationMemberModal({
  member,
  onUpdate,
}: Props) {
  const [role, setRole] = useState(member.role);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
  setLoading(true);

  try {
    await onUpdate(role);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">
        Edit Member Role
      </h2>

      <select
        className="mb-4 w-full rounded border p-3"
        value={role}
        onChange={(e) =>
          setRole(e.target.value)
        }
      >
        <option value="owner">Owner</option>
        <option value="admin">Admin</option>
        <option value="member">Member</option>
      </select>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-400"
      >
        {loading
          ? "Updating..."
          : "Update Role"}
      </button>
    </div>
  );
}