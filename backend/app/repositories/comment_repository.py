from sqlalchemy.orm import Session

from app.models.comment import Comment


class CommentRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        comment: Comment,
    ) -> Comment:
        self.db.add(comment)
        self.db.commit()
        self.db.refresh(comment)
        return comment

    def get_by_id(
        self,
        comment_id: int,
    ) -> Comment | None:
        return (
            self.db.query(Comment)
            .filter(Comment.id == comment_id)
            .first()
        )

    def get_issue_comments(
        self,
        issue_id: int,
    ) -> list[Comment]:
        return (
            self.db.query(Comment)
            .filter(Comment.issue_id == issue_id)
            .all()
        )

    def delete(
        self,
        comment: Comment,
    ):
        self.db.delete(comment)
        self.db.commit()

    def save(
        self,
        comment: Comment,
    ) -> Comment:
        self.db.commit()
        self.db.refresh(comment)
        return comment