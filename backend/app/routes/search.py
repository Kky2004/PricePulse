from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.model import SearchHistory, Product, ProductListing

router = APIRouter(
    prefix="/search",
    tags=["Search"],
)


@router.get("/")
def search(
    query: str = Query(..., min_length=1, description="Search term (product title or slug)"),
    limit: int = Query(10, le=50),
    db: Session = Depends(get_db),
):
    """
    Search products by title or slug. Returns a LIST of matches (not just
    one), each with the latest price per platform.
    """
    products = (
        db.query(Product)
        .filter(
            (Product.title.ilike(f"%{query}%")) |
            (Product.slug.ilike(f"%{query}%"))
        )
        .limit(limit)
        .all()
    )

    # Log the search regardless of whether it matched anything --
    # log the raw query the user typed, not a derived product title.
    history = SearchHistory(product_name=query)
    db.add(history)
    db.commit()

    if not products:
        return []

    results = []
    for product in products:
        listings = (
            db.query(ProductListing)
            .filter(ProductListing.product_id == product.id)
            .order_by(ProductListing.recorded_at.desc())
            .all()
        )

        latest_prices = {}
        for listing in listings:
            if listing.platform not in latest_prices:
                latest_prices[listing.platform] = {
                    "platform": listing.platform,
                    "price": listing.price,
                    "stock_status": listing.stock_status,
                    "seller_name": listing.seller_name,
                    "product_url": listing.product_url,
                    "recorded_at": listing.recorded_at,
                }

        results.append({
            "product_id": product.id,
            "title": product.title,
            "category": product.category,
            "slug": product.slug,
            "image_url": product.image_url,
            "brand": product.brand,
            "prices": list(latest_prices.values()),
        })

    return results


@router.get("/suggestions")
def get_suggestions(
    query: str = Query(..., min_length=1),
    limit: int = Query(5, le=20),
    db: Session = Depends(get_db),
):
    """Lightweight autocomplete -- titles only, no DB write, no price lookup."""
    products = (
        db.query(Product)
        .filter(
            (Product.title.ilike(f"%{query}%")) |
            (Product.slug.ilike(f"%{query}%"))
        )
        .limit(limit)
        .all()
    )

    return [{"id": p.id, "title": p.title, "slug": p.slug} for p in products]