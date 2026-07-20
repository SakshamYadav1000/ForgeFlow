from fastapi import FastAPI

#routers
from app.api.v1.routes.auth import router as auth_router
from app.api.v1.routes.organization import router as organization_router
from app.api.v1.routes.organization_member import router as organization_member
from app.api.v1.routes.project import router as project
from app.api.v1.routes.issue import router as issue
from app.api.v1.routes.comment import router as comment_router
from app.api.v1.routes.label import router as label_router
from app.api.v1.routes.milestone import router as milestone_router
from app.api.v1.routes.issue_dependency import router as issue_dependency
from app.api.v1.routes.notification import router as notification


#exception handlers
from app.core.exception_handlers import (
    register_exception_handlers,
)

app = FastAPI(
    title="ForgeFlow",
    description="Developer Collaboration Platform",
    version="1.0.0",
)

register_exception_handlers(app)

app.include_router(auth_router)
app.include_router(organization_router)
app.include_router(organization_member)
app.include_router(project)
app.include_router(issue)
app.include_router(comment_router)
app.include_router(label_router)
app.include_router(milestone_router)
app.include_router(issue_dependency)
app.include_router(notification)


@app.get("/")
def root():
    return {
        "message": "Welcome to ForgeFlow",
        "status": "Running",
    }