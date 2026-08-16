# TripVault — Modern Travel Management System

TripVault is a production-quality travel management application engineered for security, clean architecture, and exceptional user experience. Built with Node.js, Express, MongoDB, and React.

## System Architecture & Tech Stack

```
tripvault/
├── client/                 # React 19 + Vite Frontend
│   ├── src/
│   │   ├── components/     # Route guards & shared UI primitives
│   │   ├── context/        # React Context for authentication state
│   │   ├── pages/          # Landing, Register, Login, Dashboard
│   │   └── services/       # Axios client with JWT request/response interceptors
│   ├── index.html
│   └── vite.config.js      # API proxy configuration
├── server/                 # Node.js + Express 5 Backend
│   ├── middleware/         # JWT Bearer token authentication middleware
│   ├── models/             # Mongoose User schema (select: false for passwords)
│   ├── routes/             # Authentication & user endpoints
│   ├── .env.example        # Environment variable template
│   └── index.js            # Express server initialization & MongoDB connection
├── docs/                   # Requirements verification & project documentation
└── README.md
```

### Technology Matrix

| Layer | Technology | Details |
|---|---|---|
| **Frontend** | React 19, Vite, React Router 7 | SPA with clean editorial design system |
| **HTTP Client** | Axios | Automatic JWT header injection & 401 interceptor |
| **Backend** | Node.js, Express 5 | RESTful API structure with robust error handling |
| **Database** | MongoDB Atlas (Mongoose 9) | Secure user storage with schema validations |
| **Security** | bcryptjs, jsonwebtoken, CORS | Password salting (12 rounds), 256-bit JWT signing |

---

## Authentication Architecture & Security

1. **Password Protection:** Plaintext passwords are salted (12 rounds) using `bcryptjs` before storage. User schemas specify `select: false` on password fields to avoid accidental exposure in database queries.
2. **Stateless JWT Tokens:** Authentication returns a signed JSON Web Token configured with configurable expiration (`7d`).
3. **Protected Routes:** Requests to protected endpoints (e.g. `/api/auth/me`) require a `Bearer <token>` Authorization header, verified by `middleware/auth.js`.
4. **Input & CORS Security:** Strict body size parsing (`10kb`), strict email pattern validation, name trimming, and origin-locked CORS policies prevent common REST API vulnerabilities.
5. **Client Persistence:** JWT tokens are stored securely in `localStorage` and synchronized across browser sessions via `AuthContext`. Stale or invalid tokens trigger immediate cleanup and unauthenticated redirection.

---

## Environment Configuration

Create a `.env` file in the `server` directory based on `.env.example`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/tripvault?retryWrites=true&w=majority
JWT_SECRET=your_cryptographically_secure_64_byte_hex_string
PORT=5000
CLIENT_URL=http://localhost:5173
```

> [!IMPORTANT]
> Never commit `.env` to Git repository. Both root `.gitignore` and `server/.gitignore` exclude `.env` files.

---

## Local Setup & Development Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Active Atlas connection URI or local MongoDB instance

### 1. Backend Server Setup
```bash
cd server
npm install
npm run dev     # Starts backend server on http://localhost:5000 with auto-reload
```

### 2. Frontend Client Setup
```bash
cd client
npm install
npm run dev     # Starts Vite development server on http://localhost:5173
```

---

## API Reference

### Public Endpoints

#### `GET /`
- **Description:** Server health check.
- **Response:** `200 OK` `{ "success": true, "message": "TripVault API is running" }`

#### `POST /api/auth/register`
- **Description:** Registers a new user account.
- **Request Body:** `{ "name": "Jane Doe", "email": "jane@example.com", "password": "securepassword" }`
- **Response (201 Created):** `{ "success": true, "token": "...", "user": { "id": "...", "name": "...", "email": "..." } }`
- **Errors:** `400 Bad Request` (validation), `409 Conflict` (duplicate email).

#### `POST /api/auth/login`
- **Description:** Authenticates credentials and issues a JWT token.
- **Request Body:** `{ "email": "jane@example.com", "password": "securepassword" }`
- **Response (200 OK):** `{ "success": true, "token": "...", "user": { "id": "...", "name": "...", "email": "..." } }`
- **Errors:** `400 Bad Request` (missing fields), `401 Unauthorized` (invalid credentials).

### Protected Endpoints

#### `GET /api/auth/me`
- **Header Required:** `Authorization: Bearer <JWT_TOKEN>`
- **Description:** Fetches current authenticated user data.
- **Response (200 OK):** `{ "success": true, "user": { "id": "...", "name": "...", "email": "..." } }`
- **Errors:** `401 Unauthorized` (missing/invalid token).

---

## Verification & Quality Assurance

TripVault undergoes rigorous test scenarios covering:
- [x] Backend startup & MongoDB Atlas cluster connection
- [x] Registration logic with bcrypt password salting & email validation
- [x] Rejection of duplicate registration attempts (`409 Conflict`)
- [x] Credential authentication & JWT generation
- [x] Prevention of login with invalid credentials (`401 Unauthorized`)
- [x] JWT Bearer validation middleware on protected routes (`/api/auth/me`)
- [x] React SPA bundle compilation via `vite build`
- [x] Browser registration → login → protected dashboard navigation flow
- [x] Unauthenticated route protection & automatic redirection
