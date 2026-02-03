# Task Manager Dashboard

Full-stack task app: JWT auth (signup/login), protected routes, and task CRUD with search and filter.

## Stack

- **Backend:** Express, MongoDB (Mongoose), JWT, bcryptjs
- **Frontend:** React (Vite), React Router, Axios, Tailwind CSS

## Setup

**Prerequisites:** Node 18+, MongoDB running locally (or set `MONGODB_URI`).

### Backend

```bash
cd backend
cp .env.example .env
# Edit .env: set MONGODB_URI and JWT_SECRET
npm install
npm run dev
```

Runs at `http://localhost:5000`.

### Frontend

```bash
cd frontend
cp .env.example .env
# Optional: set VITE_API_BASE_URL if backend is not localhost:5000
npm install
npm run dev
```

Runs at `http://localhost:5173`.

## Decisions

- **Auth:** JWT in `Authorization: Bearer <token>`. Token stored in `localStorage` (per assignment). Password hashed with bcrypt before save; min 6 chars, email format validated on signup/login.
- **Protected routes:** Frontend checks for token and redirects to `/login` if missing. Backend uses a single `auth` middleware on `/api/v1/tasks` to verify JWT and set `req.userId`; all task operations are scoped by `userId`.
- **API versioning:** All API under `/api/v1` (e.g. `/api/v1/auth/login`, `/api/v1/tasks`).
- **Tasks:** One CRUD resource. Search by `q` (title/description). Filter by `status` and `priority` query params. No pagination.
- **Validation:** Required fields (e.g. title), email format, password length. No extra validation libs.
- **Errors:** One global Express error handler; one JWT middleware. Console used for logging.

## API (v1)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST   | /api/v1/auth/signup | No  | Body: `{ email, password }` |
| POST   | /api/v1/auth/login  | No  | Body: `{ email, password }` |
| GET    | /api/v1/tasks       | Yes | Query: `q`, `status`, `priority` |
| GET    | /api/v1/tasks/:id   | Yes | Get one task |
| POST   | /api/v1/tasks       | Yes | Body: `{ title, description?, status?, priority?, dueDate? }` |
| PUT    | /api/v1/tasks/:id   | Yes | Update task |
| DELETE | /api/v1/tasks/:id   | Yes | Delete task |

## Scaling to production (short note)

- **Auth:** Prefer httpOnly cookies for tokens; add refresh tokens and short-lived access tokens. Use a proper secrets manager for `JWT_SECRET`.
- **Validation:** Add a validation layer (e.g. express-validator or Joi) and sanitize inputs.
- **DB:** Use connection pooling and indexes (e.g. on `userId`, `status`, `createdAt`). Add pagination for task list.
- **Errors:** Centralize error codes and avoid leaking stack traces in production. Use a logger (e.g. Pino) and log to a service.
- **Frontend:** Move token handling to a single place (e.g. auth context); consider refresh before expiry. Use env-based API URL and HTTPS only in prod.
