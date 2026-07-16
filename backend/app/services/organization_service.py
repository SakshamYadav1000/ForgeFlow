from sqlalchemy.orm import Session

from app.core.exceptions import (
    OrganizationNotFoundException,
    OrganizationOwnerRequiredException,
    SlugAlreadyExistsException,
)
from app.models.organization import Organization
from app.models.organization_member import OrganizationMember
from app.models.user import User
from app.repositories.organization_member_repository import (
    OrganizationMemberRepository,
)
from app.repositories.organization_repository import (
    OrganizationRepository,
)
from app.schemas.organization import (
    OrganizationCreate,
    OrganizationUpdate,
)


class OrganizationService:
    def __init__(self, db: Session):
        self.organization_repository = OrganizationRepository(db)
        self.organization_member_repository = (
            OrganizationMemberRepository(db)
        )

    def _get_user_organization(
        self,
        organization_id: int,
        current_user: User,
    ) -> Organization:
        organization = (
            self.organization_repository.get_user_organization(
                organization_id,
                current_user.id,
            )
        )

        if organization is None:
            raise OrganizationNotFoundException()

        return organization

    def _get_owned_organization(
        self,
        organization_id: int,
        current_user: User,
    ) -> Organization:
        organization = self._get_user_organization(
            organization_id,
            current_user,
        )

        if organization.created_by != current_user.id:
            raise OrganizationOwnerRequiredException()

        return organization

    def create_organization(
        self,
        organization_data: OrganizationCreate,
        current_user: User,
    ) -> Organization:
        existing = self.organization_repository.get_by_slug(
            organization_data.slug
        )

        if existing:
            raise SlugAlreadyExistsException()

        organization = Organization(
            name=organization_data.name,
            slug=organization_data.slug,
            description=organization_data.description,
            logo_url=organization_data.logo_url,
            created_by=current_user.id,
        )

        organization = self.organization_repository.create(
            organization
        )

        owner = OrganizationMember(
            organization_id=organization.id,
            user_id=current_user.id,
            role="owner",
        )

        self.organization_member_repository.create(owner)

        return organization

    def get_user_organizations(
        self,
        current_user: User,
    ):
        return self.organization_repository.get_user_organizations(
            current_user.id
        )

    def get_user_organization(
        self,
        organization_id: int,
        current_user: User,
    ) -> Organization:
        return self._get_user_organization(
            organization_id,
            current_user,
        )

    def get_members(
        self,
        organization_id: int,
        current_user: User,
    ):
        self._get_user_organization(
            organization_id,
            current_user,
        )

        return self.organization_member_repository.get_members(
            organization_id
        )

    def update_organization(
        self,
        organization_id: int,
        organization_data: OrganizationUpdate,
        current_user: User,
    ) -> Organization:
        organization = self._get_owned_organization(
            organization_id,
            current_user,
        )

        if (
            organization_data.slug
            and organization_data.slug != organization.slug
        ):
            existing = self.organization_repository.get_by_slug(
                organization_data.slug
            )

            if existing:
                raise SlugAlreadyExistsException()

        update_data = organization_data.model_dump(
            exclude_unset=True
        )

        for field, value in update_data.items():
            setattr(organization, field, value)

        return self.organization_repository.update(
            organization
        )

    def delete_organization(
        self,
        organization_id: int,
        current_user: User,
    ) -> None:
        organization = self._get_owned_organization(
            organization_id,
            current_user,
        )

        self.organization_repository.delete(organization)