from sqlalchemy.orm import Session
from app.models.product import Product
from app.models.product_price import ProductPrice

def search_product(db: Session, product_name: str):
    # Find the product matching the name case-insensitively
    product = (
        db.query(Product)
        .filter(Product.title.ilike(f"%{product_name}%"))
        .first()
    )
    if not product:
        # Fallback to search slug if not found by title
        product = (
            db.query(Product)
            .filter(Product.slug.ilike(f"%{product_name}%"))
            .first()
        )

    if not product:
        return []

    # Get the recorded prices
    prices = (
        db.query(ProductPrice)
        .filter(ProductPrice.product_id == product.id)
        .all()
    )

    return [
        {
            "platform": p.platform,
            "price": p.price
        }
        for p in prices
    ]