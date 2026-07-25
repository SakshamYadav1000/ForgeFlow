from sqlalchemy.orm import Session

from app.models.organization_member import OrganizationMember
from app.core.enums import OrganizationRole


class OrganizationMemberRepository:
    def __init__(self, db: Session):
        self.db = db

    # Create Member
    def create(
        self,
        organization_member: OrganizationMember,
    ):
        self.db.add(organization_member)
        self.db.commit()
        self.db.refresh(organization_member)
        return organization_member

    # Get All Members
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

    # Get Single Member
    def get_member(
        self,
        organization_id: int,
        user_id: int,
    ):
        return (
            self.db.query(OrganizationMember)
            .filter(
                OrganizationMember.organization_id
                == organization_id,
                OrganizationMember.user_id == user_id,
            )
            .first()
        )

    # Count Owners
    def count_owners(
        self,
        organization_id: int,
    ) -> int:
        return (
            self.db.query(OrganizationMember)
            .filter(
                OrganizationMember.organization_id
                == organization_id,
                OrganizationMember.role
                == OrganizationRole.OWNER,
            )
            .count()
        )

    # Update Member
    def update(
        self,
        member: OrganizationMember,
    ):
        self.db.commit()
        self.db.refresh(member)
        return member

    # Delete Member
    def delete(
        self,
        member: OrganizationMember,
    ):
        self.db.delete(member)
        self.db.commit()