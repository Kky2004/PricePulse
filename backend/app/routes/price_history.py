"""
Routes for price_history -- powers the trend charts on the dashboard.

Each row is one price point recorded over time for a specific listing
(a product on a specific platform). The headline endpoint here,
GET /price-trend/{product_id}, returns one trend line per platform
so the dashboard can plot Amazon vs Flipkart vs Meesho on the same chart.
"""

from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.model import Product, ProductListing, PriceHistory
from app.schemas.product_schema import (
    PriceHistoryCreate,
    PriceHistoryOut,
    PricePoint,
    PriceTrendResponse,
)

router = APIRouter(tags=["price-history"])


@router.post("/price-history", response_model=PriceHistoryOut, status_code=201)
def log_price_point(entry: PriceHistoryCreate, db: Session = Depends(get_db)):
    """
    Record a new price point for a listing -- called by your scraping
    pipeline every time it checks a platform's price.
    """
    listing = (
        db.query(ProductListing)
        .filter(ProductListing.id == entry.product_listing_id)
        .first()
    )
    if not listing:
        raise HTTPException(
            status_code=404,
            detail=f"Listing {entry.product_listing_id} not found",
        )

    new_entry = PriceHistory(**entry.model_dump())
    db.add(new_entry)

    # Keep the listing's current price in sync with the latest recorded point
    listing.price = entry.price

    db.commit()
    db.refresh(new_entry)
    return new_entry


@router.get("/listings/{listing_id}/price-history", response_model=List[PriceHistoryOut])
def get_listing_price_history(
    listing_id: int,
    limit: int = Query(100, le=1000),
    db: Session = Depends(get_db),
):
    """Raw price history for one specific platform listing, oldest first."""
    listing = db.query(ProductListing).filter(ProductListing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    return (
        db.query(PriceHistory)
        .filter(PriceHistory.product_listing_id == listing_id)
        .order_by(PriceHistory.recorded_at.asc())
        .limit(limit)
        .all()
    )


@router.get("/price-trend/{product_id}", response_model=List[PriceTrendResponse])
def get_price_trend(product_id: int, db: Session = Depends(get_db)):
    """
    Full price trend for a product -- one trend line per platform it's
    listed on. This is the endpoint your trend chart component calls.
    """
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    listings = (
        db.query(ProductListing)
        .filter(ProductListing.product_id == product_id)
        .all()
    )
    if not listings:
        raise HTTPException(status_code=404, detail="No listings found for this product")

    trends: List[PriceTrendResponse] = []
    for listing in listings:
        history = (
            db.query(PriceHistory)
            .filter(PriceHistory.product_listing_id == listing.id)
            .order_by(PriceHistory.recorded_at.asc())
            .all()
        )
        trends.append(
            PriceTrendResponse(
                product_id=product.id,
                title=product.title,
                platform=listing.platform,
                points=[PricePoint(price=h.price, recorded_at=h.recorded_at) for h in history],
            )
        )

    return trends

@router.get("/price-trends", response_model=List[PriceTrendResponse])
def get_all_price_trends(db: Session = Depends(get_db)):
    """
    Bulk version of /price-trend/{product_id} -- returns trend lines for
    EVERY product/platform combination in two queries total, instead of
    forcing the frontend to call /price-trend/{id} once per product.
    Powers the Trends view's product selector + Market Movers panel.
    """
    listings = db.query(ProductListing).all()
    if not listings:
        return []
 
    listing_ids = [l.id for l in listings]
    all_history = (
        db.query(PriceHistory)
        .filter(PriceHistory.product_listing_id.in_(listing_ids))
        .order_by(PriceHistory.recorded_at.asc())
        .all()
    )
 
    # Group history by listing_id for O(1) lookup while building trends
    history_by_listing: dict[int, List[PriceHistory]] = {}
    for h in all_history:
        history_by_listing.setdefault(h.product_listing_id, []).append(h)
 
    # Need product titles -- one query instead of N
    product_ids = {l.product_id for l in listings}
    products = db.query(Product).filter(Product.id.in_(product_ids)).all()
    title_by_id = {p.id: p.title for p in products}
 
    trends: List[PriceTrendResponse] = []
    for listing in listings:
        history = history_by_listing.get(listing.id, [])
        trends.append(
            PriceTrendResponse(
                product_id=listing.product_id,
                title=title_by_id.get(listing.product_id, ""),
                platform=listing.platform,
                points=[PricePoint(price=h.price, recorded_at=h.recorded_at) for h in history],
            )
        )
 
    return trends