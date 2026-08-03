from sqlalchemy.orm import Session

from app.models.organization_member import OrganizationMember
from app.models.project import Project


class ProjectRepository:
    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def create(
        self,
        project: Project,
    ) -> Project:
        self.db.add(project)
        self.db.commit()
        self.db.refresh(project)
        return project

    def get_by_id(
        self,
        project_id: int,
    ) -> Project | None:
        return (
            self.db.query(Project)
            .filter(Project.id == project_id)
            .first()
        )



    def get_user_projects(
        self,
        user_id: int,
    ):

        return (
            self.db.query(Project)
            .join(
                OrganizationMember,
                Project.organization_id ==
                OrganizationMember.organization_id
            )
            .filter(
                OrganizationMember.user_id == user_id
            )
            .all()
        )

    def get_by_key(
        self,
        key: str,
    ) -> Project | None:
        return (
            self.db.query(Project)
            .filter(Project.key == key)
            .first()
        )

    def get_by_organization(
        self,
        organization_id: int,
    ):
        return (
            self.db.query(Project)
            .filter(
                Project.organization_id == organization_id
            )
            .all()
        )

    def update(
        self,
        project: Project,
    ) -> Project:
        self.db.commit()
        self.db.refresh(project)
        return project

    def delete(
        self,
        project: Project,
    ):
        self.db.delete(project)
        self.db.commit()