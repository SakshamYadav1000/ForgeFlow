from sqlalchemy.orm import Session

from app.models.issue_dependency import (
    DependencyType,
    IssueDependency,
)


class IssueDependencyRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        dependency: IssueDependency,
    ) -> IssueDependency:
        self.db.add(dependency)
        self.db.commit()
        self.db.refresh(dependency)
        return dependency

    def get_by_id(
        self,
        dependency_id: int,
    ) -> IssueDependency | None:
        return (
            self.db.query(IssueDependency)
            .filter(
                IssueDependency.id == dependency_id
            )
            .first()
        )

    def get_between_issues(
        self,
        source_issue_id: int,
        target_issue_id: int,
        dependency_type: DependencyType,
    ) -> IssueDependency | None:
        return (
            self.db.query(IssueDependency)
            .filter(
                IssueDependency.source_issue_id
                == source_issue_id,
                IssueDependency.target_issue_id
                == target_issue_id,
                IssueDependency.dependency_type
                == dependency_type,
            )
            .first()
        )

    def get_issue_dependencies(
        self,
        issue_id: int,
    ):
        return (
            self.db.query(IssueDependency)
            .filter(
                IssueDependency.source_issue_id
                == issue_id
            )
            .all()
        )

    def delete(
        self,
        dependency: IssueDependency,
    ):
        self.db.delete(dependency)
        self.db.commit()