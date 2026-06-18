from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.search_history import SearchHistory
from app.models.product import Product
from app.models.product_price import ProductPrice

router = APIRouter(
    prefix="/search",
    tags=["Search"]
)


@router.get("/")
def search(
    query: str,
    db: Session = Depends(get_db)
):
    # Search product by title or slug
    product = (
        db.query(Product)
        .filter(
            (Product.title.ilike(f"%{query}%")) |
            (Product.slug.ilike(f"%{query}%"))
        )
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    # Save to search history
    history = SearchHistory(
        product_name=product.title
    )
    db.add(history)
    db.commit()

    # Get all prices
    prices = (
        db.query(ProductPrice)
        .filter(ProductPrice.product_id == product.id)
        .order_by(ProductPrice.recorded_at.desc())
        .all()
    )

    latest_prices = {}

    for price in prices:
        if price.platform not in latest_prices:
            latest_prices[price.platform] = {
                "platform": price.platform,
                "price": price.price,
                "recorded_at": price.recorded_at
            }

    return {
        "product_id": product.id,
        "title": product.title,
        "category": product.category,
        "slug": product.slug,
        "image_url": product.image_url,
        "brand": product.brand,
        "prices": list(latest_prices.values())
    }


# Search Suggestions Endpoint
@router.get("/suggestions")
def get_suggestions(
    query: str,
    db: Session = Depends(get_db)
):

    products = (
        db.query(Product)
        .filter(
            (Product.title.ilike(f"%{query}%")) |
            (Product.slug.ilike(f"%{query}%"))
        )
        .limit(5)
        .all()
    )

    return [product.title for product in products]