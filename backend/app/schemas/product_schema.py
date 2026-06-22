"""
Pydantic schemas for FastAPI request/response validation.

Pattern per entity:
    <Entity>Base    -> shared fields
    <Entity>Create  -> fields needed to insert a new row (no id, no server defaults)
    <Entity>Out     -> what the API returns (includes id + timestamps)
    <Entity>WithX   -> nested/joined response shapes for dashboard endpoints
"""

from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel, ConfigDict


# ---------------------------------------------------------------------------
# Product
# ---------------------------------------------------------------------------

class ProductBase(BaseModel):
    title: str
    brand: str
    category: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    slug: Optional[str] = None


class ProductCreate(ProductBase):
    pass

class ProductResponse(ProductBase):
    pass


class ProductOut(ProductBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime


# ---------------------------------------------------------------------------
# Product Listing
# ---------------------------------------------------------------------------

class ProductListingBase(BaseModel):
    product_id: int
    platform: str
    price: float
    rating: Optional[float] = None
    reviews_count: Optional[int] = None
    stock_status: Optional[str] = None
    product_url: Optional[str] = None
    seller_name: Optional[str] = None


class ProductListingCreate(ProductListingBase):
    pass


class ProductListingOut(ProductListingBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    recorded_at: datetime


# ---------------------------------------------------------------------------
# Price History
# ---------------------------------------------------------------------------

class PriceHistoryBase(BaseModel):
    product_listing_id: int
    price: float


class PriceHistoryCreate(PriceHistoryBase):
    pass


class PriceHistoryOut(PriceHistoryBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    recorded_at: datetime


# A single point on the trend chart -- lighter payload for GET /price-trend/{id}
class PricePoint(BaseModel):
    price: float
    recorded_at: datetime


# ---------------------------------------------------------------------------
# Search History
# ---------------------------------------------------------------------------

class SearchHistoryBase(BaseModel):
    product_name: str


class SearchHistoryCreate(SearchHistoryBase):
    pass


class SearchHistoryOut(SearchHistoryBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    searched_at: datetime


# ---------------------------------------------------------------------------
# Composite / dashboard response shapes
# ---------------------------------------------------------------------------

class ProductWithListings(ProductOut):
    """Used by something like GET /products/{id} -- product + all its platform listings."""
    listings: List[ProductListingOut] = []


class ListingWithProduct(ProductListingOut):
    """Used by something like GET /listings -- listing enriched with parent product info."""
    product: ProductOut


class PriceTrendResponse(BaseModel):
    """Response shape for GET /price-trend/{product_id}."""
    product_id: int
    title: str
    platform: str
    points: List[PricePoint]

class BestPriceOut(BaseModel):
    """Response shape for GET /products/{product_id}/best-price."""
    product_id: int
    title: str
    platform: str
    price: float
    product_url: Optional[str] = None
    seller_name: Optional[str] = None
    stock_status: Optional[str] = None

class DealOut(BaseModel):
    """A product with a meaningful cross-platform price gap."""
    product_id: int
    title: str
    image_url: Optional[str] = None
    lowest_price: float
    lowest_platform: str
    highest_price: float
    highest_platform: str
    savings_amount: float
    savings_percent: float

class DashboardStatsOut(BaseModel):
    """Response shape for GET /dashboard/stats -- matches frontend DashboardStats."""
    totalSearches: int
    bestDealsCount: int
    avgSavingsPercent: float
    productsTracked: int
    topDeal: Optional[DealOut] = None
    recentSearches: List[str] = []