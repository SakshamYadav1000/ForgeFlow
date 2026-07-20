from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies.auth import get_current_user
from app.schemas.issue import (
    IssueCreate,
    IssueResponse,
    IssueUpdate,
)
from app.services.issue_service import IssueService

from app.models.user import User
from app.models.issue import (
    IssueStatus, IssuePriority
)
router = APIRouter(
    tags=["Issues"],
)


@router.post(
    "/projects/{project_id}/issues",
    response_model=IssueResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_issue(
    project_id: int,
    issue: IssueCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return IssueService(db).create_issue(
        project_id,
        issue,
        current_user,
    )


@router.get(
    "/projects/{project_id}/issues",
    response_model=list[IssueResponse],
)
@router.get(
    "/projects/{project_id}/issues",
    response_model=list[IssueResponse],
)
def get_project_issues(
    project_id: int,
    title: str | None = None,
    status: IssueStatus | None = None,
    priority: IssuePriority | None = None,
    assignee_id: int | None = None,
    milestone_id: int | None = None,
    reporter_id: int | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return IssueService(db).get_project_issues(
        project_id=project_id,
        current_user=current_user,
        title=title,
        status=status,
        priority=priority,
        assignee_id=assignee_id,
        milestone_id=milestone_id,
        reporter_id=reporter_id,
    )


@router.get(
    "/issues/{issue_id}",
    response_model=IssueResponse,
)
def get_issue(
    issue_id: int,
    db: Session = Depends(get_db),
):
    return IssueService(db).get_issue(
        issue_id,
    )


@router.patch(
    "/issues/{issue_id}",
    response_model=IssueResponse,
)
def update_issue(
    issue_id: int,
    issue: IssueUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return IssueService(db).update_issue(
        issue_id,
        issue,
        current_user,
    )


@router.delete(
    "/issues/{issue_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_issue(
    issue_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    IssueService(db).delete_issue(
        issue_id,
        current_user,
    )