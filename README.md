# TripVault — Production-Grade Authentication & Travel Management System

TripVault is a minimal, editorial, production-quality authentication system and travel management base. Built with React + Vite on the frontend and Node.js + Express + MongoDB on the backend, featuring an off-white and deep teal design system, Inter typography, robust accessibility, and enterprise-grade security.

---

## Architecture & Technology Stack

```
tripvault/
├── client/                 # React 19 + Vite SPA
│   ├── src/
│   │   ├── components/     # UI primitives: PasswordStrengthMeter, ShowHidePasswordInput, SkeletonLoader, Toast, ProtectedRoute
│   │   ├── context/        # AuthContext for session management, token storage & toast alerts
│   │   ├── pages/          # Landing, Register, Login, ForgotPassword, Dashboard, Profile, NotFound (404), Unauthorized (401)
│   │   ├── services/       # Axios API client with request/response JWT interceptors
│   │   ├── App.jsx         # Client routing architecture
│   │   └── index.css       # Off-white & deep teal design system, focus rings, skeleton shimmer
│   ├── index.html
│   └── vite.config.js      # Dev server API proxy setup
├── server/                 # Node.js + Express 5 REST API
│   ├── middleware/         # Auth middleware for JWT verification
│   ├── models/             # Mongoose User model (password hidden by default)
│   ├── routes/             # Authentication routes (/api/auth/register, /api/auth/login, /api/auth/me)
│   ├── .env.example        # Environment variable schema
│   └── index.js            # Express server initialization & MongoDB connection
└── README.md
```

### Technology Matrix

| Layer | Technology | Key Details |
|---|---|---|
| **Frontend** | React 19, Vite, React Router 7 | Minimal editorial UI, soft off-white (`#F8FAF9`), deep teal (`#0F766E`), Inter typography |
| **HTTP Client** | Axios | Interceptors for JWT auth header injection & 401 session expiry handling |
| **Backend** | Node.js, Express 5 | REST API with schema validation, CORS locking, & body parser limits |
| **Database** | MongoDB (Mongoose 9) | Unique email indexing, strict schema, hidden password fields |
| **Security** | bcryptjs, jsonwebtoken | Password salting (12 rounds), 256-bit JWT signing |

---

## Authentication Flow & Security Practices

1. **Password Strength Meter & Salting:**
   - Client-side validation checks 5 key criteria (min 8 chars, uppercase, lowercase, number, special char) with a visual progress bar.
   - Backend salts passwords using `bcryptjs` with 12 rounds before storing in MongoDB. User schemas specify `select: false` on password fields.
2. **Flexible Token Persistence (Remember Me):**
   - If "Remember me" is checked during sign in: JWT token is saved in `localStorage`.
   - If unchecked: JWT token is saved in `sessionStorage` for single-session lifetime.
   - `AuthContext` and Axios request interceptors seamlessly retrieve tokens from both storage mechanisms.
3. **Session Expiry Handling:**
   - If a request receives a `401 Unauthorized` response due to token expiration or invalidation, the interceptor automatically clears stored tokens, redirects to `/login`, and presents a floating toast: *"Your session has expired."*
4. **State Protection & Route Authorization:**
   - Protected routes (`/dashboard`, `/profile`) render skeleton loaders while checking authentication and redirect unauthenticated users to `/login`.
   - Access to restricted assets displays custom 401 (`Unauthorized.jsx`) and 404 (`NotFound.jsx`) error pages with handcrafted SVG illustrations.
5. **Accessibility & Form Validation:**
   - Form controls provide live validation as users type.
   - Error messages are marked with `role="alert"` and `aria-live="polite"` for screen readers.
   - Distinct `:focus-visible` ring outlines ensure strong keyboard accessibility.

---

## Environment Setup

Create a `.env` file in the `server` directory based on `.env.example`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/tripvault?retryWrites=true&w=majority
JWT_SECRET=your_cryptographically_secure_64_byte_hex_string
PORT=5000
CLIENT_URL=http://localhost:5173
```

---

## Local Setup & Development Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Active MongoDB Atlas URI or local instance

### 1. Backend Server Setup
```bash
cd server
npm install
npm run dev     # Starts backend server on http://localhost:5000
```

### 2. Frontend Client Setup
```bash
cd client
npm install
npm run dev     # Starts Vite development server on http://localhost:5173
```

---

## API Endpoints Reference

### Public Endpoints

#### `POST /api/auth/register`
- **Description:** Registers a new user account.
- **Request Body:**
  ```json
  {
    "name": "Vikas Hugar",
    "email": "vikas@example.com",
    "password": "Password123!"
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Account created successfully",
    "token": "<JWT_TOKEN>",
    "user": {
      "id": "66c5c8e31234567890abcdef",
      "name": "Vikas Hugar",
      "email": "vikas@example.com",
      "createdAt": "2026-08-21T14:00:00.000Z"
    }
  }
  ```
- **Error Responses:** `400 Bad Request` (validation failed), `409 Conflict` (duplicate email).

#### `POST /api/auth/login`
- **Description:** Authenticates user credentials and returns JWT token.
- **Request Body:**
  ```json
  {
    "email": "vikas@example.com",
    "password": "Password123!"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "<JWT_TOKEN>",
    "user": {
      "id": "66c5c8e31234567890abcdef",
      "name": "Vikas Hugar",
      "email": "vikas@example.com",
      "createdAt": "2026-08-21T14:00:00.000Z"
    }
  }
  ```
- **Error Responses:** `400 Bad Request` (missing fields), `401 Unauthorized` (invalid credentials).

### Protected Endpoints

#### `GET /api/auth/me`
- **Header Required:** `Authorization: Bearer <JWT_TOKEN>`
- **Description:** Retrieves currently authenticated user profile.
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "user": {
      "id": "66c5c8e31234567890abcdef",
      "name": "Vikas Hugar",
      "email": "vikas@example.com",
      "createdAt": "2026-08-21T14:00:00.000Z"
    }
  }
  ```
- **Error Responses:** `401 Unauthorized` (invalid/expired token).
