from datetime import datetime
from enum import Enum

from sqlalchemy import (
    Column,
    DateTime,
    Enum as SqlEnum,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship

from app.db.database import Base


class ActivityType(str, Enum):
    ORGANIZATION_CREATED = "ORGANIZATION_CREATED"
    ORGANIZATION_UPDATED = "ORGANIZATION_UPDATED"
    ORGANIZATION_DELETED = "ORGANIZATION_DELETED"

    PROJECT_CREATED = "PROJECT_CREATED"
    PROJECT_UPDATED = "PROJECT_UPDATED"
    PROJECT_DELETED = "PROJECT_DELETED"

    ISSUE_CREATED = "ISSUE_CREATED"
    ISSUE_UPDATED = "ISSUE_UPDATED"
    ISSUE_DELETED = "ISSUE_DELETED"
    ISSUE_ASSIGNED = "ISSUE_ASSIGNED"
    ISSUE_STATUS_CHANGED = "ISSUE_STATUS_CHANGED"

    COMMENT_CREATED = "COMMENT_CREATED"
    COMMENT_DELETED = "COMMENT_DELETED"

    MILESTONE_CREATED = "MILESTONE_CREATED"
    MILESTONE_UPDATED = "MILESTONE_UPDATED"
    MILESTONE_DELETED = "MILESTONE_DELETED"

    DEPENDENCY_CREATED = "DEPENDENCY_CREATED"
    DEPENDENCY_REMOVED = "DEPENDENCY_REMOVED"

    LABEL_ADDED = "LABEL_ADDED"
    LABEL_REMOVED = "LABEL_REMOVED"


class ActivityLog(Base):
    __tablename__ = "activity_logs"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    project_id = Column(
        Integer,
        ForeignKey("projects.id", ondelete="CASCADE"),
        nullable=False,
    )

    issue_id = Column(
        Integer,
        ForeignKey("issues.id", ondelete="CASCADE"),
        nullable=True,
    )

    activity_type = Column(
        SqlEnum(ActivityType),
        nullable=False,
    )

    description = Column(
        String,
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    user = relationship("User")

    project = relationship("Project")

    issue = relationship("Issue")