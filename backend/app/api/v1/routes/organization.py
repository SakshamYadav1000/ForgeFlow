from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies.auth import get_current_user
from app.schemas.organization import (
    OrganizationCreate,
    OrganizationResponse,
    OrganizationUpdate,
)
from app.services.organization_service import OrganizationService

router = APIRouter(
    prefix="/organizations",
    tags=["Organizations"],
)


@router.post(
    "",
    response_model=OrganizationResponse,
    status_code=201,
)
def create_organization(
    organization: OrganizationCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    service = OrganizationService(db)

    try:
        return service.create_organization(
            organization,
            current_user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
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

    return service.get_user_organizations(current_user)


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

    try:
        return service.get_user_organization(
            organization_id,
            current_user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
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

    try:
        return service.update_organization(
            organization_id,
            organization,
            current_user,
        )

    except ValueError as e:
        message = str(e)

        if message == "Organization not found":
            raise HTTPException(
                status_code=404,
                detail=message,
            )

        raise HTTPException(
            status_code=400,
            detail=message,
        )