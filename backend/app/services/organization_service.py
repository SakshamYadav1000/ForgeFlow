from sqlalchemy.orm import Session

from app.models.organization import Organization
from app.models.organization_member import OrganizationMember
from app.repositories.organization_member_repository import (
    OrganizationMemberRepository,
)
from app.repositories.organization_repository import OrganizationRepository
from app.schemas.organization import OrganizationCreate


class OrganizationService:
    def __init__(self, db: Session):
        self.organization_repository = OrganizationRepository(db)
        self.organization_member_repository = OrganizationMemberRepository(db)

    def create_organization(
        self,
        organization_data: OrganizationCreate,
        current_user,
    ):
        existing = self.organization_repository.get_by_slug(
            organization_data.slug
        )

        if existing:
            raise ValueError("Slug already exists")

        organization = Organization(
            name=organization_data.name,
            slug=organization_data.slug,
            description=organization_data.description,
            logo_url=organization_data.logo_url,
            created_by=current_user.id,
        )

        organization = self.organization_repository.create(organization)

        owner = OrganizationMember(
            organization_id=organization.id,
            user_id=current_user.id,
            role="owner",
        )

        self.organization_member_repository.create(owner)

        return organization