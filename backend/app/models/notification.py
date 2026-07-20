from datetime import datetime
from enum import Enum

from sqlalchemy import (
    Column,
    DateTime,
    Enum as SqlEnum,
    ForeignKey,
    Integer,
    String,
    Boolean,
)
from sqlalchemy.orm import relationship

from app.db.database import Base


class NotificationType(str, Enum):
    ISSUE_ASSIGNED = "ISSUE_ASSIGNED"
    ISSUE_UPDATED = "ISSUE_UPDATED"
    COMMENT_ADDED = "COMMENT_ADDED"
    MENTION = "MENTION"


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    title = Column(
        String(255),
        nullable=False,
    )

    message = Column(
        String(500),
        nullable=False,
    )

    notification_type = Column(
        SqlEnum(NotificationType),
        nullable=False,
    )

    is_read = Column(
        Boolean,
        default=False,
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    user = relationship(
        "User",
        back_populates="notifications",
    )