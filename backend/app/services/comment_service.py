from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.comment import Comment
from app.models.user import User
from app.repositories.comment_repository import CommentRepository
from app.repositories.issue_repository import IssueRepository
from app.schemas.comment import (
    CommentCreate,
    CommentUpdate,
)
from app.services.activity_log_service import ActivityLogService
from app.models.activity_log import ActivityType

class CommentService:

    def __init__(self, db: Session):
        self.db = db

        self.comment_repository = CommentRepository(db)
        self.issue_repository = IssueRepository(db)

    def create_comment(
        self,
        issue_id: int,
        comment_data: CommentCreate,
        current_user: User,
    ):
        issue = self.issue_repository.get_by_id(issue_id)

        if not issue:
            raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
            )

        comment = Comment(
            issue_id=issue_id,
            user_id=current_user.id,
            content=comment_data.content,
        )

        comment = self.comment_repository.create(comment)

        ActivityLogService(self.db).create_activity(
            user_id=current_user.id,
            project_id=issue.project_id,
            issue_id=issue.id,
            activity_type=ActivityType.COMMENT_CREATED,
            description="Added a comment",
        )

        return comment

    def get_issue_comments(
        self,
        issue_id: int,
    ):
        issue = self.issue_repository.get_by_id(issue_id)

        if not issue:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Issue not found",
            )

        return self.comment_repository.get_issue_comments(issue_id)

    def get_comment(
        self,
        comment_id: int,
    ):
        comment = self.comment_repository.get_by_id(comment_id)

        if not comment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Comment not found",
            )

        return comment

    def update_comment(
        self,
        comment_id: int,
        comment_data: CommentUpdate,
        current_user: User,
    ):
        comment = self.comment_repository.get_by_id(comment_id)

        if not comment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Comment not found",
            )

        if comment.user_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only edit your own comments",
            )

        comment.content = comment_data.content

        return self.comment_repository.save(comment)

    def delete_comment(
        self,
        comment_id: int,
        current_user: User,
    ):
        comment = self.comment_repository.get_by_id(comment_id)

        if not comment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Comment not found",
            )

        if comment.user_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only delete your own comments",
            )
        issue = self.issue_repository.get_by_id(
            comment.issue_id
        )

        ActivityLogService(self.db).create_activity(
            user_id=current_user.id,
            project_id=issue.project_id,
            issue_id=issue.id,
            activity_type=ActivityType.COMMENT_DELETED,
            description="Deleted a comment",
        )
        self.comment_repository.delete(comment)