from pydantic import BaseModel, ConfigDict
from datetime import datetime

from app.models.activity_log import ActivityType
from app.models.notification import NotificationType



class IssueStatusCount(BaseModel):

    todo: int

    in_progress: int

    done: int



class PriorityCount(BaseModel):

    high: int

    medium: int

    low: int



class DashboardActivity(BaseModel):

    id: int

    description: str

    activity_type: ActivityType

    created_at: datetime


    model_config = ConfigDict(
        from_attributes=True,
    )



class DashboardNotification(BaseModel):

    id: int

    title: str

    message: str

    notification_type: NotificationType

    is_read: bool

    created_at: datetime


    model_config = ConfigDict(
        from_attributes=True,
    )



class DashboardResponse(BaseModel):

    organizations: int

    projects: int

    assigned_issues: int

    reported_issues: int


    issue_status: IssueStatusCount

    priority: PriorityCount


    recent_activity: list[DashboardActivity]


    notifications: list[DashboardNotification]


    model_config = ConfigDict(
        from_attributes=True,
    )