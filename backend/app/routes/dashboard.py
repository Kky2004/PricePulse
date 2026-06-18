from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db

from app.models.product import Product
from app.models.product_price import ProductPrice
from app.models.search_history import SearchHistory

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def dashboard_overview(
    db: Session = Depends(get_db)
):

    total_searches = db.query(SearchHistory).count()

    total_products = db.query(Product).count()

    total_price_records = db.query(ProductPrice).count()

    lowest_price = (
        db.query(ProductPrice)
        .order_by(ProductPrice.price.asc())
        .first()
    )

    highest_price = (
        db.query(ProductPrice)
        .order_by(ProductPrice.price.desc())
        .first()
    )

    recent_searches = (
        db.query(SearchHistory)
        .order_by(SearchHistory.searched_at.desc())
        .limit(5)
        .all()
    )

    return {
        "statistics": {
            "total_searches": total_searches,
            "total_products": total_products,
            "total_price_records": total_price_records
        },

        "best_deal": {
            "platform": lowest_price.platform,
            "price": lowest_price.price
        } if lowest_price else None,

        "highest_price_found": {
            "platform": highest_price.platform,
            "price": highest_price.price
        } if highest_price else None,

        "recent_searches": [
            {
                "product_name": item.product_name,
                "searched_at": item.searched_at
            }
            for item in recent_searches
        ]
    }