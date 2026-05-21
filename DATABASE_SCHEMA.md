# Database Schema Reference

This file tracks the current state of the database models and the corresponding SQL schema. Use this as a reference for AI agents to understand the data structure without parsing the entire codebase.

## Current Models (Python / SQLModel)

### Item
```python
class Item(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    owner_id: str  # maps to Supabase auth.users.id
```

## SQL Equivalent (PostgreSQL)

```sql
CREATE TABLE item (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    description VARCHAR,
    owner_id VARCHAR NOT NULL
);

-- Index for owner queries
CREATE INDEX idx_item_owner_id ON item(owner_id);
```

## Schema History & Migrations
- **2026-05-21:** Initial project creation. Added `Item` model with `owner_id` for multi-tenancy based on Supabase Auth.
