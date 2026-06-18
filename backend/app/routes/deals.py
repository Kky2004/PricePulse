from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.search_services import search_product
from app.services.recommendation import get_best_deal

router = APIRouter(
    prefix="/best-deal",
    tags=["Best Deal"]
)

@router.get("/")
def best_deal(
    product: str,
    db: Session = Depends(get_db)
):

    prices = search_product(db, product)

    best = get_best_deal(prices)

    return {
        "product": product,
        "best_deal": best
    }