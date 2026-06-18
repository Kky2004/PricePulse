from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship

from datetime import datetime

from app.database import Base


class ProductPrice(Base):

    __tablename__ = "product_prices"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    product_id = Column(
        Integer,
        ForeignKey("products.id")
    )

    platform = Column(
        String,
        nullable=False
    )

    price = Column(
        Float,
        nullable=False
    )

    product_url = Column(String)

    recorded_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    # product = relationship(
    #     "Product",
    #     back_populates="prices"
    # )