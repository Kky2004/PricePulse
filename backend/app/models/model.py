"""
SQLAlchemy ORM models for the Store Intelligence / Price Tracker schema.

These map 1:1 to the four CSVs:
    products.csv          -> Product
    product_listings.csv  -> ProductListing
    price_history.csv     -> PriceHistory
    search_history.csv    -> SearchHistory

Works against Supabase (Postgres) or local SQLite — only the DATABASE_URL
in db.py changes between the two.
"""

from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Text,
    DateTime,
    ForeignKey,
    func,
)
from sqlalchemy.orm import relationship
from app.database import Base


class Product(Base):
    """One row per unique product (no duplication across platforms)."""

    __tablename__ = "products"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    brand = Column(String, nullable=False)          # Apple, Samsung, Sony...
    category = Column(String, nullable=False)        # Mobile, Laptop, Headphones...
    description = Column(Text, nullable=True)
    image_url = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now())

    # one product -> many platform listings
    listings = relationship(
        "ProductListing",
        back_populates="product",
        cascade="all, delete-orphan",
    )

    def __repr__(self) -> str:
        return f"<Product id={self.id} title={self.title!r}>"


class ProductListing(Base):
    """A product as it appears on a specific platform (Amazon/Flipkart/Meesho...)."""

    __tablename__ = "product_listings"

    id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True)
    platform = Column(String, nullable=False)         # Amazon / Flipkart / Meesho
    price = Column(Float, nullable=False)
    rating = Column(Float, nullable=True)
    reviews_count = Column(Integer, nullable=True)
    stock_status = Column(String, nullable=True)       # "In Stock" / "Out of Stock"
    product_url = Column(Text, nullable=True)
    seller_name = Column(String, nullable=True)
    recorded_at = Column(DateTime, server_default=func.now())

    product = relationship("Product", back_populates="listings")
    price_history = relationship(
        "PriceHistory",
        back_populates="listing",
        cascade="all, delete-orphan",
    )

    def __repr__(self) -> str:
        return f"<ProductListing id={self.id} product_id={self.product_id} platform={self.platform!r} price={self.price}>"


class PriceHistory(Base):
    """Time-series price points per listing, used for trend charts."""

    __tablename__ = "price_history"

    id = Column(Integer, primary_key=True, autoincrement=True)
    product_listing_id = Column(
        Integer,
        ForeignKey("product_listings.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    price = Column(Float, nullable=False)
    recorded_at = Column(DateTime, server_default=func.now())

    listing = relationship("ProductListing", back_populates="price_history")

    def __repr__(self) -> str:
        return f"<PriceHistory id={self.id} listing_id={self.product_listing_id} price={self.price}>"


class SearchHistory(Base):
    """Logs what users search for, e.g. for trending-search widgets."""

    __tablename__ = "search_history"

    id = Column(Integer, primary_key=True, autoincrement=True)
    product_name = Column(String, nullable=False)
    searched_at = Column(DateTime, server_default=func.now())

    def __repr__(self) -> str:
        return f"<SearchHistory id={self.id} product_name={self.product_name!r}>"