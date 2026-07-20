from sqlalchemy.orm import Session

from app.core.exceptions import (
    OrganizationMemberNotFoundException,
    ProjectNotFoundException,
    IssueNotFoundException,
)
from app.models.activity_log import (
    ActivityLog,
    ActivityType,
)
from app.models.user import User
from app.repositories.activity_log_repository import (
    ActivityLogRepository,
)
from app.repositories.organization_repository import (
    OrganizationRepository,
)
from app.repositories.project_repository import (
    ProjectRepository,
)
from app.repositories.issue_repository import (
    IssueRepository
)

class ActivityLogService:
    def __init__(self, db: Session):
        self.db = db

        self.activity_repository = (
            ActivityLogRepository(db)
        )
        self.project_repository = (
            ProjectRepository(db)
        )
        self.organization_repository = (
            OrganizationRepository(db)
        )
        self.issue_repository = (
            IssueRepository(db)
        )
        
    def create_activity(
        self,
        user_id: int,
        project_id: int,
        activity_type: ActivityType,
        description: str,
        issue_id: int | None = None,
    ):
        activity = ActivityLog(
            user_id=user_id,
            project_id=project_id,
            issue_id=issue_id,
            activity_type=activity_type,
            description=description,
        )

        return self.activity_repository.create(
            activity
        )

    def get_project_activities(
        self,
        project_id: int,
        current_user: User,
    ):
        project = self.project_repository.get_by_id(
            project_id
        )

        if project is None:
            raise ProjectNotFoundException()

        membership = (
            self.organization_repository.get_user_organization(
                project.organization_id,
                current_user.id,
            )
        )

        if membership is None:
            raise OrganizationMemberNotFoundException()

        return (
            self.activity_repository.get_project_activities(
                project_id
            )
        )

    def get_user_activities(
        self,
        current_user: User,
    ):
        return (
            self.activity_repository.get_user_activities(
                current_user.id
            )
        )

    def get_issue_activities(
        self,
        issue_id: int,
        current_user: User,
    ):
        issue = self.issue_repository.get_by_id(
            issue_id
        )

        if issue is None:
            raise IssueNotFoundException()

        project = self.project_repository.get_by_id(
            issue.project_id
        )

        if project is None:
            raise ProjectNotFoundException()

        membership = (
            self.organization_repository.get_user_organization(
            project.organization_id,
            current_user.id,
            )
        )

        if membership is None:
            raise OrganizationMemberNotFoundException()

        return (
            self.activity_repository.get_issue_activities(
                issue_id
            )
        )