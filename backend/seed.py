import sys
import os
from datetime import datetime, timedelta

# Add backend directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal
from app.models.product import Product
from app.models.product_price import ProductPrice

# Define default catalog products and their pricing histories
default_products = [
    {
        "title": "Sony WH-1000XM5",
        "brand": "Sony",
        "category": "Electronics",
        "slug": "sony-wh-1000xm5",
        "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuDQsij4ZSEx5E-7dcr5LkoEep85mejKr7gi0fPqSl9f90kOtkW2TC2lHopbtbkebKnIo_c40aftx-FQPLuOFWXrdOWvBx4wgho2IW16m2ipG1qLkZvvS4ZlPxB1T2R7N_YLznEiIgEQfnT2VTPbfSwDjR0HAlCF93g2Pg-acuB3yQGN5h5XhK6RjUpIVBWkljWNPWcsGFnsdJHtuymVf1RpxdBaJIuyKmPUrn-LiQqtxVmVGzogiurwKryfDMpUlVO4dUQAKVSHJe3B",
        "prices": [
            # Platform, Price, Days Ago
            ("Amazon", 359.00, 30),
            ("Best Buy", 348.00, 20),
            ("Walmart", 329.00, 5),
            ("Amazon", 299.00, 0),
            ("TechWarehouse", 341.99, 0),
            ("Best Buy", 348.00, 0),
            ("B&H Photo", 349.99, 0),
            ("Walmart", 329.00, 0)
        ]
    },
    {
        "title": "iPhone 15 Pro",
        "brand": "Apple",
        "category": "Electronics",
        "slug": "iphone-15-pro",
        "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuDpCqCwlUls0yM2rhMeqCVu8W2At5jma0KGBccOP6IQYdCBclYuT9uiQyD3JC7-2klP7c-QAUqFViILJn6_bY8K2qVnAovE66lo4ah-SE9nH6hvzZOI711rMs9lOpCNQuvADyavOOWo1mW3vLRHN9fshRyyQYOVHV9M8aR9yT02iISsSknZuHlC_jAQzXbD0iMujMxh--R6ymPQYVXeUTCO2qvIvaf7Ldwu0_VYNcCrdN9kz8e8ENqPRrHYKBMRYWtlkqXLgRwSDx6E",
        "prices": [
            ("Amazon", 1049.00, 30),
            ("Walmart", 1019.00, 15),
            ("Amazon", 999.00, 10),
            ("Walmart", 989.00, 0),
            ("Amazon", 999.00, 0),
            ("Best Buy", 1049.00, 0),
            ("eBay", 950.00, 0)
        ]
    },
    {
        "title": "iPad Pro 12.9\"",
        "brand": "Apple",
        "category": "Electronics",
        "slug": "ipad-pro-12-9",
        "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuDnUDzW4611zF3x9SSTO-XpgrAN6u-3fn9Lh4Ye7Lf8SZj_nsN3cjGnXBb6P9aNXyCC5rPccJ9DHT5msYqIaUwAqZbBtvCCeNm0jKswoA0jXuYOJ8oWpftVnhvnwquGWBz74qgl--RUX3SxiyokKABqCtM_YwNCX-tYymYWZPhtq9CIJVKFm-iPWQmp4naqISxXgGFsDzQnmpzJ30euw4R1t_qpuF-5UdFWxDc6131LS4Y56Z7WKK7_HoxWgJlruJaxXjO0RzsbJuI5",
        "prices": [
            ("Apple Store", 1149.00, 30),
            ("Amazon", 1129.00, 20),
            ("Apple Store", 1099.00, 0),
            ("Amazon", 1079.00, 0),
            ("Best Buy", 1129.00, 0)
        ]
    },
    {
        "title": "MacBook Air M3",
        "brand": "Apple",
        "category": "Electronics",
        "slug": "macbook-air-m3",
        "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuB0Ld8zbRU5IjZch_9Ixt21qFS1blv6WU58Izjsx75ZM2Mfc_X4gNR8zajCzze6UuZ9ds7XkwBjVE5YuyAi31B1gxAJLBSXSDW9XUroLi9O3Tv9xaG6wUk_H4haYOJ_9gmpKef3fzGB1J2MEUM57rGTSGEATKofUEa256b9OFjo1EjtdKarsluFhrer6pJVdyDr68C3beLEh9dLOcTsABX81uEGLImq-7egrwLMCnsXw9tHRo_lfreAoqfI0iYZohkEww4gmLR5tVdr",
        "prices": [
            ("Amazon", 1099.00, 30),
            ("Best Buy", 1049.00, 20),
            ("Amazon", 999.00, 15),
            ("TechWarehouse", 949.00, 0),
            ("Amazon", 979.00, 0),
            ("Best Buy", 999.00, 0)
        ]
    },
    {
        "title": "PlayStation 5 Slim",
        "brand": "Sony",
        "category": "Electronics",
        "slug": "playstation-5-slim",
        "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuAH-LCGaxnR5PsHI7koII9tDFIIYTqTL8fPk2GZvTs_O1cJxG7R5iYNQJ3U5mvVcUW7SpXg-gNqBMMCO6q7k1crKZjg5kUKuSRwu9GZo7U16eyxhoGqfgPFfa4ZZbyxZqTyuBMXbfumHuWqt9m2D1105B0KlKWNkQoYce3EE4DPUr7tSKhnaSJv6xW7jAd_vtPtkWSkushbahOIFzO5ZXRIXOJUBPfeDGDO0gJZSIHMm2ZVRla_JC-lsFezAd5X7M13KOLjeA0lT98c",
        "prices": [
            ("Amazon", 499.00, 30),
            ("Best Buy", 479.00, 20),
            ("Amazon", 459.00, 10),
            ("Amazon", 449.00, 0),
            ("Best Buy", 459.00, 0),
            ("Walmart", 469.00, 0)
        ]
    },
    {
        "title": "Nike Air Max",
        "brand": "Nike",
        "category": "Footwear",
        "slug": "nike-air-max",
        "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuCMpwfFsT0-S6P06YUxontzkv6ETCjYTYk0_hw7wcO5TrpKQ1HRqAIC9hx5gdXVlW712gN_J4cb3BY7T30YLsrHy4k1xaFOkiQnHMnPpFCiOGJ80Jzq4Wlg18kBeoRIlzlgKxcvm1rpFQIM3UE8sin5QvqaDxo0m9v_mNpkqWeF0GUosi9LEbWAjYoHhYJAexqd0Pbv0ZAABcnVFItYMslUXf2qBdvh2t0yDQEXsX2iqiPYdLhayT_YED9tqk3LqcLNHp_D9f080Fw6",
        "prices": [
            ("Nike Store", 149.00, 30),
            ("Amazon", 140.00, 20),
            ("Foot Locker", 130.00, 15),
            ("Amazon", 112.00, 0),
            ("Nike Store", 130.00, 0),
            ("Foot Locker", 115.00, 0)
        ]
    },
    {
        "title": "Smart Watch V3",
        "brand": "Fossil",
        "category": "Electronics",
        "slug": "smart-watch-v3",
        "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuD0PqNQNS_V6gMfz9qM7oCAmtKKoIvWNi15YmdRy3Z83rWMn7kW1iVbAHMa_Gcu2f9sI7r0sTnp4u_iO4syGCtbKgzXokkMvQzqNxeV6cy7yG6HT9vXHmSylX7nPzBooZTt0pB9t8nhK59aE_F6RkSdrqf8i1w6BXx2ygD75al91MZDJlOtdDfbA-225PJe0Wfcvud5WvxaE_7D63mTTa8CEUcN5RPtvyoOXl5bCUql23wN1FFMN7ZyPtKbboENBpbeGyKL8EaVBPRe",
        "prices": [
            ("Best Buy", 249.00, 30),
            ("Amazon", 229.00, 15),
            ("Best Buy", 199.00, 0),
            ("Amazon", 215.00, 0)
        ]
    },
    {
        "title": "iPhone 14",
        "brand": "Apple",
        "category": "Electronics",
        "slug": "iphone-14",
        "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuAFqYKSlxz4jC1duMw0WDWBv47NESBiLFt286vrEEP7CgBZHmoFVTVgmpN09pqUJhXeISluC9KdhsexXC-ZH3ixy1fdmD9fhwoVA7zipOBnL2gEpBxnxDMO85Y6HW80aJojluIwHmESXdDN8wLcRnxwxcIb_wA6fHg8CUin3vEy-STfNIwrtg1sq3U14yjPP0oO69aOPAFg-OzodCYFlY4GtM3RVxFTkmv1_V9qbk7mFaJeYiEdLch1R9NjwAeuN27L2NJj7EXyMHg1",
        "prices": [
            ("Walmart", 799.00, 30),
            ("Walmart", 699.00, 0)
        ]
    },
    {
        "title": "Galaxy S23",
        "brand": "Samsung",
        "category": "Electronics",
        "slug": "galaxy-s23",
        "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuCiD5eFLuXl6L5fE_ELnHd9S1o0gqPcGxkUsqogttF99rmEsgzPe-7h8lAaZRYPiL68SqDWNAuWiUvYH642-mjlFKJURU1FpKibV3vQ7P4VXUygBl8AK6wy3lY2y4W35ZsWsX0OjN7liCUaQAS9TOZGp9fmOUBC8EvZW2tU2zf98brUaAQToSF2lFPpmANZfFeFvsCxTf8s5HmyjrJrvgMdRDa3ym9RCDoMWIRw3ler8JJuP3b60iTHK6_30qZ7bMe0vKnLQ7MEgzwA",
        "prices": [
            ("Amazon", 899.00, 30),
            ("Amazon", 799.00, 0)
        ]
    },
    {
        "title": "Pixel 8",
        "brand": "Google",
        "category": "Electronics",
        "slug": "pixel-8",
        "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuB64ze-pFKC1DkBWZtHSKZIq_XcUhYqgzUj7rSRMLpzvqN8I5mg29J0W89NicrIFTx3I_hiBVNlaaWr4cauY9zkqFH9D5cYNGQfKEbh50gK46JqzPjiJ2pKpTYbNk2JqMvWpKYMil8dLWsgoCHGxS1d2mDBlhbLK6VRiG2dnJyJh9t6udEkp02dvByX06dho5oKn6NUmJAXhbkppMyitWxpi6jhDLEGU1fQfSy7g3i68a3iMm93hcQZW_oSLNC09a2tvyqarZYnqFv_",
        "prices": [
            ("Amazon", 699.00, 30),
            ("Amazon", 649.00, 0)
        ]
    }
]

def seed_database():
    db = SessionLocal()
    try:
        # Check if products table has any entries
        product_count = db.query(Product).count()
        if product_count > 0:
            print(f"Database already contains {product_count} products. Skipping seeding.")
            return

        print("Products table is empty. Starting database seeding...")
        
        # Populate database
        for prod_data in default_products:
            product = Product(
                title=prod_data["title"],
                brand=prod_data["brand"],
                category=prod_data["category"],
                slug=prod_data["slug"],
                image_url=prod_data["image_url"]
            )
            db.add(product)
            db.flush() # Flush to assign product.id
            
            # Add prices
            for platform, price, days_ago in prod_data["prices"]:
                recorded_at = datetime.utcnow() - timedelta(days=days_ago)
                price_record = ProductPrice(
                    product_id=product.id,
                    platform=platform,
                    price=price,
                    recorded_at=recorded_at
                )
                db.add(price_record)
                
        db.commit()
        print("Successfully seeded all products and product prices!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
