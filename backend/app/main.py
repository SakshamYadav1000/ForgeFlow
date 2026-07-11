from fastapi import FastAPI

app=FastAPI(
    title="ForgeFlow",
    description="Developer Collaboration Platform",
    version="1.0.0"
)

@app.get("/")
def root():
    return{
        "message":"Welcome to FrogeFlow",
        "status":"Running"
    }
@app.get("/health")
def health_check():
    return{
        "status":"healthy"
    }
