from pydantic import BaseModel


class DashboardResponse(BaseModel):
    total_issues: int

    todo: int
    in_progress: int
    done: int

    low_priority: int
    medium_priority: int
    high_priority: int

    overdue_issues: int

    total_milestones: int
    completed_milestones: int

    recent_activity: int