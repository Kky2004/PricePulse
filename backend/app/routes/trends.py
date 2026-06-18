from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.product import Product
from app.models.product_price import ProductPrice

router = APIRouter(
    prefix="/trends",
    tags=["Price Trends"]
)

@router.get("/{product_id}")
def price_trend(
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
            ProductPrice.product_id == product.id
        )
        .order_by(
            ProductPrice.recorded_at.asc()
        )
        .all()
    )

    return {
        "product_id": product.id,
        "product_name": product.title,
        "price_history": [
            {
                "platform": price.platform,
                "price": price.price,
                "date": price.recorded_at
            }
            for price in prices
        ]
    }