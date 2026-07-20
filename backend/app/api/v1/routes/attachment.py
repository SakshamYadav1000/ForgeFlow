from fastapi import (
    APIRouter,
    Depends,
    File,
    UploadFile,
)
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.attachment import AttachmentResponse
from app.services.attachment_service import (
    AttachmentService,
)

router = APIRouter(
    prefix="/attachments",
    tags=["Attachments"],
)


@router.post(
    "/issues/{issue_id}",
    response_model=AttachmentResponse,
)
def upload_attachment(
    issue_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return AttachmentService(db).upload_attachment(
        issue_id,
        file,
        current_user,
    )


@router.get(
    "/issues/{issue_id}",
    response_model=list[AttachmentResponse],
)
def get_issue_attachments(
    issue_id: int,
    db: Session = Depends(get_db),
):
    return AttachmentService(
        db
    ).get_issue_attachments(
        issue_id
    )


@router.delete(
    "/{attachment_id}",
)
def delete_attachment(
    attachment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    AttachmentService(db).delete_attachment(
        attachment_id,
        current_user,
    )

    return {
        "message": "Attachment deleted successfully"
    }