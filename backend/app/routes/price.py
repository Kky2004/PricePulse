from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.product_price import ProductPrice
from app.models.product import Product
from app.schemas.product_schema import (
    PriceCreate,
    PriceResponse
)

router = APIRouter(
    prefix="/prices",
    tags=["Prices"]
)


@router.post(
    "/",
    response_model=PriceResponse
)
def add_price(
    data: PriceCreate,
    db: Session = Depends(get_db)
):

    price = ProductPrice(
        product_id=data.product_id,
        platform=data.platform,
        price=data.price
    )

    db.add(price)
    db.commit()
    db.refresh(price)

    return price


@router.get("/{product_id}")
def get_prices(
    product_id: str,
    db: Session = Depends(get_db)
):
    # Lookup product first to get the numeric product ID
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
        .all()
    )

    return prices


