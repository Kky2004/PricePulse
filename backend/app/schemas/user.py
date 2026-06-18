from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
import uuid

from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    full_name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    mobile = Column(String(15), nullable=False)
    password_hash = Column(String, nullable=False)