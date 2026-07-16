from datetime import datetime

from pydantic import BaseModel, ConfigDict


class OrganizationMemberResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    organization_id: int
    user_id: int
    role: str
    joined_at: datetime