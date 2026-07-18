from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies.auth import get_current_user
from app.schemas.milestone import (
    MilestoneCreate,
    MilestoneResponse,
    MilestoneUpdate,
)
from app.services.milestone_service import MilestoneService

router = APIRouter(
    tags=["Milestones"],
)


@router.post(
    "/projects/{project_id}/milestones",
    response_model=MilestoneResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_milestone(
    project_id: int,
    milestone: MilestoneCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return MilestoneService(db).create_milestone(
        project_id,
        milestone,
        current_user,
    )


@router.get(
    "/projects/{project_id}/milestones",
    response_model=list[MilestoneResponse],
)
def get_project_milestones(
    project_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return MilestoneService(db).get_project_milestones(
        project_id,
        current_user,
    )


@router.get(
    "/milestones/{milestone_id}",
    response_model=MilestoneResponse,
)
def get_milestone(
    milestone_id: int,
    db: Session = Depends(get_db),
):
    return MilestoneService(db).get_milestone(
        milestone_id,
    )


@router.patch(
    "/milestones/{milestone_id}",
    response_model=MilestoneResponse,
)
def update_milestone(
    milestone_id: int,
    milestone: MilestoneUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return MilestoneService(db).update_milestone(
        milestone_id,
        milestone,
        current_user,
    )


@router.delete(
    "/milestones/{milestone_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_milestone(
    milestone_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    MilestoneService(db).delete_milestone(
        milestone_id,
        current_user,
    )