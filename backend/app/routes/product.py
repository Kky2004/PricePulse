from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import re

from app.database import get_db
from app.models.model import Product,ProductListing
from app.schemas.product_schema import (
    ProductCreate,
    ProductResponse
)

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)





@router.get("/")
def get_products(
    db: Session = Depends(get_db)
):
    return db.query(Product).all()

# FAST DASHBOARD ENDPOINT
@router.get("/with-best-prices")
def get_products_with_best_prices(
    db: Session = Depends(get_db)
):
    products = db.query(Product).all()

    response = []

    for product in products:

        cheapest = (
            db.query(ProductListing)
            .filter(ProductListing.product_id == product.id)
            .order_by(ProductListing.price.asc())
            .first()
        )

        response.append({
            "id": product.id,
            "title": product.title,
            "brand": product.brand,
            "category": product.category,
            "image_url": product.image_url,

            "bestPrice": {
                "price": cheapest.price if cheapest else 0,
                "platform": cheapest.platform if cheapest else "",
                "seller_name": cheapest.seller_name if cheapest else "",
                "product_url": cheapest.product_url if cheapest else "",
            }
        })

    return response


@router.post(
    "/",
    response_model=ProductResponse
)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    product_slug = product.slug or slugify(product.title)
    
    # Check if slug is unique, adjust if not
    existing = db.query(Product).filter(Product.slug == product_slug).first()
    if existing:
        # Append some random sequence or ID representation if slug already exists
        import time
        product_slug = f"{product_slug}-{int(time.time()) % 1000}"

    new_product = Product(
        title=product.title,
        category=product.category,
        image_url=product.image_url,
        brand=product.brand,
        slug=product_slug,
        description=product.description,
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


@router.get("/{product_id}")
def get_product(
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
            .first()
        )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product


