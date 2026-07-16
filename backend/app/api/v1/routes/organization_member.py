from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies.auth import get_current_user
from app.schemas.organization_member import (
    OrganizationMemberCreate,
    OrganizationMemberResponse,
    OrganizationMemberUpdate,
)
from app.services.organization_member_service import (
    OrganizationMemberService,
)

router = APIRouter(
    prefix="/organizations",
    tags=["Organization Members"],
)


@router.get(
    "/{organization_id}/members",
    response_model=list[OrganizationMemberResponse],
)
def get_members(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return OrganizationMemberService(db).get_members(
        organization_id,
        current_user,
    )


@router.post(
    "/{organization_id}/members",
    response_model=OrganizationMemberResponse,
    status_code=status.HTTP_201_CREATED,
)
def add_member(
    organization_id: int,
    member: OrganizationMemberCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return OrganizationMemberService(db).add_member(
        organization_id,
        member,
        current_user,
    )


@router.patch(
    "/{organization_id}/members/{user_id}",
    response_model=OrganizationMemberResponse,
)
def update_member_role(
    organization_id: int,
    user_id: int,
    member: OrganizationMemberUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return OrganizationMemberService(db).update_member_role(
        organization_id,
        user_id,
        member,
        current_user,
    )


@router.delete(
    "/{organization_id}/members/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def remove_member(
    organization_id: int,
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    OrganizationMemberService(db).remove_member(
        organization_id,
        user_id,
        current_user,
    )