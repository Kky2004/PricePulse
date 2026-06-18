from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import relationship
from sqlalchemy import DateTime
from datetime import datetime

from app.database import Base

class Product(Base):

    __tablename__ = "products"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String,
        nullable=False
    )

    category = Column(
        String,
        nullable=True
    )

    image_url = Column(
        String,
        nullable=True
    )

    brand = Column(String)

    slug = Column(
        String,
        unique=True,
        index=True,
        nullable=True
    )

    # prices = relationship(
    #     "ProductPrice",
    #     back_populates="product"
    # )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )