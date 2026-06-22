from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.model import (
    SearchHistory
)

router = APIRouter(
    prefix="/history",
    tags=["Search History"]
)


@router.post("/{product_name}")
def save_search(
    product_name: str,
    db: Session = Depends(get_db)
):

    search = SearchHistory(
        product_name=product_name
    )

    db.add(search)
    db.commit()

    return {
        "message": "Search saved"
    }


@router.get("/")
def get_history(
    db: Session = Depends(get_db)
):

    history = (
        db.query(SearchHistory)
        .order_by(
            SearchHistory.searched_at.desc()
        )
        .all()
    )

    return history


@router.delete("/{id}")
def delete_history_item(
    id: int,
    db: Session = Depends(get_db)
):
    item = db.query(SearchHistory).filter(SearchHistory.id == id).first()
    if not item:
        raise HTTPException(
            status_code=404,
            detail="History item not found"
        )
    db.delete(item)
    db.commit()
    return {
        "message": "History item deleted successfully"
    }