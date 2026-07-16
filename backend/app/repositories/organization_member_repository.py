from sqlalchemy.orm import Session

from app.models.organization_member import OrganizationMember


class OrganizationMemberRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        organization_member: OrganizationMember,
    ):
        self.db.add(organization_member)
        self.db.commit()
        self.db.refresh(organization_member)
        return organization_member

    def get_members(
        self,
        organization_id: int,
    ):
        return (
            self.db.query(OrganizationMember)
            .filter(
                OrganizationMember.organization_id
                == organization_id
            )
            .all()
        )