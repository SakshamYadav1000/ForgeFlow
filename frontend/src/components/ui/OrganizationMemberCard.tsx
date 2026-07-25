import type { OrganizationMember } from "../../types/organizationMember";

interface Props {
  member: OrganizationMember;

  // PATCH /organizations/{organization_id}/members/{user_id}
  onEdit: (
    member: OrganizationMember
  ) => void;

  // DELETE /organizations/{organization_id}/members/{user_id}
  onDelete: (
    member: OrganizationMember
  ) => void;
}

export default function OrganizationMemberCard({
  member,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow">
      
      {/* Display Member Details */}
      <h3 className="font-semibold">
        User #{member.user_id}
      </h3>

      <p className="mt-2 text-gray-600">
        Role: {member.role}
      </p>

      <p className="mt-2 text-sm text-gray-400">
        Joined{" "}
        {new Date(
          member.joined_at
        ).toLocaleDateString()}
      </p>

      {/* Member Actions */}
      <div className="mt-4 flex gap-3">
        
        {/* Update Member Role */}
        <button
          onClick={() => onEdit(member)}
          className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
        >
          Edit Role
        </button>

        {/* //Remove Member */}
        <button
          onClick={() => onDelete(member)}
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
}