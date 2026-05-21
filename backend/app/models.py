from typing import Optional
from sqlmodel import SQLModel, Field

class ItemBase(SQLModel):
    title: str
    description: Optional[str] = None

class Item(ItemBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    owner_id: str  # This will be the Supabase User ID

class ItemCreate(ItemBase):
    pass

class ItemRead(ItemBase):
    id: int
    owner_id: str
