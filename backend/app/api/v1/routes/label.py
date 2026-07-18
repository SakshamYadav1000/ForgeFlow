from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies.auth import get_current_user
from app.schemas.label import (
    LabelCreate,
    LabelResponse,
    LabelUpdate,
)
from app.services.label_service import LabelService

router = APIRouter(
    tags=["Labels"],
)

# ------------------------
# Label CRUD
# ------------------------

@router.post(
    "/organizations/{organization_id}/labels",
    response_model=LabelResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_label(
    organization_id: int,
    label: LabelCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return LabelService(db).create_label(
        organization_id,
        label,
        current_user,
    )


@router.get(
    "/organizations/{organization_id}/labels",
    response_model=list[LabelResponse],
)
def get_labels(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return LabelService(db).get_labels(
        organization_id,
        current_user,
    )


@router.get(
    "/labels/{label_id}",
    response_model=LabelResponse,
)
def get_label(
    label_id: int,
    db: Session = Depends(get_db),
):
    return LabelService(db).get_label(label_id)


@router.patch(
    "/labels/{label_id}",
    response_model=LabelResponse,
)
def update_label(
    label_id: int,
    label: LabelUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return LabelService(db).update_label(
        label_id,
        label,
        current_user,
    )


@router.delete(
    "/labels/{label_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_label(
    label_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    LabelService(db).delete_label(
        label_id,
        current_user,
    )

# ------------------------
# Issue Labels
# ------------------------

@router.post(
    "/issues/{issue_id}/labels/{label_id}",
    status_code=status.HTTP_201_CREATED,
)
def attach_label(
    issue_id: int,
    label_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return LabelService(db).attach_label_to_issue(
        issue_id,
        label_id,
        current_user,
    )


@router.get(
    "/issues/{issue_id}/labels",
    response_model=list[LabelResponse],
)
def get_issue_labels(
    issue_id: int,
    db: Session = Depends(get_db),
):
    return LabelService(db).get_issue_labels(issue_id)


@router.delete(
    "/issues/{issue_id}/labels/{label_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def remove_label(
    issue_id: int,
    label_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    LabelService(db).remove_label_from_issue(
        issue_id,
        label_id,
        current_user,
    )