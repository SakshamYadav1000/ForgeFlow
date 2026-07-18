from fastapi import HTTPException, status

from app.models.label import Label
from app.repositories.issue_repository import IssueRepository
from app.repositories.label_repository import LabelRepository
from app.repositories.organization_member_repository import (
    OrganizationMemberRepository,
)
from app.repositories.organization_repository import OrganizationRepository


class LabelService:
    def __init__(self, db):
        self.label_repository = LabelRepository(db)
        self.organization_repository = OrganizationRepository(db)
        self.organization_member_repository = (
            OrganizationMemberRepository(db)
        )
        self.issue_repository = IssueRepository(db)

    # ------------------------
    # Label CRUD
    # ------------------------

    def create_label(
        self,
        organization_id,
        label_data,
        current_user,
    ):
        organization = (
            self.organization_repository.get_user_organization(
                organization_id,
                current_user.id,
            )
        )

        if not organization:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Organization not found",
            )

        member = (
            self.organization_member_repository.get_member(
                organization_id,
                current_user.id,
            )
        )

        if not member:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You are not a member of this organization",
            )

        label = Label(
            organization_id=organization_id,
            name=label_data.name,
            color=label_data.color,
        )

        return self.label_repository.create_label(label)

    def get_labels(
        self,
        organization_id,
        current_user,
    ):
        member = (
            self.organization_member_repository.get_member(
                organization_id,
                current_user.id,
            )
        )

        if not member:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied",
            )

        return self.label_repository.get_labels_by_organization(
            organization_id
        )

    def get_label(
        self,
        label_id,
    ):
        label = self.label_repository.get_label(label_id)

        if not label:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Label not found",
            )

        return label

    def update_label(
        self,
        label_id,
        label_data,
        current_user,
    ):
        label = self.get_label(label_id)

        member = (
            self.organization_member_repository.get_member(
                label.organization_id,
                current_user.id,
            )
        )

        if not member:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied",
            )

        update_data = label_data.model_dump(exclude_unset=True)

        for field, value in update_data.items():
            setattr(label, field, value)

        return self.label_repository.update_label(label)

    def delete_label(
        self,
        label_id,
        current_user,
    ):
        label = self.get_label(label_id)

        member = (
            self.organization_member_repository.get_member(
                label.organization_id,
                current_user.id,
            )
        )

        if not member:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied",
            )

        self.label_repository.delete_label(label)

    # ------------------------
    # Issue Labels
    # ------------------------

    def attach_label_to_issue(
        self,
        issue_id,
        label_id,
        current_user,
    ):
        issue = self.issue_repository.get_by_id(issue_id)

        if not issue:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Issue not found",
            )

        label = self.get_label(label_id)

        member = (
            self.organization_member_repository.get_member(
                label.organization_id,
                current_user.id,
            )
        )

        if not member:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied",
            )

        if self.label_repository.issue_has_label(
            issue_id,
            label_id,
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Label already attached",
            )

        return self.label_repository.attach_label_to_issue(
            issue_id,
            label_id,
        )

    def remove_label_from_issue(
        self,
        issue_id,
        label_id,
        current_user,
    ):
        issue = self.issue_repository.get_by_id(issue_id)

        if not issue:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Issue not found",
            )

        label = self.get_label(label_id)

        member = (
            self.organization_member_repository.get_member(
                label.organization_id,
                current_user.id,
            )
        )

        if not member:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied",
            )

        self.label_repository.remove_label_from_issue(
            issue_id,
            label_id,
        )

    def get_issue_labels(
        self,
        issue_id,
    ):
        issue = self.issue_repository.get_by_id(issue_id)

        if not issue:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Issue not found",
            )

        return self.label_repository.get_issue_labels(issue_id)