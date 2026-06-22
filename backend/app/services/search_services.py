from typing import List, Dict, Any

from sqlalchemy.orm import Session

from app.models.model import Product, ProductListing


def search_product(db: Session, product_name: str, limit: int = 10) -> List[Dict[str, Any]]:
    
    products = (
        db.query(Product)
        .filter(
            (Product.title.ilike(f"%{product_name}%")) |
            (Product.slug.ilike(f"%{product_name}%"))
        )
        .limit(limit)
        .all()
    )

    if not products:
        return []

    results = []
    for product in products:
        listings = (
            db.query(ProductListing)
            .filter(ProductListing.product_id == product.id)
            .order_by(ProductListing.recorded_at.desc())
            .all()
        )

        
        latest_by_platform: Dict[str, Dict[str, Any]] = {}
        for listing in listings:
            if listing.platform not in latest_by_platform:
                latest_by_platform[listing.platform] = {
                    "platform": listing.platform,
                    "price": listing.price,
                    "stock_status": listing.stock_status,
                    "seller_name": listing.seller_name,
                    "product_url": listing.product_url,
                    "recorded_at": listing.recorded_at,
                }

        results.append({
            "product_id": product.id,
            "title": product.title,
            "slug": product.slug,
            "brand": product.brand,
            "category": product.category,
            "image_url": product.image_url,
            "prices": list(latest_by_platform.values()),
        })

    return results