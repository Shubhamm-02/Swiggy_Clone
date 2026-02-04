"""
Swiggy Clone - FastAPI + MongoDB Backend
All routes under /api. Run: uvicorn server:app --host 0.0.0.0 --port 8000
"""
import os
import re
import uuid
from datetime import datetime, timedelta
from typing import Optional

import bcrypt
import jwt
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
import certifi
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "swiggy_clone")
JWT_SECRET = os.getenv("JWT_SECRET", "swiggy_clone_secret_key_2024")
JWT_ALGORITHM = "HS256"
JWT_EXPIRY_HOURS = 24
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*").split(",")

# MongoDB
client: Optional[AsyncIOMotorClient] = None
db = None


def get_db():
    global db
    if db is None:
        raise HTTPException(status_code=500, detail="Database not connected")
    return db


# --- Pydantic models ---
class AddressSchema(BaseModel):
    label: Optional[str] = None
    line1: str
    line2: Optional[str] = None
    city: str
    pincode: str


class UserCreate(BaseModel):
    email: EmailStr
    name: str
    phone: Optional[str] = None
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    phone: Optional[str] = None
    addresses: list
    created_at: str


class TokenResponse(BaseModel):
    token: str
    user: UserResponse


class CartItemAdd(BaseModel):
    restaurant_id: str
    restaurant_name: str
    item_id: str
    name: str
    price: int
    quantity: int
    is_veg: bool
    image: Optional[str] = None


class CartItemUpdate(BaseModel):
    item_id: str
    quantity: int


class PlaceOrderBody(BaseModel):
    delivery_address: dict


# --- Auth helpers ---
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode(), hashed.encode())


def create_token(user_id: str) -> str:
    exp = datetime.utcnow() + timedelta(hours=JWT_EXPIRY_HOURS)
    return jwt.encode(
        {"user_id": user_id, "exp": exp},
        JWT_SECRET,
        algorithm=JWT_ALGORITHM,
    )


def decode_token(token: str) -> Optional[str]:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload.get("user_id")
    except Exception:
        return None


def doc_without_id(doc: dict) -> dict:
    if doc is None:
        return None
    out = dict(doc)
    out.pop("_id", None)
    out["id"] = doc.get("id", str(doc.get("_id", "")))
    return out


async def get_current_user(
    authorization: Optional[str] = None,
    db=Depends(get_db),
):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization.split(" ", 1)[1]
    user_id = decode_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return doc_without_id(user)


# --- App ---
app = FastAPI(title="Swiggy Clone API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter()


@router.get("/")
async def root():
    return {"message": "Swiggy Clone API", "docs": "/docs", "prefix": "/api"}


@router.get("/health")
async def health(db=Depends(get_db)):
    await db.restaurants.find_one()
    return {"status": "ok", "db": "connected"}


# --- Auth routes ---
@router.post("/auth/signup", response_model=TokenResponse)
async def signup(body: UserCreate, db=Depends(get_db)):
    existing = await db.users.find_one({"email": body.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user_id = str(uuid.uuid4())
    now = datetime.utcnow().isoformat() + "Z"
    user = {
        "id": user_id,
        "email": body.email,
        "name": body.name,
        "phone": body.phone,
        "password": hash_password(body.password),
        "addresses": [],
        "created_at": now,
    }
    await db.users.insert_one(user)
    cart = {
        "id": str(uuid.uuid4()),
        "user_id": user_id,
        "restaurant_id": None,
        "restaurant_name": None,
        "items": [],
        "updated_at": now,
    }
    await db.carts.insert_one(cart)
    token = create_token(user_id)
    resp_user = {k: v for k, v in user.items() if k != "password"}
    resp_user["id"] = user_id
    return TokenResponse(token=token, user=UserResponse(**doc_without_id(resp_user)))


@router.post("/auth/login", response_model=TokenResponse)
async def login(body: UserLogin, db=Depends(get_db)):
    user = await db.users.find_one({"email": body.email})
    if not user or not verify_password(body.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_token(user["id"])
    resp_user = {k: v for k, v in user.items() if k != "password"}
    return TokenResponse(token=token, user=UserResponse(**doc_without_id(resp_user)))


@router.get("/auth/me", response_model=UserResponse)
async def get_me(user=Depends(get_current_user)):
    return UserResponse(**user)


# --- Restaurants ---
@router.get("/restaurants")
async def list_restaurants(
    cuisine: Optional[str] = Query(None),
    veg_only: Optional[bool] = Query(None),
    search: Optional[str] = Query(None),
    sort_by: Optional[str] = Query(None),
    db=Depends(get_db),
):
    q = {"is_open": True}
    if cuisine:
        # Filter where cuisines array contains this value (exact match)
        q["cuisines"] = cuisine
    if veg_only is True:
        q["veg_only"] = True
    if search:
        q["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"cuisines": {"$regex": search, "$options": "i"}},
        ]
    cursor = db.restaurants.find(q).limit(100)
    if sort_by == "rating":
        cursor = cursor.sort("rating", -1)
    elif sort_by == "delivery_time":
        cursor = cursor.sort("delivery_time", 1)
    elif sort_by == "price_low":
        cursor = cursor.sort("price_for_two", 1)
    elif sort_by == "price_high":
        cursor = cursor.sort("price_for_two", -1)
    docs = await cursor.to_list(length=100)
    return [doc_without_id(d) for d in docs]


@router.get("/restaurants/{restaurant_id}")
async def get_restaurant(restaurant_id: str, db=Depends(get_db)):
    doc = await db.restaurants.find_one({"id": restaurant_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return doc_without_id(doc)


@router.get("/restaurants/{restaurant_id}/menu")
async def get_menu(
    restaurant_id: str,
    category: Optional[str] = Query(None),
    veg_only: Optional[bool] = Query(None),
    db=Depends(get_db),
):
    q = {"restaurant_id": restaurant_id, "is_available": True}
    if category:
        q["category"] = {"$regex": re.escape(category), "$options": "i"}
    if veg_only is True:
        q["is_veg"] = True
    cursor = db.menu_items.find(q)
    docs = await cursor.to_list(length=500)
    return [doc_without_id(d) for d in docs]


@router.get("/cuisines")
async def get_cuisines(db=Depends(get_db)):
    pipeline = [
        {"$match": {"is_open": True}},
        {"$unwind": "$cuisines"},
        {"$group": {"_id": {"$toLower": "$cuisines"}}},
        {"$sort": {"_id": 1}},
        {"$limit": 100},
    ]
    cursor = db.restaurants.aggregate(pipeline)
    out = []
    async for d in cursor:
        out.append(d["_id"])
    return list(dict.fromkeys(out))


@router.get("/categories")
async def get_categories(db=Depends(get_db)):
    cursor = db.menu_items.distinct("category")
    cats = await cursor
    return sorted(set(cats))


# --- Cart ---
@router.get("/cart")
async def get_cart(user=Depends(get_current_user), db=Depends(get_db)):
    doc = await db.carts.find_one({"user_id": user["id"]})
    if not doc:
        now = datetime.utcnow().isoformat() + "Z"
        doc = {
            "id": str(uuid.uuid4()),
            "user_id": user["id"],
            "restaurant_id": None,
            "restaurant_name": None,
            "items": [],
            "updated_at": now,
        }
        await db.carts.insert_one(doc)
    return doc_without_id(doc)


@router.post("/cart/add")
async def cart_add(body: CartItemAdd, user=Depends(get_current_user), db=Depends(get_db)):
    cart = await db.carts.find_one({"user_id": user["id"]})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    rid = body.restaurant_id
    rname = body.restaurant_name
    current_rid = cart.get("restaurant_id")
    items = list(cart.get("items") or [])
    if current_rid and items and current_rid != rid:
        raise HTTPException(
            status_code=400,
            detail="Cart contains items from a different restaurant. Please clear cart first.",
        )
    found = False
    for i in items:
        if i.get("item_id") == body.item_id:
            i["quantity"] = i.get("quantity", 0) + body.quantity
            found = True
            break
    if not found:
        items.append({
            "item_id": body.item_id,
            "name": body.name,
            "price": body.price,
            "quantity": body.quantity,
            "is_veg": body.is_veg,
            "image": body.image,
        })
    now = datetime.utcnow().isoformat() + "Z"
    await db.carts.update_one(
        {"user_id": user["id"]},
        {"$set": {"items": items, "restaurant_id": rid, "restaurant_name": rname, "updated_at": now}},
    )
    cart["items"] = items
    cart["restaurant_id"] = rid
    cart["restaurant_name"] = rname
    cart["updated_at"] = now
    return doc_without_id(cart)


@router.put("/cart/update")
async def cart_update(body: CartItemUpdate, user=Depends(get_current_user), db=Depends(get_db)):
    cart = await db.carts.find_one({"user_id": user["id"]})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    items = [i for i in (cart.get("items") or []) if i.get("item_id") != body.item_id]
    if body.quantity > 0:
        for i in cart.get("items") or []:
            if i.get("item_id") == body.item_id:
                items.append({**i, "quantity": body.quantity})
                break
    rid = cart.get("restaurant_id")
    rname = cart.get("restaurant_name")
    if not items:
        rid = None
        rname = None
    now = datetime.utcnow().isoformat() + "Z"
    await db.carts.update_one(
        {"user_id": user["id"]},
        {"$set": {"items": items, "restaurant_id": rid, "restaurant_name": rname, "updated_at": now}},
    )
    cart["items"] = items
    cart["restaurant_id"] = rid
    cart["restaurant_name"] = rname
    cart["updated_at"] = now
    return doc_without_id(cart)


@router.delete("/cart/clear")
async def cart_clear(user=Depends(get_current_user), db=Depends(get_db)):
    now = datetime.utcnow().isoformat() + "Z"
    await db.carts.update_one(
        {"user_id": user["id"]},
        {"$set": {"items": [], "restaurant_id": None, "restaurant_name": None, "updated_at": now}},
    )
    return {"message": "Cart cleared"}


# --- Orders ---
@router.post("/orders/place")
async def place_order(body: PlaceOrderBody, user=Depends(get_current_user), db=Depends(get_db)):
    cart = await db.carts.find_one({"user_id": user["id"]})
    if not cart or not cart.get("items"):
        raise HTTPException(status_code=400, detail="Cart is empty")
    items = cart["items"]
    subtotal = sum(i.get("price", 0) * i.get("quantity", 0) for i in items)
    delivery_fee = 40 if subtotal < 500 else 0
    taxes = round(subtotal * 0.05)
    total = subtotal + delivery_fee + taxes
    order_id = str(uuid.uuid4())
    now = datetime.utcnow().isoformat() + "Z"
    order = {
        "id": order_id,
        "user_id": user["id"],
        "restaurant_id": cart["restaurant_id"],
        "restaurant_name": cart["restaurant_name"] or "Restaurant",
        "items": items,
        "subtotal": subtotal,
        "delivery_fee": delivery_fee,
        "taxes": taxes,
        "total": total,
        "status": "PLACED",
        "delivery_address": body.delivery_address,
        "created_at": now,
    }
    await db.orders.insert_one(order)
    await db.carts.update_one(
        {"user_id": user["id"]},
        {"$set": {"items": [], "restaurant_id": None, "restaurant_name": None, "updated_at": now}},
    )
    return doc_without_id(order)


@router.get("/orders")
async def list_orders(user=Depends(get_current_user), db=Depends(get_db)):
    cursor = db.orders.find({"user_id": user["id"]}).sort("created_at", -1).limit(50)
    docs = await cursor.to_list(length=50)
    return [doc_without_id(d) for d in docs]


@router.get("/orders/{order_id}")
async def get_order(order_id: str, user=Depends(get_current_user), db=Depends(get_db)):
    doc = await db.orders.find_one({"id": order_id, "user_id": user["id"]})
    if not doc:
        raise HTTPException(status_code=404, detail="Order not found")
    return doc_without_id(doc)


# --- Instamart ---
@router.get("/instamart/categories")
async def instamart_categories(db=Depends(get_db)):
    cursor = db.instamart_categories.find({})
    docs = await cursor.to_list(length=50)
    return [doc_without_id(d) for d in docs]


@router.get("/instamart/products")
async def instamart_products(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db=Depends(get_db),
):
    q = {"in_stock": True}
    if category:
        q["category"] = category
    if search:
        q["name"] = {"$regex": search, "$options": "i"}
    cursor = db.instamart_products.find(q).limit(100)
    docs = await cursor.to_list(length=100)
    return [doc_without_id(d) for d in docs]


# --- Seed ---
@router.post("/seed")
async def seed(db=Depends(get_db)):
    await db.restaurants.delete_many({})
    await db.menu_items.delete_many({})
    await db.instamart_categories.delete_many({})
    await db.instamart_products.delete_many({})

    RX = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660"
    restaurants = [
        {"id": "rest-1", "name": "Meghana Foods", "image": f"{RX}/FOOD_CATALOG/IMAGES/CMS/2025/12/29/57bebf52-5a58-42e0-af9d-3d872d52de83_2d89d14b-3568-4be1-946d-1d7b0539edae.jpg", "cuisines": ["Andhra", "Biryani", "South Indian"], "rating": 4.7, "delivery_time": "40-45 mins", "price_for_two": 500, "discount": "20% OFF UPTO ₹75", "veg_only": False, "address": "Residency Road, Bengaluru", "is_open": True},
        {"id": "rest-2", "name": "Pizza Hut", "image": f"{RX}/RX_THUMBNAIL/IMAGES/VENDOR/2025/9/1/5d703bb8-2414-4ab1-bcae-59bba6a52598_10575.JPG", "cuisines": ["Pizzas", "Italian"], "rating": 4.3, "delivery_time": "35-40 mins", "price_for_two": 600, "discount": "ITEMS AT ₹49", "veg_only": False, "address": "Central Bangalore", "is_open": True},
        {"id": "rest-3", "name": "Truffles", "image": f"{RX}/cd832b6167eb9f88aeb1ccdebf38d942", "cuisines": ["American", "Continental", "Desserts"], "rating": 4.6, "delivery_time": "25-30 mins", "price_for_two": 700, "discount": "15% OFF UPTO ₹75", "veg_only": False, "address": "St. Marks Road, Bengaluru", "is_open": True},
        {"id": "rest-4", "name": "Vidyarthi Bhavan", "image": f"{RX}/tladdzgke7gic8xjng4z", "cuisines": ["South Indian", "Breakfast"], "rating": 4.6, "delivery_time": "30-35 mins", "price_for_two": 300, "discount": None, "veg_only": True, "address": "Gandhi Bazaar, Bengaluru", "is_open": True},
        {"id": "rest-5", "name": "Empire Restaurant", "image": f"{RX}/titgwthozpmhyzjgdh5u", "cuisines": ["North Indian", "Biryani", "Mughlai"], "rating": 4.1, "delivery_time": "35-40 mins", "price_for_two": 450, "discount": "20% OFF UPTO ₹50", "veg_only": False, "address": "Koramangala, Bengaluru", "is_open": True},
        {"id": "rest-6", "name": "KFC", "image": f"{RX}/RX_THUMBNAIL/IMAGES/VENDOR/2025/10/3/136c9e23-b373-45d5-9fad-7e4763ebd36b_43836.JPG", "cuisines": ["Burgers", "Fast Food"], "rating": 4.2, "delivery_time": "30-35 mins", "price_for_two": 500, "discount": "₹100 OFF", "veg_only": False, "address": "Ashok Nagar, Bengaluru", "is_open": True},
        {"id": "rest-7", "name": "Saravana Bhavan", "image": f"{RX}/RX_THUMBNAIL/IMAGES/VENDOR/2026/1/7/394d4bca-db65-43a2-9372-12543611d33a_12808.JPG", "cuisines": ["South Indian", "North Indian"], "rating": 4.5, "delivery_time": "35-40 mins", "price_for_two": 400, "discount": "ITEMS AT ₹33", "veg_only": True, "address": "Shanti Nagar, Bengaluru", "is_open": True},
        {"id": "rest-8", "name": "McDonald's", "image": f"{RX}/RX_THUMBNAIL/IMAGES/VENDOR/2025/10/3/136c9e23-b373-45d5-9fad-7e4763ebd36b_43836.JPG", "cuisines": ["Burgers", "Beverages", "Desserts"], "rating": 4.3, "delivery_time": "35-40 mins", "price_for_two": 400, "discount": "₹100 OFF ABOVE ₹349", "veg_only": False, "address": "Ashok Nagar, Bengaluru", "is_open": True},
    ]
    await db.restaurants.insert_many(restaurants)

    menu_data = []
    categories_list = ["Biryani", "Chinese", "South Indian", "Pizzas", "Burgers", "Beverages", "Desserts", "Main Course", "Starters", "Breads"]
    for r in restaurants:
        rid = r["id"]
        for i, cat in enumerate(categories_list[:5]):
            menu_data.append({
                "id": f"item-{rid}-{i}-1",
                "restaurant_id": rid,
                "name": f"{cat} Item 1",
                "description": f"Delicious {cat}",
                "price": 150 + i * 30,
                "image": None,
                "category": cat,
                "is_veg": r.get("veg_only", False),
                "is_bestseller": i == 0,
                "is_available": True,
            })
            menu_data.append({
                "id": f"item-{rid}-{i}-2",
                "restaurant_id": rid,
                "name": f"{cat} Item 2",
                "description": f"Tasty {cat}",
                "price": 200 + i * 20,
                "image": None,
                "category": cat,
                "is_veg": r.get("veg_only", False),
                "is_bestseller": False,
                "is_available": True,
            })
    await db.menu_items.insert_many(menu_data)

    insta_cats = [
        {"id": "ic-1", "name": "Fruits & Vegetables", "image": f"{RX}/fruits", "product_count": 20},
        {"id": "ic-2", "name": "Dairy & Bread", "image": f"{RX}/dairy", "product_count": 15},
        {"id": "ic-3", "name": "Snacks & Beverages", "image": f"{RX}/snacks", "product_count": 25},
        {"id": "ic-4", "name": "Instant Food", "image": f"{RX}/instant", "product_count": 18},
        {"id": "ic-5", "name": "Personal Care", "image": f"{RX}/care", "product_count": 12},
        {"id": "ic-6", "name": "Home & Kitchen", "image": f"{RX}/home", "product_count": 10},
    ]
    await db.instamart_categories.insert_many(insta_cats)

    insta_products = []
    for c in insta_cats:
        for j in range(2):
            insta_products.append({
                "id": f"ip-{c['id']}-{j}",
                "name": f"{c['name']} Product {j+1}",
                "image": c["image"],
                "price": 80 + j * 40,
                "original_price": 100 + j * 50,
                "category": c["name"],
                "unit": "1 kg",
                "delivery_time": "10-15 mins",
                "in_stock": True,
            })
    await db.instamart_products.insert_many(insta_products)

    # Mock user: log in to see past orders; new orders will appear in Recent Orders
    mock_email = "mock@example.com"
    mock_password = "mock123"
    existing_user = await db.users.find_one({"email": mock_email})
    if not existing_user:
        mock_id = "mock-user-1"
        now = datetime.utcnow().isoformat() + "Z"
        await db.users.insert_one({
            "id": mock_id,
            "email": mock_email,
            "name": "Mock User",
            "phone": None,
            "password": hash_password(mock_password),
            "addresses": [],
            "created_at": now,
        })
        await db.carts.insert_one({
            "id": str(uuid.uuid4()),
            "user_id": mock_id,
            "restaurant_id": None,
            "restaurant_name": None,
            "items": [],
            "updated_at": now,
        })
        # Past orders so Recent Orders is not empty
        for rest_id, rest_name in [("rest-1", "Meghana Foods"), ("rest-2", "Pizza Hut"), ("rest-3", "Truffles")]:
            order_id = str(uuid.uuid4())
            items = [{"item_id": "item-rest-1-0-1", "name": "Biryani Item 1", "price": 150, "quantity": 2, "is_veg": False}]
            subtotal = sum(i["price"] * i["quantity"] for i in items)
            delivery_fee = 40 if subtotal < 500 else 0
            taxes = round(subtotal * 0.05)
            total = subtotal + delivery_fee + taxes
            await db.orders.insert_one({
                "id": order_id,
                "user_id": mock_id,
                "restaurant_id": rest_id,
                "restaurant_name": rest_name,
                "items": items,
                "subtotal": subtotal,
                "delivery_fee": delivery_fee,
                "taxes": taxes,
                "total": total,
                "status": "DELIVERED",
                "delivery_address": {"label": "Home", "line1": "123 Demo St", "city": "Bengaluru", "pincode": "560001"},
                "created_at": now,
            })

    return {
        "message": "Database seeded successfully",
        "restaurants": len(restaurants),
        "menu_items": len(menu_data),
        "instamart_categories": len(insta_cats),
        "instamart_products": len(insta_products),
        "mock_user": "Login: mock@example.com / mock123 — see Recent Orders; new orders appear there after placing.",
    }


app.include_router(router, prefix="/api")


@app.on_event("startup")
async def startup():
    global client, db
    client = AsyncIOMotorClient(
        MONGO_URL,
        tlsCAFile=certifi.where(),
    )
    db = client[DB_NAME]
    await client.admin.command("ping")
    print("MongoDB connected ✅")
    await db.users.create_index("email", unique=True)


@app.on_event("shutdown")
async def shutdown():
    global client
    if client:
        client.close()
