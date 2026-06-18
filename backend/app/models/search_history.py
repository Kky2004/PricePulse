from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from app.database import Base

class SearchHistory(Base):

    __tablename__ = "search_history"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    product_name = Column(
        String,
        nullable=False
    )

    searched_at = Column(
        DateTime,
        default=datetime.utcnow
    )