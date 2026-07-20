from sqlalchemy.orm import Session

from app.core.exceptions import (
    IssueNotFoundException,
    MilestoneNotFoundException,
    MilestoneProjectMismatchException,
    OrganizationMemberNotFoundException,
    ProjectNotFoundException,
    UserNotFoundException,
)
from app.models.issue import Issue
from app.models.user import User
from app.repositories.issue_repository import IssueRepository
from app.repositories.milestone_repository import MilestoneRepository
from app.repositories.organization_repository import (
    OrganizationRepository,
)
from app.repositories.project_repository import ProjectRepository
from app.repositories.user_repository import UserRepository
from app.schemas.issue import (
    IssueCreate,
    IssueUpdate,
)
from app.models.notification import NotificationType
from app.services.notification_service import NotificationService


class IssueService:
    def __init__(self, db: Session):
        self.db = db

        self.project_repository = ProjectRepository(db)
        self.issue_repository = IssueRepository(db)
        self.organization_repository = OrganizationRepository(db)
        self.user_repository = UserRepository(db)
        self.milestone_repository = MilestoneRepository(db)

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
                raise UserNotFoundException()

        if issue_data.milestone_id is not None:
            milestone = self.milestone_repository.get_by_id(
                issue_data.milestone_id
            )

            if milestone is None:
                raise MilestoneNotFoundException()

            if milestone.project_id != project.id:
                raise MilestoneProjectMismatchException()

        issue = Issue(
            project_id=project.id,
            milestone_id=issue_data.milestone_id,
            title=issue_data.title,
            description=issue_data.description,
            priority=issue_data.priority,
            assignee_id=issue_data.assignee_id,
            reporter_id=current_user.id,
        )

        issue = self.issue_repository.create(issue)

        if issue.assignee_id is not None:
            NotificationService(self.db).create_notification(
                user_id=issue.assignee_id,
                title="Issue Assigned",
                message=f"You have been assigned '{issue.title}'",
                notification_type=NotificationType.ISSUE_ASSIGNED,
            )

        return issue

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
                raise UserNotFoundException()

        if "milestone_id" in issue_data.model_fields_set:

            if issue_data.milestone_id is not None:
                milestone = (
                    self.milestone_repository.get_by_id(
                        issue_data.milestone_id
                    )
                )

                if milestone is None:
                    raise MilestoneNotFoundException()

                if milestone.project_id != issue.project_id:
                    raise (
                        MilestoneProjectMismatchException()
                    )

            issue.milestone_id = (
                issue_data.milestone_id
            )

        if issue_data.title is not None:
            issue.title = issue_data.title

        if issue_data.description is not None:
            issue.description = issue_data.description

        if issue_data.priority is not None:
            issue.priority = issue_data.priority

        if issue_data.status is not None:
            issue.status = issue_data.status

        old_assignee = issue.assignee_id

        if issue_data.assignee_id is not None:
            issue.assignee_id = issue_data.assignee_id

        issue = self.issue_repository.update(issue)

        if (
            issue.assignee_id is not None
            and issue.assignee_id != old_assignee
        ):
            NotificationService(self.db).create_notification(
                user_id=issue.assignee_id,
                title="Issue Assigned",
                message=f"You have been assigned '{issue.title}'",
                notification_type=NotificationType.ISSUE_ASSIGNED,
            )

        return issue

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

        self.issue_repository.delete(issue)