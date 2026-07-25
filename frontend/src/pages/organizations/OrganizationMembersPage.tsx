import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import AddOrganizationMemberModal from "../../components/ui/AddOrganizationMemberModal";
import EditOrganizationMemberModal from "../../components/ui/EditOrganizationMemberModal";
import OrganizationMemberCard from "../../components/ui/OrganizationMemberCard";

import {
  getOrganizationMembers,
  addOrganizationMember,
  updateOrganizationMember,
  removeOrganizationMember,
} from "../../services/organizationService";

import type { OrganizationMember } from "../../types/organizationMember";

export default function OrganizationMembersPage() {

  // Organization ID from URL
  const { organizationId } = useParams();

  // Members State
  const [members, setMembers] = useState<
    OrganizationMember[]
  >([]);

  // Currently Editing Member
  const [editingMember, setEditingMember] =
    useState<OrganizationMember | null>(null);

  // Loading State
  const [loading, setLoading] = useState(true);

  // Fetch Organization Members
  const fetchMembers = async () => {
    try {
      const data =
        await getOrganizationMembers(
          Number(organizationId)
        );

      setMembers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Load members on page load
  useEffect(() => {
    fetchMembers();
  }, [organizationId]);

  // Add Organization Member
  const handleAddMember = async (
    userId: number,
    role: string
  ) => {
    try {
      await addOrganizationMember(
        Number(organizationId),
        {
          user_id: userId,
          role,
        }
      );

      await fetchMembers();

      alert("Member added successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to add member.");
    }
  };

  // Update Member Role
  const handleUpdateMember = async (
    role: string
  ) => {
    if (!editingMember) return;

    try {
      await updateOrganizationMember(
        Number(organizationId),
        editingMember.user_id,
        {
          role,
        }
      );

      setEditingMember(null);

      await fetchMembers();

      alert("Member role updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update member.");
    }
  };

  // Remove Member
  const handleDeleteMember = async (
    member: OrganizationMember
  ) => {
    const confirmDelete = window.confirm(
      "Remove this member from the organization?"
    );

    if (!confirmDelete) return;

    try {
      await removeOrganizationMember(
        Number(organizationId),
        member.user_id
      );

      await fetchMembers();

      alert("Member removed successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to remove member.");
    }
  };

  return (
    <MainLayout>
      
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Organization Members
        </h1>

        {/* Add members */}
        <AddOrganizationMemberModal
          onAdd={handleAddMember}
        />
      </div>

      {/* update members */}
      {editingMember && (
        <div className="mb-8">
          <EditOrganizationMemberModal
            member={editingMember}
            onUpdate={handleUpdateMember}
          />
        </div>
      )}

      {/* GET members */}
      {loading ? (
        <p>Loading...</p>
      ) : members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <div className="grid gap-4">
          {members.map((member) => (
            <OrganizationMemberCard
              key={member.id}
              member={member}
              onEdit={setEditingMember}
              onDelete={handleDeleteMember}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
}