from datetime import datetime
from enum import Enum

from sqlalchemy import Column, DateTime, Enum as SqlEnum, ForeignKey, Integer, String, Text

from app.db.database import Base

from sqlalchemy.orm import relationship


class IssueStatus(str, Enum):
    TODO = "TODO"
    IN_PROGRESS = "IN_PROGRESS"
    DONE = "DONE"


class IssuePriority(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class Issue(Base):
    __tablename__ = "issues"

    id = Column(Integer, primary_key=True, index=True)

    project_id = Column(
        Integer,
        ForeignKey("projects.id", ondelete="CASCADE"),
        nullable=False,
    )

    milestone_id = Column(
        Integer,
        ForeignKey("milestones.id", ondelete="SET NULL",),
        nullable=True,
    )

    title = Column(
        String,
        nullable=False,
    )

    description = Column(
        Text,
        nullable=True,
    )

    status = Column(
        SqlEnum(IssueStatus),
        default=IssueStatus.TODO,
        nullable=False,
    )

    priority = Column(
        SqlEnum(IssuePriority),
        default=IssuePriority.MEDIUM,
        nullable=False,
    )

    reporter_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    assignee_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    comments = relationship(
    "Comment",
    back_populates="issue",
    cascade="all, delete-orphan",
    )

    dependencies = relationship(
    "IssueDependency",
    foreign_keys="IssueDependency.source_issue_id",
    cascade="all, delete-orphan",
    )

    blocked_by = relationship(
    "IssueDependency",
    foreign_keys="IssueDependency.target_issue_id",
    cascade="all, delete-orphan",
    )