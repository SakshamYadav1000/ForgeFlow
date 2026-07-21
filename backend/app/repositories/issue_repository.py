from sqlalchemy.orm import Session

from sqlalchemy import func

from datetime import datetime

from app.models.issue import (
    Issue,
    IssuePriority,
    IssueStatus,
)

class IssueRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        issue: Issue,
    ) -> Issue:
        self.db.add(issue)
        self.db.commit()
        self.db.refresh(issue)
        return issue

    def get_by_id(
        self,
        issue_id: int,
    ) -> Issue | None:
        return (
            self.db.query(Issue)
            .filter(Issue.id == issue_id)
            .first()
        )

    def get_by_project(
        self,
        project_id: int,
    ):
        return (
            self.db.query(Issue)
            .filter(
                Issue.project_id == project_id
            )
            .all()
        )

    def search(
        self,
        project_id: int,
        title: str | None = None,
        status=None,
        priority=None,
        assignee_id: int | None = None,
        milestone_id: int | None = None,
        reporter_id: int | None = None,
        page: int = 1,
        limit: int = 10,
        sort_by: str = "created_at",
        order: str = "desc",
    ):
        query = self.db.query(Issue).filter(
            Issue.project_id == project_id
        )

        if title:
            query = query.filter(
                Issue.title.ilike(f"%{title}%")
            )

        if status:
            query = query.filter(
                Issue.status == status
            )

        if priority:
            query = query.filter(
                Issue.priority == priority
            )

        if assignee_id:
            query = query.filter(
                Issue.assignee_id == assignee_id
            )

        if milestone_id:
            query = query.filter(
                Issue.milestone_id == milestone_id
            )

        if reporter_id:
            query = query.filter(
                Issue.reporter_id == reporter_id
            )

        allowed_fields = {
            "created_at": Issue.created_at,
            "updated_at": Issue.updated_at,
            "title": Issue.title,
            "priority": Issue.priority,
            "status": Issue.status,
        }

        sort_column = allowed_fields.get(
            sort_by,
            Issue.created_at,
        )

        if order.lower() == "asc":
            query = query.order_by(sort_column.asc())
        
        else:
            query = query.order_by(sort_column.desc())

        offset = (page - 1) * limit

        return (
            query.offset(offset)
            .limit(limit)
            .all()
        )

    def update(
        self,
        issue: Issue,
    ) -> Issue:
        self.db.commit()
        self.db.refresh(issue)
        return issue

    def delete(
        self,
        issue: Issue,
    ):
        self.db.delete(issue)
        self.db.commit()

#Dashboard
    def count_by_project(
        self,
        project_id: int,
    ):
        return (
            self.db.query(func.count(Issue.id))
            .filter(Issue.project_id == project_id)
            .scalar()
        )


    def count_by_status(
        self,
        project_id: int,
        status: IssueStatus,
    ):
        return (
            self.db.query(func.count(Issue.id))
            .filter(
                Issue.project_id == project_id,
                Issue.status == status,
            )
            .scalar()
        )


    def count_by_priority(
        self,
        project_id: int,
        priority: IssuePriority,
    ):
        return (
            self.db.query(func.count(Issue.id))
            .filter(
                Issue.project_id == project_id,
                Issue.priority == priority,
            )
            .scalar()
        )


    def count_overdue(
        self,
        project_id: int,
    ):
        return 0