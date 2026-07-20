from enum import Enum
from datetime import datetime
from sqlalchemy import DateTime

from sqlalchemy import (
    Column,
    Enum as SqlEnum,
    ForeignKey,
    Integer,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship

from app.db.database import Base


class DependencyType(str, Enum):
    BLOCKS = "BLOCKS"
    RELATED = "RELATED"
    DUPLICATE = "DUPLICATE"


class IssueDependency(Base):
    __tablename__ = "issue_dependencies"

    __table_args__ = (
        UniqueConstraint(
            "source_issue_id",
            "target_issue_id",
            "dependency_type",
            name="uq_issue_dependency",
        ),
    )

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    source_issue_id = Column(
        Integer,
        ForeignKey(
            "issues.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    target_issue_id = Column(
        Integer,
        ForeignKey(
            "issues.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    dependency_type = Column(
        SqlEnum(DependencyType),
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    source_issue = relationship(
        "Issue",
        foreign_keys=[source_issue_id],
    )

    target_issue = relationship(
        "Issue",
        foreign_keys=[target_issue_id],
    )