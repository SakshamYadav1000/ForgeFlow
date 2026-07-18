from fastapi import HTTPException, status

from app.models.milestone import Milestone
from app.repositories.milestone_repository import MilestoneRepository
from app.repositories.organization_member_repository import (
    OrganizationMemberRepository,
)
from app.repositories.project_repository import ProjectRepository


class MilestoneService:
    def __init__(self, db):
        self.milestone_repository = MilestoneRepository(db)
        self.project_repository = ProjectRepository(db)
        self.organization_member_repository = (
            OrganizationMemberRepository(db)
        )

    # ------------------------
    # Create
    # ------------------------

    def create_milestone(
        self,
        project_id,
        milestone_data,
        current_user,
    ):
        project = self.project_repository.get_by_id(project_id)

        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found",
            )

        member = (
            self.organization_member_repository.get_member(
                project.organization_id,
                current_user.id,
            )
        )

        if not member:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied",
            )

        milestone = Milestone(
            project_id=project_id,
            title=milestone_data.title,
            description=milestone_data.description,
            due_date=milestone_data.due_date,
        )

        return self.milestone_repository.create(
            milestone
        )

    # ------------------------
    # Read
    # ------------------------

    def get_project_milestones(
        self,
        project_id,
        current_user,
    ):
        project = self.project_repository.get_by_id(project_id)

        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found",
            )

        member = (
            self.organization_member_repository.get_member(
                project.organization_id,
                current_user.id,
            )
        )

        if not member:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied",
            )

        return self.milestone_repository.get_by_project(
            project_id
        )

    def get_milestone(
        self,
        milestone_id,
    ):
        milestone = self.milestone_repository.get_by_id(
            milestone_id
        )

        if not milestone:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Milestone not found",
            )

        return milestone

    # ------------------------
    # Update
    # ------------------------

    def update_milestone(
        self,
        milestone_id,
        milestone_data,
        current_user,
    ):
        milestone = self.get_milestone(
            milestone_id
        )

        project = self.project_repository.get_by_id(
            milestone.project_id
        )

        member = (
            self.organization_member_repository.get_member(
                project.organization_id,
                current_user.id,
            )
        )

        if not member:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied",
            )

        update_data = milestone_data.model_dump(
            exclude_unset=True
        )

        for field, value in update_data.items():
            setattr(
                milestone,
                field,
                value,
            )

        return self.milestone_repository.update(
            milestone
        )

    # ------------------------
    # Delete
    # ------------------------

    def delete_milestone(
        self,
        milestone_id,
        current_user,
    ):
        milestone = self.get_milestone(
            milestone_id
        )

        project = self.project_repository.get_by_id(
            milestone.project_id
        )

        member = (
            self.organization_member_repository.get_member(
                project.organization_id,
                current_user.id,
            )
        )

        if not member:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied",
            )

        self.milestone_repository.delete(
            milestone
        )