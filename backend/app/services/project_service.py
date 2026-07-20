from sqlalchemy.orm import Session

from app.core.exceptions import (
    OrganizationMemberNotFoundException,
    OrganizationOwnerRequiredException,
    ProjectKeyAlreadyExistsException,
    ProjectNotFoundException,
)
from app.models.project import Project
from app.models.user import User
from app.repositories.organization_repository import (
    OrganizationRepository,
)
from app.repositories.project_repository import (
    ProjectRepository,
)
from app.schemas.project import (
    ProjectCreate,
    ProjectUpdate,
)
from app.services.activity_log_service import ActivityLogService
from app.models.activity_log import ActivityType

class ProjectService:
    def __init__(self, db: Session):
        self.db = db

        self.organization_repository = OrganizationRepository(db)
        self.project_repository = ProjectRepository(db)

    def _get_owned_organization(
        self,
        organization_id: int,
        current_user: User,
    ):
        organization = (
            self.organization_repository.get_user_organization(
                organization_id,
                current_user.id,
            )
        )

        if organization is None:
            raise ProjectNotFoundException()

        if organization.created_by != current_user.id:
            raise ProjectNotFoundException()

        return organization

    def create_project(
        self,
        organization_id: int,
        project_data: ProjectCreate,
        current_user: User,
    ):
        self._get_owned_organization(
            organization_id,
            current_user,
        )

        existing = self.project_repository.get_by_key(
            project_data.key
        )

        if existing:
            raise ProjectKeyAlreadyExistsException()

        project = Project(
            organization_id=organization_id,
            name=project_data.name,
            key=project_data.key.upper(),
            description=project_data.description,
            created_by=current_user.id,
        )

        project = self.project_repository.create(project)

        ActivityLogService(self.db).create_activity(
            user_id=current_user.id,
            project_id=project.id,
            activity_type=ActivityType.PROJECT_CREATED,
            description=f"Created project '{project.name}'",
        )

        return project

    def get_projects(
        self,
        organization_id: int,
        current_user: User,
    ):
        organization = (
            self.organization_repository.get_user_organization(
                organization_id,
                current_user.id,
            )
        )

        if organization is None:
            raise ProjectNotFoundException()

        return self.project_repository.get_by_organization(
            organization_id
        )

    def get_project(
        self,
        project_id: int,
    ):
        project = self.project_repository.get_by_id(
            project_id
        )

        if project is None:
            raise ProjectNotFoundException()

        return project

    def update_project(
        self,
        project_id: int,
        project_data: ProjectUpdate,
        current_user: User,
    ):
        project = self.project_repository.get_by_id(
            project_id
        )

        if project is None:
            raise ProjectNotFoundException()

        self._get_owned_organization(
            project.organization_id,
            current_user,
        )

        if project_data.name is not None:
            project.name = project_data.name

        if project_data.description is not None:
            project.description = project_data.description

        project = self.project_repository.update(project)

        ActivityLogService(self.db).create_activity(
            user_id=current_user.id,
            project_id=project.id,
            activity_type=ActivityType.PROJECT_UPDATED,
            description=f"Updated project '{project.name}'",
        )

        return project

    def delete_project(
        self,
        project_id: int,
        current_user: User,
    ):
        project = self.project_repository.get_by_id(
            project_id
        )

        if project is None:
            raise ProjectNotFoundException()

        self._get_owned_organization(
            project.organization_id,
            current_user,
        )

        ActivityLogService(self.db).create_activity(
            user_id=current_user.id,
            project_id=project.id,
            activity_type=ActivityType.PROJECT_DELETED,
            description=f"Deleted project '{project.name}'",
        )

        self.project_repository.delete(project)