from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.product import Product
from app.models.product_price import ProductPrice

router = APIRouter(
    prefix="/price-insights",
    tags=["Price Insights"]
)


@router.get("/{product_id}")
def get_price_insights(
    product_id: str,
    db: Session = Depends(get_db)
):

    # Lookup by ID (if numeric) or slug (if string)
    if product_id.isdigit():
        product = (
            db.query(Product)
            .filter(Product.id == int(product_id))
            .first()
        )
    else:
        product = (
            db.query(Product)
            .filter(Product.slug == product_id)
            .first()
        )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    prices = (
        db.query(ProductPrice)
        .filter(
            ProductPrice.product_id == product_id
        )
        .order_by(
            ProductPrice.recorded_at.asc()
        )
        .all()
    )

    if not prices:
        raise HTTPException(
            status_code=404,
            detail="No price history found"
        )

    price_values = [p.price for p in prices]

    lowest_price = min(price_values)
    highest_price = max(price_values)

    latest_price = prices[-1].price

    average_price = round(
        sum(price_values) / len(price_values),
        2
    )

    price_drop_percentage = round(
        ((highest_price - latest_price) / highest_price) * 100,
        2
    )

    best_deal = (
        db.query(ProductPrice)
        .filter(
            ProductPrice.product_id == product_id
        )
        .order_by(ProductPrice.price.asc())
        .first()
    )

    return {
        "product_id": product.id,
        "product_name": product.title,
        "current_price": latest_price,
        "lowest_price": lowest_price,
        "highest_price": highest_price,
        "average_price": average_price,
        "price_drop_percentage": price_drop_percentage,
        "best_deal": {
            "platform": best_deal.platform,
            "price": best_deal.price
        }
    }