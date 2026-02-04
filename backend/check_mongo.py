"""
Quick script to verify MongoDB connection. Run from backend folder:
  python check_mongo.py
Uses .env (or .env.example) for MONGO_URL and DB_NAME.
"""
import os
import sys

# Load .env from backend folder
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME", "swiggy_clone")

if not MONGO_URL:
    print("ERROR: MONGO_URL not set. Add it to backend/.env (see .env.example).")
    sys.exit(1)

def check():
    try:
        from motor.motor_asyncio import AsyncIOMotorClient
        import asyncio
    except ImportError as e:
        print("ERROR: Install backend deps first: pip install -r requirements.txt")
        sys.exit(1)

    async def run():
        try:
            client = AsyncIOMotorClient(MONGO_URL, serverSelectionTimeoutMS=5000)
            db = client[DB_NAME]
            await client.admin.command("ping")
            await db.restaurants.find_one()
            print("OK: MongoDB is connected.")
            print(f"   Database: {DB_NAME}")
            client.close()
            return True
        except Exception as e:
            print("FAIL: Could not connect to MongoDB.")
            print(f"   Error: {e}")
            return False

    asyncio.run(run())

if __name__ == "__main__":
    check()
