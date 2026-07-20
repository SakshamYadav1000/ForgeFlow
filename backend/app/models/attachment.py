from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship

from app.db.database import Base


class Attachment(Base):
    __tablename__ = "attachments"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    issue_id = Column(
        Integer,
        ForeignKey("issues.id", ondelete="CASCADE"),
        nullable=False,
    )

    uploaded_by = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    file_name = Column(
        String,
        nullable=False,
    )

    stored_name = Column(
        String,
        nullable=False,
        unique=True,
    )

    file_path = Column(
        String,
        nullable=False,
    )

    file_size = Column(
        Integer,
        nullable=False,
    )

    mime_type = Column(
        String,
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    issue = relationship("Issue")
    user = relationship("User")