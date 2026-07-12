from fastapi import FastAPI
#import the router
from app.api.v1.routes.auth import router as auth_router
from app.api.v1.routes.users import router as users_router

app=FastAPI(
    title="ForgeFlow",
    description="Developer Collaboration Platform",
    version="1.0.0"
)

app.include_router(auth_router)
app.include_router(users_router)

@app.get("/")
def root():
    return{
        "message":"Welcome to FrogeFlow",
        "status":"Running"
    }
