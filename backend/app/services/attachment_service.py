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
from fastapi.responses import FileResponse

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

    def _ensure_issue_access(
        self,
        issue_id: int,
        current_user: User,
    ):
        issue = self.issue_repository.get_by_id(issue_id)

        if issue is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Issue not found",
            )

        project = self.project_repository.get_by_id(
            issue.project_id
        )

        membership = (
            self.organization_repository.get_user_organization(
                project.organization_id,
                current_user.id,
            )
        )

        if membership is None:
            raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
                detail="Not allowed",
            )

        return issue

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
        current_user: User,
    ):
        self._ensure_issue_access(issue_id, current_user)

        return self.attachment_repository.get_issue_attachments(
            issue_id
        )

    def download_attachment(
        self,
        attachment_id: int,
        current_user: User,
    ):
        attachment = self.attachment_repository.get_by_id(
            attachment_id
        )

        if attachment is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Attachment not found",
            )

        self._ensure_issue_access(
            attachment.issue_id,
            current_user,
        )

        if not os.path.exists(attachment.file_path):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="File not found",
            )

        return FileResponse(
            path=attachment.file_path,
            filename=attachment.file_name,
            media_type=attachment.mime_type,
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