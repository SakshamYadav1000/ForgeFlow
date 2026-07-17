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
def get_project_issues(
    project_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return IssueService(db).get_project_issues(
        project_id,
        current_user,
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