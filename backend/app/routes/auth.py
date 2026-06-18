from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session

from app.schemas.auth_schema import UserSignup, UserLogin
from app.database import get_db
from app.models.user import User
from app.services.auth_service import (
    create_access_token,
    verify_token
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)
print("✅ AUTH ROUTER LOADED")


@router.get("/")
def test_auth():
    return {
        "message": "Authentication Route Working"
    }


@router.post("/signup")
def signup(user: UserSignup, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password_hash=user.password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user_id": str(new_user.id)
    }


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if db_user.password_hash != user.password:
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    token = create_access_token(
        {
            "user_id": str(db_user.id),
            "email": db_user.email
        }
    )

    return {
        "message": "Login successful",
        "access_token": token,
        "token_type": "bearer",
        "user_id": str(db_user.id),
        "full_name": db_user.full_name,
        "email": db_user.email
    }


@router.get("/me")
def get_me(
    authorization: str = Header(None)
):

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Token missing"
        )

    token = authorization.replace(
        "Bearer ",
        ""
    )

    payload = verify_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    return {
        "user_id": payload["user_id"],
        "email": payload["email"]
    }