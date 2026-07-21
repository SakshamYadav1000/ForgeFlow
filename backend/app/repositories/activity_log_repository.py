from sqlalchemy.orm import Session

from sqlalchemy import func

from app.models.activity_log import ActivityLog


class ActivityLogRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        activity: ActivityLog,
    ) -> ActivityLog:
        self.db.add(activity)
        self.db.commit()
        self.db.refresh(activity)
        return activity

    def get_project_activities(
        self,
        project_id: int,
    ):
        return (
            self.db.query(ActivityLog)
            .filter(
                ActivityLog.project_id == project_id
            )
            .order_by(
                ActivityLog.created_at.desc()
            )
            .all()
        )

    def get_issue_activities(
        self,
        issue_id: int,
    ):
        return (
            self.db.query(ActivityLog)
            .filter(
                ActivityLog.issue_id == issue_id
            )
            .order_by(
                ActivityLog.created_at.desc()
            )
            .all()
        )

    def get_user_activities(
        self,
        user_id: int,
    ):
        return (
            self.db.query(ActivityLog)
            .filter(
                ActivityLog.user_id == user_id
            )
            .order_by(
                ActivityLog.created_at.desc()
            )
            .all()
        )
    
#Dashboard
    def count_project_activity(
        self,
        project_id: int,
    ):
        return (
            self.db.query(func.count(ActivityLog.id))
            .filter(
                ActivityLog.project_id == project_id
            )
            .scalar()
        )