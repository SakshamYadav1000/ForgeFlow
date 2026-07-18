from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field

from app.models.issue import (
    IssuePriority,
    IssueStatus,
)


class IssueBase(BaseModel):
    title: str = Field(
        min_length=2,
        max_length=200,
    )

    description: Optional[str] = None

    priority: IssuePriority = IssuePriority.MEDIUM

    assignee_id: Optional[int] = None

    milestone_id: Optional[int] = None


class IssueCreate(IssueBase):
    pass


class IssueUpdate(BaseModel):
    title: Optional[str] = Field(
        default=None,
        min_length=2,
        max_length=200,
    )

    description: Optional[str] = None

    status: Optional[IssueStatus] = None

    priority: Optional[IssuePriority] = None

    assignee_id: Optional[int] = None

    milestone_id: Optional[int] = None


class IssueResponse(IssueBase):
    id: int
    project_id: int
    status: IssueStatus
    reporter_id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )