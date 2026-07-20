from sqlalchemy.orm import Session

from app.core.exceptions import (
    BadRequestException,
    IssueDependencyAlreadyExistsException,
    IssueDependencyNotFoundException,
    IssueNotFoundException,
    OrganizationMemberNotFoundException,
    CrossProjectDependencyException
)
from app.models.issue_dependency import IssueDependency
from app.models.user import User
from app.repositories.issue_dependency_repository import (
    IssueDependencyRepository,
)
from app.repositories.issue_repository import IssueRepository
from app.repositories.organization_repository import (
    OrganizationRepository,
)
from app.repositories.project_repository import ProjectRepository
from app.schemas.issue_dependency import (
    IssueDependencyCreate,
)


class IssueDependencyService:
    def __init__(self, db: Session):
        self.issue_repository = IssueRepository(db)
        self.project_repository = ProjectRepository(db)
        self.organization_repository = (
            OrganizationRepository(db)
        )
        self.dependency_repository = (
            IssueDependencyRepository(db)
        )

    def create_dependency(
        self,
        source_issue_id: int,
        dependency_data: IssueDependencyCreate,
        current_user: User,
    ):
        source_issue = self.issue_repository.get_by_id(
            source_issue_id
        )

        if source_issue is None:
            raise IssueNotFoundException()

        target_issue = self.issue_repository.get_by_id(
            dependency_data.target_issue_id
        )

        if target_issue is None:
            raise IssueNotFoundException()

        project = self.project_repository.get_by_id(
            source_issue.project_id
        )

        organization = (
            self.organization_repository.get_user_organization(
                project.organization_id,
                current_user.id,
            )
        )

        if organization is None:
            raise OrganizationMemberNotFoundException()

        if (
            source_issue.project_id
            != target_issue.project_id
        ):
            raise CrossProjectDependencyException()

        if source_issue.id == target_issue.id:
            raise BadRequestException(
                detail="An issue cannot depend on itself"
            )

        existing = (
            self.dependency_repository.get_between_issues(
                source_issue.id,
                target_issue.id,
                dependency_data.dependency_type,
            )
        )

        if existing:
            raise IssueDependencyAlreadyExistsException()

        dependency = IssueDependency(
            source_issue_id=source_issue.id,
            target_issue_id=target_issue.id,
            dependency_type=dependency_data.dependency_type,
        )

        return self.dependency_repository.create(
            dependency
        )

    def get_dependencies(
        self,
        issue_id: int,
    ):
        issue = self.issue_repository.get_by_id(
            issue_id
        )

        if issue is None:
            raise IssueNotFoundException()

        return (
            self.dependency_repository.get_issue_dependencies(
                issue_id
            )
        )

    def delete_dependency(
        self,
        dependency_id: int,
        current_user: User,
    ):
        dependency = (
            self.dependency_repository.get_by_id(
                dependency_id
            )
        )

        if dependency is None:
            raise IssueDependencyNotFoundException()

        issue = self.issue_repository.get_by_id(
            dependency.source_issue_id
        )

        project = self.project_repository.get_by_id(
            issue.project_id
        )

        organization = (
            self.organization_repository.get_user_organization(
                project.organization_id,
                current_user.id,
            )
        )

        if organization is None:
            raise OrganizationMemberNotFoundException()

        self.dependency_repository.delete(
            dependency
        )