from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import re

from app.database import get_db
from app.models.product import Product
from app.models.product_price import ProductPrice
from app.schemas.product_schema import (
    ProductCreate,
    ProductResponse
)

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text


@router.get("/")
def get_products(
    db: Session = Depends(get_db)
):
    return db.query(Product).all()


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
        slug=product_slug
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
            .filter(Product.slug == product_id)
            .first()
        )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product


