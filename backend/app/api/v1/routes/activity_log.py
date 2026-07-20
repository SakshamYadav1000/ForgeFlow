from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.activity_log import ActivityLogResponse
from app.services.activity_log_service import (
    ActivityLogService,
)

router = APIRouter(
    prefix="/activity",
    tags=["Activity Logs"],
)


@router.get(
    "/projects/{project_id}",
    response_model=list[ActivityLogResponse],
)
def get_project_activity(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ActivityLogService(
        db
    ).get_project_activities(
        project_id,
        current_user,
    )


@router.get(
    "/issues/{issue_id}",
    response_model=list[ActivityLogResponse],
)
def get_issue_activity(
    issue_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ActivityLogService(
        db
    ).get_issue_activities(
        issue_id,
        current_user,
    )


@router.get(
    "/me",
    response_model=list[ActivityLogResponse],
)
def get_my_activity(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ActivityLogService(
        db
    ).get_user_activities(
        current_user
    )