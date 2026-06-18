from pydantic import BaseModel
from datetime import datetime

class ProductCreate(BaseModel):
    title: str
    category: str | None = None
    image_url: str | None = None
    brand: str | None = None
    slug: str | None = None


class ProductResponse(BaseModel):
    id: int
    title: str
    category: str | None = None
    image_url: str | None = None
    brand: str | None = None
    slug: str | None = None

    class Config:
        from_attributes = True


class SearchHistoryResponse(BaseModel):

    id: int

    product_name: str

    searched_at: datetime

    class Config:
        from_attributes = True



class PriceCreate(BaseModel):

    product_id: int

    platform: str

    price: float


class PriceResponse(BaseModel):

    id: int

    product_id: int

    platform: str

    price: float

    recorded_at: datetime

    class Config:
        from_attributes = True