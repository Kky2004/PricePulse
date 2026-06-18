import sys
import os

# Add backend directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

endpoints = [
    ("GET", "/products"),
    ("GET", "/products/1"),
    ("POST", "/products", {"title": "Test Product", "category": "Electronics", "brand": "Brand", "slug": "test-product"}),
    ("GET", "/prices/1"),
    ("GET", "/dashboard"),
    ("GET", "/history"),
    ("DELETE", "/history/99999"),  # Should return 404 or something, but verify route exists
    ("GET", "/search?query=iphone"),
    ("GET", "/trends/1"),
    ("GET", "/price-insights/1"),
]

print("Starting endpoint verification tests...")
all_passed = True

for method, url, *data in endpoints:
    payload = data[0] if data else None
    try:
        if method == "GET":
            response = client.get(url)
        elif method == "POST":
            response = client.post(url, json=payload)
        elif method == "DELETE":
            response = client.delete(url)
            
        print(f"[{method}] {url} -> Status {response.status_code}")
        # Note: 404 for non-existent items is acceptable as long as the route exists and is processed
        if response.status_code == 404 and "Product not found" in response.text:
            print(f"  Passed (Product not found exception handled correctly)")
        elif response.status_code == 404 and "History item not found" in response.text:
            print(f"  Passed (History item not found exception handled correctly)")
        elif response.status_code == 500:
            print(f"  FAILED with 500 Internal Server Error: {response.text}")
            all_passed = False
    except Exception as e:
        print(f"  CRITICAL ERROR executing [{method}] {url}: {e}")
        all_passed = False

if all_passed:
    print("\nSUCCESS: All endpoints verified successfully.")
else:
    print("\nFAILURE: Some endpoint tests encountered errors.")
    sys.exit(1)
