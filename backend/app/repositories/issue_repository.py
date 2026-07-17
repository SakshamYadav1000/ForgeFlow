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