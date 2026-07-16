from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class OrganizationCreate(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    logo_url: Optional[str] = None


class OrganizationUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    logo_url: Optional[str] = None


class OrganizationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    slug: str
    description: Optional[str]
    logo_url: Optional[str]
    created_by: int
    created_at: datetime