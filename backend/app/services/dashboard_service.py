from sqlalchemy.orm import Session

from app.repositories.project_repository import ProjectRepository
from app.repositories.issue_repository import IssueRepository
from app.repositories.activity_log_repository import ActivityLogRepository
from app.repositories.notification_repository import NotificationRepository
from app.repositories.organization_repository import OrganizationRepository

from app.models.issue import (
    IssueStatus,
    IssuePriority,
)


class DashboardService:


    def __init__(
        self,
        db: Session,
    ):

        self.db = db

        self.project_repo = ProjectRepository(db)

        self.issue_repo = IssueRepository(db)

        self.activity_repo = ActivityLogRepository(db)

        self.notification_repo = NotificationRepository(db)

        self.organization_repo = OrganizationRepository(db)



    def get_dashboard(
        self,
        current_user,
    ):


        # Organizations user belongs to

        organizations = (
            self.organization_repo
            .get_user_organizations(
                current_user.id
            )
        )



        # Projects user belongs to

        projects = (
            self.project_repo
            .get_user_projects(
                current_user.id
            )
        )



        project_ids = [
            project.id
            for project in projects
        ]



        # Issues from user's projects

        issues = (
            self.issue_repo
            .get_by_projects(
                project_ids
            )
        )



        # Assigned issues

        assigned_issues = [
            issue
            for issue in issues
            if issue.assignee_id == current_user.id
        ]



        # Reported issues

        reported_issues = [
            issue
            for issue in issues
            if issue.reporter_id == current_user.id
        ]



        # Issue status distribution

        issue_status = {

            "todo": 0,

            "in_progress": 0,

            "done": 0,

        }



        for issue in assigned_issues:


            if issue.status == IssueStatus.TODO:

                issue_status["todo"] += 1


            elif issue.status == IssueStatus.IN_PROGRESS:

                issue_status["in_progress"] += 1


            elif issue.status == IssueStatus.DONE:

                issue_status["done"] += 1




        # Priority distribution

        priority = {

            "high": 0,

            "medium": 0,

            "low": 0,

        }



        for issue in assigned_issues:


            if issue.priority == IssuePriority.HIGH:

                priority["high"] += 1


            elif issue.priority == IssuePriority.MEDIUM:

                priority["medium"] += 1


            elif issue.priority == IssuePriority.LOW:

                priority["low"] += 1




        # Recent user activity

        recent_activity = (
            self.activity_repo
            .get_recent_user_activity(
                current_user.id,
                limit=5,
            )
        )



        # Recent notifications

        notifications = (
            self.notification_repo
            .get_recent_notifications(
                current_user.id,
                limit=5,
            )
        )



        return {


            "organizations": len(organizations),


            "projects": len(projects),


            "assigned_issues": len(assigned_issues),


            "reported_issues": len(reported_issues),


            "issue_status": issue_status,


            "priority": priority,


            "recent_activity": recent_activity,


            "notifications": notifications,


        }