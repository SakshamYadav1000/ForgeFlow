from sqlalchemy.orm import Session

from app.models.issue import Issue


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

        return query.all()

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