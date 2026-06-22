from typing import List

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.model import Product, ProductListing, SearchHistory
from app.schemas.product_schema import DashboardStatsOut, DealOut

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


MIN_SAVINGS_PERCENT_FOR_DEAL = 5.0


def _compute_deals(db: Session) -> List[DealOut]:
    
    products = db.query(Product).all()
    deals: List[DealOut] = []

    for product in products:
        listings = (
            db.query(ProductListing)
            .filter(ProductListing.product_id == product.id)
            .all()
        )
        if len(listings) < 2:
            continue  # need at least 2 platforms to compare

        cheapest = min(listings, key=lambda l: l.price)
        priciest = max(listings, key=lambda l: l.price)

        if cheapest.price <= 0:
            continue  # guard against bad data / division by zero

        savings_amount = priciest.price - cheapest.price
        savings_percent = (savings_amount / priciest.price) * 100

        if savings_percent >= MIN_SAVINGS_PERCENT_FOR_DEAL:
            deals.append(
                DealOut(
                    product_id=product.id,
                    title=product.title,
                    image_url=product.image_url,
                    lowest_price=cheapest.price,
                    lowest_platform=cheapest.platform,
                    highest_price=priciest.price,
                    highest_platform=priciest.platform,
                    savings_amount=round(savings_amount, 2),
                    savings_percent=round(savings_percent, 2),
                )
            )

    deals.sort(key=lambda d: d.savings_percent, reverse=True)
    return deals


@router.get("/stats", response_model=DashboardStatsOut)
def dashboard_stats(db: Session = Depends(get_db)):
    
    total_searches = db.query(SearchHistory).count()
    products_tracked = db.query(Product).count()

    deals = _compute_deals(db)
    best_deals_count = len(deals)
    avg_savings_percent = (
        round(sum(d.savings_percent for d in deals) / len(deals), 2)
        if deals
        else 0.0
    )
    top_deal = deals[0] if deals else None

    recent_searches = (
        db.query(SearchHistory)
        .order_by(SearchHistory.searched_at.desc())
        .limit(5)
        .all()
    )

    return DashboardStatsOut(
        totalSearches=total_searches,
        bestDealsCount=best_deals_count,
        avgSavingsPercent=avg_savings_percent,
        productsTracked=products_tracked,
        topDeal=top_deal,
        recentSearches=[s.product_name for s in recent_searches],
    )


@router.get("/best-deals", response_model=List[DealOut])
def best_deals(
    limit: int = Query(10, le=50),
    db: Session = Depends(get_db),
):
    """
    Full ranked list of deals -- products with the largest cross-platform
    price gap, biggest savings first. Powers a 'Best Deals' page/section.
    """
    return _compute_deals(db)[:limit]


@router.get("/category-summary")
def category_summary(db: Session = Depends(get_db)):
    """Product count and average lowest-price per category, for a breakdown widget."""
    rows = (
        db.query(
            Product.category,
            func.count(func.distinct(Product.id)).label("product_count"),
        )
        .group_by(Product.category)
        .all()
    )
    return [{"category": r.category, "product_count": r.product_count} for r in rows]