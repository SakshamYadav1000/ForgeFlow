from sqlalchemy import Column, ForeignKey, Integer

from app.db.database import Base


class IssueLabel(Base):
    __tablename__ = "issue_labels"

    issue_id = Column(
        Integer,
        ForeignKey(
            "issues.id",
            ondelete="CASCADE",
        ),
        primary_key=True,
    )

    label_id = Column(
        Integer,
        ForeignKey(
            "labels.id",
            ondelete="CASCADE",
        ),
        primary_key=True,
    )