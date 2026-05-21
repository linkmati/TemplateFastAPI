# System Overview: TemplateFastAPI

This document serves as a guide for future AI sessions or developers to understand the project's architecture, conventions, and data flow.

## 🏗 Architecture
The project follows a **Monorepo-lite** structure:
- `/frontend`: Next.js (App Router, TypeScript).
- `/backend`: FastAPI (Python, SQLModel).
- `/docker-compose.yml`: Orchestrates local development.

## 🔒 Authentication & Security
- **Identity Provider:** Supabase Auth.
- **Frontend Flow:** Uses `@supabase/supabase-js` to manage sessions and tokens.
- **Backend Flow:** FastAPI acts as a Resource Server. It receives the JWT in the `Authorization` header, validates it using the `SUPABASE_JWT_SECRET`, and extracts the `user_id` (sub).
- **Service Agnosticism:** The backend doesn't call Supabase APIs directly for Auth; it relies on standard JWT validation, making it easy to swap providers if the secret/algorithm remains compatible.

## 🗄 Database & Persistence
- **ORM:** `SQLModel` (SQLAlchemy + Pydantic).
- **Strategy:** All database interactions happen through the backend. The frontend should **never** access the database directly via Supabase client libraries if business logic or data validation is required.
- **Service Agnosticism:** Uses standard PostgreSQL connection strings. Can be hosted on Supabase, RDS, Neon, or local Docker.

## 🧬 Development Conventions
- **Models:** Always define models in `backend/app/models.py`.
- **Environment:** Use `.env` files for configuration. Never commit secrets.
- **Schema Management:** The current schema state is tracked in `DATABASE_SCHEMA.md` for AI context efficiency.

## 🚀 Data Flow
1. User logs in via `/frontend/login`.
2. Supabase provides a JWT.
3. Frontend sends JWT to Backend: `GET /items/` with `Bearer <token>`.
4. Backend validates JWT and queries DB for data belonging to `user_id`.
5. Backend returns JSON to Frontend.
