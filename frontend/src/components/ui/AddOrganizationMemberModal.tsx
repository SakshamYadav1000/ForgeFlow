import { useState } from "react";

interface Props {
  onAdd: (
    userId: number,
    role: string
  ) => Promise<void>;
}

export default function AddOrganizationMemberModal({
  onAdd,
}: Props) {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("member");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await onAdd(
        Number(userId),
        role
      );

      // Reset form after successful addition
      setUserId("");
      setRole("member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">
        Add Member
      </h2>

      <input
        type="number"
        placeholder="User ID"
        className="mb-4 w-full rounded border p-3"
        value={userId}
        onChange={(e) =>
          setUserId(e.target.value)
        }
      />

      <select
        className="mb-4 w-full rounded border p-3"
        value={role}
        onChange={(e) => setRole(e.target.value)}
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
          ? "Adding..."
          : "Add Member"}
      </button>
    </div>
  );
}