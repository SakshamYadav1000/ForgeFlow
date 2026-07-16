from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.core.enums import OrganizationRole


class OrganizationMemberCreate(BaseModel):
    user_id: int
    role: OrganizationRole = OrganizationRole.MEMBER


class OrganizationMemberUpdate(BaseModel):
    role: OrganizationRole


class OrganizationMemberResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    organization_id: int
    user_id: int
    role: OrganizationRole
    joined_at: datetime