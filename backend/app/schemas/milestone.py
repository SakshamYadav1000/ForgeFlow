from datetime import datetime

from pydantic import BaseModel

from app.models.milestone import MilestoneStatus


class MilestoneCreate(BaseModel):
    title: str
    description: str | None = None
    due_date: datetime | None = None


class MilestoneUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    status: MilestoneStatus | None = None
    due_date: datetime | None = None


class MilestoneResponse(BaseModel):
    id: int
    project_id: int
    title: str
    description: str | None
    status: MilestoneStatus
    due_date: datetime | None
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }