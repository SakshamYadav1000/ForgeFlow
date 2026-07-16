from sqlalchemy.orm import Session

from app.models.organization import Organization
from app.models.organization_member import OrganizationMember


class OrganizationRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_slug(self, slug: str):
        return (
            self.db.query(Organization)
            .filter(Organization.slug == slug)
            .first()
        )

    def create(self, organization: Organization):
        self.db.add(organization)
        self.db.commit()
        self.db.refresh(organization)
        return organization

    def get_user_organizations(self, user_id: int):
        return (
            self.db.query(Organization)
            .join(
                OrganizationMember,
                Organization.id == OrganizationMember.organization_id,
            )
            .filter(OrganizationMember.user_id == user_id)
            .all()
        )

    def get_user_organization(
        self,
        organization_id: int,
        user_id: int,
    ):
        return (
            self.db.query(Organization)
            .join(
                OrganizationMember,
                Organization.id == OrganizationMember.organization_id,
            )
            .filter(
                Organization.id == organization_id,
                OrganizationMember.user_id == user_id,
            )
            .first()
        )

    def update(
        self,
        organization: Organization,
    ):
        self.db.commit()
        self.db.refresh(organization)
        return organization

    def delete(
        self,
        organization: Organization,
    ):
        self.db.delete(organization)
        self.db.commit()