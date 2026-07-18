from datetime import datetime

from pydantic import BaseModel


class LabelCreate(BaseModel):
    name: str
    color: str


class LabelUpdate(BaseModel):
    name: str | None = None
    color: str | None = None


class LabelResponse(BaseModel):
    id: int
    organization_id: int
    name: str
    color: str
    created_at: datetime

    model_config = {
        "from_attributes": True,
    }