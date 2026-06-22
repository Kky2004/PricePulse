"""
Routes for product_listings -- the most important table in the schema.

A "listing" is a product as it appears on one specific platform
(Amazon / Flipkart / Meesho), with that platform's price, stock status,
seller, and rating. This is what powers cross-platform price comparison
on the dashboard.
"""

from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.model import Product, ProductListing
from app.schemas.product_schema import (
    ProductListingCreate,
    ProductListingOut,
    ListingWithProduct,
    BestPriceOut,
)

router = APIRouter(prefix="/listings", tags=["listings"])


@router.get("", response_model=List[ListingWithProduct])
def get_listings(
    platform: Optional[str] = Query(None, description="Filter by platform, e.g. Amazon"),
    stock_status: Optional[str] = Query(None, description="Filter by 'In Stock' or 'Out of Stock'"),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """All listings, optionally filtered by platform/stock status. Each row includes its parent product."""
    query = db.query(ProductListing)

    if platform:
        query = query.filter(ProductListing.platform == platform)
    if stock_status:
        query = query.filter(ProductListing.stock_status == stock_status)

    return query.offset(skip).limit(limit).all()


@router.get("/{listing_id}", response_model=ListingWithProduct)
def get_listing(listing_id: int, db: Session = Depends(get_db)):
    """Single listing detail, including its parent product."""
    listing = db.query(ProductListing).filter(ProductListing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    return listing


@router.post("", response_model=ProductListingOut, status_code=201)
def create_listing(listing: ProductListingCreate, db: Session = Depends(get_db)):
    """
    Add a new listing -- e.g. when your scraper finds a product on a
    platform it wasn't tracked on before. Validates the parent product exists.
    """
    product = db.query(Product).filter(Product.id == listing.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail=f"Product {listing.product_id} not found")

    new_listing = ProductListing(**listing.model_dump())
    db.add(new_listing)
    db.commit()
    db.refresh(new_listing)
    return new_listing


@router.put("/{listing_id}", response_model=ProductListingOut)
def update_listing(listing_id: int, listing: ProductListingCreate, db: Session = Depends(get_db)):
    """
    Update a listing -- typically called by your scraping pipeline when it
    re-checks a platform and finds a new price, stock status, or rating.
    """
    existing = db.query(ProductListing).filter(ProductListing.id == listing_id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Listing not found")

    for field, value in listing.model_dump().items():
        setattr(existing, field, value)

    db.commit()
    db.refresh(existing)
    return existing


@router.delete("/{listing_id}", status_code=204)
def delete_listing(listing_id: int, db: Session = Depends(get_db)):
    """Remove a listing, e.g. when a product is delisted from a platform."""
    existing = db.query(ProductListing).filter(ProductListing.id == listing_id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Listing not found")

    db.delete(existing)
    db.commit()
    return None


# ---------------------------------------------------------------------------
# Product-scoped listing routes
# (mount these in main.py alongside /products, or include here -- see note below)
# ---------------------------------------------------------------------------


@router.get(
    "/product/{product_id}",
    response_model=List[ProductListingOut]
)
def get_product_listings(
    product_id: int,
    db: Session = Depends(get_db)
):
    return (
        db.query(ProductListing)
        .filter(ProductListing.product_id == product_id)
        .order_by(ProductListing.price.asc())
        .all()
    )


@router.get(
    "/product/{product_id}/best-price",
    response_model=BestPriceOut
)
def get_best_price(
    product_id: int,
    db: Session = Depends(get_db)
):
    cheapest = (
        db.query(ProductListing)
        .filter(ProductListing.product_id == product_id)
        .order_by(ProductListing.price.asc())
        .first()
    )

    if not cheapest:
        raise HTTPException(
            status_code=404,
            detail="No listings found"
        )

    return BestPriceOut(
        product_id=product_id,
        title=cheapest.product.title,
        platform=cheapest.platform,
        price=cheapest.price,
        product_url=cheapest.product_url,
        seller_name=cheapest.seller_name,
        stock_status=cheapest.stock_status,
    )


