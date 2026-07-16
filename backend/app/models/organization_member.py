from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String

from app.db.database import Base


class OrganizationMember(Base):
    __tablename__ = "organization_members"

    id = Column(Integer, primary_key=True, index=True)

    organization_id = Column(
        Integer,
        ForeignKey(
            "organizations.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    role = Column(
        String,
        default="member",
        nullable=False,
    )

    joined_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )