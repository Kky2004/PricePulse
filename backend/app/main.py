from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.test_db import router as test_router
from app.routes.product import router as product_router
from app.routes.history import router as history_router
from app.routes.price_history import router as price_router
from app.routes.search import router as search_router
from app.routes.dashboard import router as dashboard_router
from app.routes.deals import router as deals_router
from app.routes.auth import router as auth_router
from app.routes.listings import router as listings_router

from app.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Compare Kart",
    description="Smart Product Price Comparison Backend",
    version="1.0.0"
)

# Add CORS middleware FIRST (before routers)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    https://pricepulse-2-pdf5.onrender.com/
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(test_router)
app.include_router(product_router)
app.include_router(history_router)
app.include_router(price_router)
app.include_router(search_router)
app.include_router(dashboard_router)
app.include_router(deals_router)
app.include_router(auth_router)
app.include_router(listings_router)

@app.get("/")
def home():
    return {
        "message": "CompareKart API Running Successfully"
    }

