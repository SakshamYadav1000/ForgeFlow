from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String

from app.db.database import Base


class Label(Base):
    __tablename__ = "labels"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    organization_id = Column(
        Integer,
        ForeignKey(
            "organizations.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    name = Column(
        String(50),
        nullable=False,
    )

    color = Column(
        String(7),
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )