from fastapi import FastAPI

from app.api.v1.routes.auth import router as auth_router
from app.api.v1.routes.organization import router as organization_router
from app.api.v1.routes.users import router as users_router

app = FastAPI(
    title="ForgeFlow",
    description="Developer Collaboration Platform",
    version="1.0.0",
)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(organization_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to ForgeFlow",
        "status": "Running",
    }