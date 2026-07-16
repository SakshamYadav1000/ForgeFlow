from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies.auth import get_current_user
from app.schemas.organization import (
    OrganizationCreate,
    OrganizationResponse,
    OrganizationUpdate,
)
from app.schemas.organization_member import (
    OrganizationMemberResponse,
)
from app.services.organization_service import OrganizationService

router = APIRouter(
    prefix="/organizations",
    tags=["Organizations"],
)


@router.post(
    "",
    response_model=OrganizationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_organization(
    organization: OrganizationCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    service = OrganizationService(db)

    return service.create_organization(
        organization,
        current_user,
    )


@router.get(
    "",
    response_model=list[OrganizationResponse],
)
def get_organizations(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    service = OrganizationService(db)

    return service.get_user_organizations(
        current_user,
    )


@router.get(
    "/{organization_id}",
    response_model=OrganizationResponse,
)
def get_organization(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    service = OrganizationService(db)

    return service.get_user_organization(
        organization_id,
        current_user,
    )


@router.get(
    "/{organization_id}/members",
    response_model=list[OrganizationMemberResponse],
)
def get_organization_members(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    service = OrganizationService(db)

    return service.get_members(
        organization_id,
        current_user,
    )


@router.patch(
    "/{organization_id}",
    response_model=OrganizationResponse,
)
def update_organization(
    organization_id: int,
    organization: OrganizationUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    service = OrganizationService(db)

    return service.update_organization(
        organization_id,
        organization,
        current_user,
    )


@router.delete(
    "/{organization_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_organization(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    service = OrganizationService(db)

    service.delete_organization(
        organization_id,
        current_user,
    )