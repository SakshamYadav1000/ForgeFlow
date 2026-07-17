from sqlalchemy.orm import Session

from app.core.exceptions import (
    IssueNotFoundException,
    OrganizationMemberNotFoundException,
    ProjectNotFoundException,
)
from app.models.issue import Issue
from app.models.user import User
from app.repositories.issue_repository import IssueRepository
from app.repositories.project_repository import ProjectRepository
from app.repositories.organization_repository import OrganizationRepository
from app.repositories.user_repository import UserRepository
from app.schemas.issue import (
    IssueCreate,
    IssueUpdate,
)


class IssueService:
    def __init__(self, db: Session):
        self.project_repository = ProjectRepository(db)
        self.issue_repository = IssueRepository(db)
        self.organization_repository = OrganizationRepository(db)
        self.user_repository = UserRepository(db)

    def create_issue(
        self,
        project_id: int,
        issue_data: IssueCreate,
        current_user: User,
    ):
        project = self.project_repository.get_by_id(project_id)

        if project is None:
            raise ProjectNotFoundException()

        organization = (
            self.organization_repository.get_user_organization(
                project.organization_id,
                current_user.id,
            )
        )

        if organization is None:
            raise OrganizationMemberNotFoundException()

        if issue_data.assignee_id is not None:
            assignee = self.user_repository.get_by_id(
                issue_data.assignee_id
            )

            if assignee is None:
                raise IssueNotFoundException()

        issue = Issue(
            project_id=project.id,
            title=issue_data.title,
            description=issue_data.description,
            priority=issue_data.priority,
            assignee_id=issue_data.assignee_id,
            reporter_id=current_user.id,
        )

        return self.issue_repository.create(issue)

    def get_project_issues(
        self,
        project_id: int,
        current_user: User,
    ):
        project = self.project_repository.get_by_id(project_id)

        if project is None:
            raise ProjectNotFoundException()

        organization = (
            self.organization_repository.get_user_organization(
                project.organization_id,
                current_user.id,
            )
        )

        if organization is None:
            raise OrganizationMemberNotFoundException()

        return self.issue_repository.get_by_project(
            project_id
        )

    def get_issue(
        self,
        issue_id: int,
    ):
        issue = self.issue_repository.get_by_id(issue_id)

        if issue is None:
            raise IssueNotFoundException()

        return issue

    def update_issue(
        self,
        issue_id: int,
        issue_data: IssueUpdate,
        current_user: User,
    ):
        issue = self.issue_repository.get_by_id(issue_id)

        if issue is None:
            raise IssueNotFoundException()

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

        if issue_data.title is not None:
            issue.title = issue_data.title

        if issue_data.description is not None:
            issue.description = issue_data.description

        if issue_data.priority is not None:
            issue.priority = issue_data.priority

        if issue_data.status is not None:
            issue.status = issue_data.status

        if issue_data.assignee_id is not None:
            issue.assignee_id = issue_data.assignee_id

        return self.issue_repository.update(issue)

    def delete_issue(
        self,
        issue_id: int,
        current_user: User,
    ):
        issue = self.issue_repository.get_by_id(issue_id)

        if issue is None:
            raise IssueNotFoundException()

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

        self.issue_repository.delete(issue)