from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from typing import List

from .database import init_db, get_session
from .models import Item, ItemCreate, ItemRead
from .auth import get_current_user

app = FastAPI(title="Agnostic Template API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/items/", response_model=ItemRead)
def create_item(
    *, 
    session: Session = Depends(get_session), 
    item: ItemCreate,
    user: dict = Depends(get_current_user)
):
    db_item = Item.from_orm(item)
    db_item.owner_id = user["id"]
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item

@app.get("/items/", response_model=List[ItemRead])
def read_items(
    *, 
    session: Session = Depends(get_session),
    user: dict = Depends(get_current_user)
):
    statement = select(Item).where(Item.owner_id == user["id"])
    items = session.exec(statement).all()
    return items

@app.get("/me")
def read_users_me(user: dict = Depends(get_current_user)):
    return user
