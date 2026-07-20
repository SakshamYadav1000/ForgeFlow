from datetime import datetime

from pydantic import BaseModel

from app.models.activity_log import ActivityType


class ActivityLogResponse(BaseModel):
    id: int
    user_id: int
    project_id: int
    issue_id: int | None
    activity_type: ActivityType
    description: str
    created_at: datetime

    model_config = {
        "from_attributes": True,
    }