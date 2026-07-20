import os
import shutil
import uuid

from fastapi import (
    HTTPException,
    UploadFile,
    status,
)
from sqlalchemy.orm import Session

from app.models.attachment import Attachment
from app.models.user import User
from app.repositories.attachment_repository import (
    AttachmentRepository,
)
from app.repositories.issue_repository import (
    IssueRepository,
)


UPLOAD_DIRECTORY = "uploads"


class AttachmentService:
    def __init__(self, db: Session):
        self.db = db
        self.attachment_repository = (
            AttachmentRepository(db)
        )
        self.issue_repository = (
            IssueRepository(db)
        )

        os.makedirs(
            UPLOAD_DIRECTORY,
            exist_ok=True,
        )

    def upload_attachment(
        self,
        issue_id: int,
        file: UploadFile,
        current_user: User,
    ):
        issue = self.issue_repository.get_by_id(
            issue_id
        )

        if issue is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Issue not found",
            )

        extension = os.path.splitext(
            file.filename
        )[1]

        unique_filename = (
            f"{uuid.uuid4()}{extension}"
        )

        file_path = os.path.join(
            UPLOAD_DIRECTORY,
            unique_filename,
        )

        with open(
            file_path,
            "wb",
        ) as buffer:
            shutil.copyfileobj(
                file.file,
                buffer,
            )

        attachment = Attachment(
            issue_id=issue.id,
            uploaded_by=current_user.id,
            file_name=file.filename,          # original filename
            stored_name=unique_filename,      # generated UUID filename
            file_path=file_path,              # uploads/<uuid>.ext
            file_size=os.path.getsize(file_path),
            mime_type=file.content_type,
        )

        return self.attachment_repository.create(
            attachment
        )

    def get_issue_attachments(
        self,
        issue_id: int,
    ):
        issue = self.issue_repository.get_by_id(
            issue_id
        )

        if issue is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Issue not found",
            )

        return (
            self.attachment_repository.get_issue_attachments(
                issue_id
            )
        )

    def delete_attachment(
        self,
        attachment_id: int,
        current_user: User,
    ):
        attachment = (
            self.attachment_repository.get_by_id(
                attachment_id
            )
        )

        if attachment is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Attachment not found",
            )

        if (
            attachment.uploaded_by
            != current_user.id
        ):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not allowed",
            )

        file_path = os.path.join(
            UPLOAD_DIRECTORY,
            attachment.stored_name,
        )

        if os.path.exists(file_path):
            os.remove(file_path)

        self.attachment_repository.delete(
            attachment
        )