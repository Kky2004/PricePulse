from fastapi import APIRouter
from app.schemas.auth_schema import UserSignup, UserLogin

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.get("/")
def test_auth():
    return {
        "message": "Authentication Route Working"
    }