from fastapi import FastAPI

#routers
from app.api.v1.routes.auth import router as auth_router
from app.api.v1.routes.organization import router as organization_router
from app.api.v1.routes.organization_member import router as organization_member
from app.api.v1.routes.project import router as project
from app.api.v1.routes.issue import router as issue

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


@app.get("/")
def root():
    return {
        "message": "Welcome to ForgeFlow",
        "status": "Running",
    }