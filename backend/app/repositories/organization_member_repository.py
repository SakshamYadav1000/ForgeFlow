from sqlalchemy.orm import Session

from app.models.organization_member import OrganizationMember


class OrganizationMemberRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, member: OrganizationMember):
        self.db.add(member)
        self.db.commit()
        self.db.refresh(member)
        return member