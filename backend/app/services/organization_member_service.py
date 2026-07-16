from sqlalchemy.orm import Session

from app.core.enums import OrganizationRole
from app.core.exceptions import (
    CannotChangeOwnerRoleException,
    CannotRemoveOwnerException,
    OrganizationMemberNotFoundException,
    OrganizationOwnerRequiredException,
    UserAlreadyMemberException,
    UserNotFoundException,
    OrganizationNotFoundException,
)
from app.models.organization_member import OrganizationMember
from app.models.user import User
from app.repositories.organization_member_repository import (
    OrganizationMemberRepository,
)
from app.repositories.organization_repository import (
    OrganizationRepository,
)
from app.repositories.user_repository import UserRepository
from app.schemas.organization_member import (
    OrganizationMemberCreate,
    OrganizationMemberUpdate,
)


class OrganizationMemberService:
    def __init__(self, db: Session):
        self.organization_repository = OrganizationRepository(db)
        self.organization_member_repository = (
            OrganizationMemberRepository(db)
        )
        self.user_repository = UserRepository(db)

    def _get_owned_organization(
        self,
        organization_id: int,
        current_user: User,
    ):
        organization = (
            self.organization_repository.get_user_organization(
                organization_id,
                current_user.id,
            )
        )

        if organization is None:
            raise OrganizationNotFoundException()

        if organization.created_by != current_user.id:
            raise OrganizationOwnerRequiredException()

        return organization

    def get_members(
        self,
        organization_id: int,
        current_user: User,
    ):
        self.organization_repository.get_user_organization(
            organization_id,
            current_user.id,
        )

        return self.organization_member_repository.get_members(
            organization_id
        )

    def add_member(
        self,
        organization_id: int,
        member_data: OrganizationMemberCreate,
        current_user: User,
    ):
        self._get_owned_organization(
            organization_id,
            current_user,
        )

        user = self.user_repository.get_by_id(
            member_data.user_id
        )

        if user is None:
            raise UserNotFoundException()

        existing = self.organization_member_repository.get_member(
            organization_id,
            member_data.user_id,
        )

        if existing:
            raise UserAlreadyMemberException()

        member = OrganizationMember(
            organization_id=organization_id,
            user_id=member_data.user_id,
            role=member_data.role,
        )

        return self.organization_member_repository.create(
            member
        )

    def update_member_role(
        self,
        organization_id: int,
        user_id: int,
        member_data: OrganizationMemberUpdate,
        current_user: User,
    ):
        self._get_owned_organization(
            organization_id,
            current_user,
        )

        member = self.organization_member_repository.get_member(
            organization_id,
            user_id,
        )

        if member is None:
            raise OrganizationNotFoundException()

        if member.role == OrganizationRole.OWNER:
            raise CannotChangeOwnerRoleException()

        member.role = member_data.role

        return self.organization_member_repository.update(
            member
        )

    def remove_member(
        self,
        organization_id: int,
        user_id: int,
        current_user: User,
    ):
        self._get_owned_organization(
            organization_id,
            current_user,
        )

        member = self.organization_member_repository.get_member(
            organization_id,
            user_id,
        )

        if member is None:
            raise OrganizationNotFoundException()

        if member.role == OrganizationRole.OWNER:
            raise CannotRemoveOwnerException()

        self.organization_member_repository.delete(member)