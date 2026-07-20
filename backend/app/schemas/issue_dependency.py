from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.issue_dependency import DependencyType


class IssueDependencyCreate(BaseModel):
    target_issue_id: int
    dependency_type: DependencyType


class IssueDependencyResponse(BaseModel):
    id: int
    source_issue_id: int
    target_issue_id: int
    dependency_type: DependencyType
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )