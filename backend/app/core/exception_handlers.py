from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.core.exceptions import ForgeFlowException


def register_exception_handlers(app: FastAPI):
    @app.exception_handler(ForgeFlowException)
    async def forgeflow_exception_handler(
        request: Request,
        exc: ForgeFlowException,
    ):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "detail": exc.detail,
            },
        )