from sqlalchemy.orm import Session

from app.models.issue import (
    IssuePriority,
    IssueStatus,
)
from app.models.user import User
from app.repositories.activity_log_repository import (
    ActivityLogRepository,
)
from app.repositories.issue_repository import (
    IssueRepository,
)
from app.repositories.milestone_repository import (
    MilestoneRepository,
)
from app.repositories.organization_member_repository import (
    OrganizationMemberRepository,
)
from app.repositories.project_repository import (
    ProjectRepository,
)
from app.schemas.dashboard import DashboardResponse


class DashboardService:
    def __init__(
        self,
        db: Session,
    ):
        self.project_repository = ProjectRepository(db)

        self.organization_member_repository = (
            OrganizationMemberRepository(db)
        )

        self.issue_repository = (
            IssueRepository(db)
        )

        self.milestone_repository = (
            MilestoneRepository(db)
        )

        self.activity_repository = (
            ActivityLogRepository(db)
        )

    def get_dashboard(
        self,
        project_id: int,
        current_user: User,
    ):
        project = (
            self.project_repository.get_by_id(
                project_id
            )
        )

        if project is None:
            raise ValueError("Project not found")

        member = (
            self.organization_member_repository.get_member(
                project.organization_id,
                current_user.id,
            )
        )

        if member is None:
            raise ValueError("Access denied")

        return DashboardResponse(
            total_issues=self.issue_repository.count_by_project(
                project_id
            ),

            todo=self.issue_repository.count_by_status(
                project_id,
                IssueStatus.TODO,
            ),

            in_progress=self.issue_repository.count_by_status(
                project_id,
                IssueStatus.IN_PROGRESS,
            ),

            done=self.issue_repository.count_by_status(
                project_id,
                IssueStatus.DONE,
            ),

            low_priority=self.issue_repository.count_by_priority(
                project_id,
                IssuePriority.LOW,
            ),

            medium_priority=self.issue_repository.count_by_priority(
                project_id,
                IssuePriority.MEDIUM,
            ),

            high_priority=self.issue_repository.count_by_priority(
                project_id,
                IssuePriority.HIGH,
            ),

            overdue_issues=self.issue_repository.count_overdue(
                project_id
            ),

            total_milestones=self.milestone_repository.count_by_project(
                project_id
            ),

            completed_milestones=self.milestone_repository.count_completed(
                project_id
            ),

            recent_activity=self.activity_repository.count_project_activity(
                project_id
            ),
        )