from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.auth import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.issue_dependency import (
    IssueDependencyCreate,
    IssueDependencyResponse,
)
from app.services.issue_dependency_service import (
    IssueDependencyService,
)

router = APIRouter(
    prefix="/issues",
    tags=["Issue Dependencies"],
)


@router.post(
    "/{issue_id}/dependencies",
    response_model=IssueDependencyResponse,
)
def create_dependency(
    issue_id: int,
    dependency: IssueDependencyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return IssueDependencyService(
        db
    ).create_dependency(
        issue_id,
        dependency,
        current_user,
    )


@router.get(
    "/{issue_id}/dependencies",
    response_model=list[IssueDependencyResponse],
)
def get_dependencies(
    issue_id: int,
    db: Session = Depends(get_db),
):
    return IssueDependencyService(
        db
    ).get_dependencies(
        issue_id
    )


@router.delete(
    "/{issue_id}/dependencies/{dependency_id}",
)
def delete_dependency(
    issue_id: int,
    dependency_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    IssueDependencyService(
        db
    ).delete_dependency(
        dependency_id,
        current_user,
    )

    return {}