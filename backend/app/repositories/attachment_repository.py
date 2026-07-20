from sqlalchemy.orm import Session

from app.models.attachment import Attachment


class AttachmentRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        attachment: Attachment,
    ) -> Attachment:
        self.db.add(attachment)
        self.db.commit()
        self.db.refresh(attachment)
        return attachment

    def get_by_id(
        self,
        attachment_id: int,
    ) -> Attachment | None:
        return (
            self.db.query(Attachment)
            .filter(
                Attachment.id == attachment_id
            )
            .first()
        )

    def get_issue_attachments(
        self,
        issue_id: int,
    ):
        return (
            self.db.query(Attachment)
            .filter(
                Attachment.issue_id == issue_id
            )
            .order_by(
                Attachment.created_at.desc()
            )
            .all()
        )

    def delete(
        self,
        attachment: Attachment,
    ):
        self.db.delete(attachment)
        self.db.commit()