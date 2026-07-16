from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.auth import LoginRequest, Token
from app.schemas.user import UserCreate, UserResponse
from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    service = AuthService(db)
    return service.register_user(user)


@router.post(
    "/login",
    response_model=Token,
)
def login(
    credentials: LoginRequest,
    db: Session = Depends(get_db),
):
    service = AuthService(db)

    access_token = service.login_user(
        credentials.email,
        credentials.password,
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }