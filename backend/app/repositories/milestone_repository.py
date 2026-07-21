from sqlalchemy.orm import Session

from sqlalchemy import func

from app.models.milestone import (
    Milestone,
    MilestoneStatus,
)

class MilestoneRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        milestone: Milestone,
    ) -> Milestone:
        self.db.add(milestone)
        self.db.commit()
        self.db.refresh(milestone)
        return milestone

    def get_by_id(
        self,
        milestone_id: int,
    ) -> Milestone | None:
        return (
            self.db.query(Milestone)
            .filter(Milestone.id == milestone_id)
            .first()
        )

    def get_by_project(
        self,
        project_id: int,
    ):
        return (
            self.db.query(Milestone)
            .filter(
                Milestone.project_id == project_id
            )
            .all()
        )

    def update(
        self,
        milestone: Milestone,
    ) -> Milestone:
        self.db.commit()
        self.db.refresh(milestone)
        return milestone

    def delete(
        self,
        milestone: Milestone,
    ):
        self.db.delete(milestone)
        self.db.commit()

#Dashboard
    def count_by_project(
        self,
        project_id: int,
    ):
        return (
            self.db.query(func.count(Milestone.id))
            .filter(
                Milestone.project_id == project_id
            )
            .scalar()
        )


    def count_completed(
        self,
        project_id: int,
    ):
        return (
            self.db.query(func.count(Milestone.id))
            .filter(
                Milestone.project_id == project_id,
                Milestone.status == MilestoneStatus.CLOSED,
            )
            .scalar()
        )