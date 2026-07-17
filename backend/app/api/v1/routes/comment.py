from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies.auth import get_current_user
from app.schemas.comment import (
    CommentCreate,
    CommentResponse,
    CommentUpdate,
)
from app.services.comment_service import CommentService

router = APIRouter(
    tags=["Comments"],
)


@router.post(
    "/issues/{issue_id}/comments",
    response_model=CommentResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_comment(
    issue_id: int,
    comment: CommentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return CommentService(db).create_comment(
        issue_id,
        comment,
        current_user,
    )


@router.get(
    "/issues/{issue_id}/comments",
    response_model=list[CommentResponse],
)
def get_issue_comments(
    issue_id: int,
    db: Session = Depends(get_db),
):
    return CommentService(db).get_issue_comments(
        issue_id,
    )


@router.get(
    "/comments/{comment_id}",
    response_model=CommentResponse,
)
def get_comment(
    comment_id: int,
    db: Session = Depends(get_db),
):
    return CommentService(db).get_comment(
        comment_id,
    )


@router.patch(
    "/comments/{comment_id}",
    response_model=CommentResponse,
)
def update_comment(
    comment_id: int,
    comment: CommentUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return CommentService(db).update_comment(
        comment_id,
        comment,
        current_user,
    )


@router.delete(
    "/comments/{comment_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    CommentService(db).delete_comment(
        comment_id,
        current_user,
    )