# CodeGen TripVault — Week 1 Requirements

## Requirements Verified from Repository

| # | Requirement | Status | Evidence |
|---|-------------|--------|----------|
| 1 | Node.js backend | ✅ Done | `server/index.js` |
| 2 | Express framework | ✅ Done | `package.json` — Express 5.2.1 |
| 3 | MongoDB Atlas connection | ✅ Done | Tested — connects successfully |
| 4 | User model (name, email, hashed password) | ✅ Done | `server/models/User.js` |
| 5 | POST /api/auth/register | ✅ Done | `server/routes/auth.js` — tested |
| 6 | POST /api/auth/login | ✅ Done | `server/routes/auth.js` — tested |
| 7 | JWT authentication | ✅ Done | Token returned on login/register |
| 8 | GET /api/auth/me protected by JWT | ✅ Done | `server/middleware/auth.js` — tested |
| 9 | bcrypt password hashing | ✅ Done | bcryptjs with 12 salt rounds |
| 10 | Never store plaintext passwords | ✅ Done | `select: false` on password field |
| 11 | React + Vite frontend | ✅ Done | `client/` — Vite + React 19 |
| 12 | Register page | ✅ Done | `client/src/pages/Register.jsx` |
| 13 | Login page | ✅ Done | `client/src/pages/Login.jsx` |
| 14 | Dashboard page | ✅ Done | `client/src/pages/Dashboard.jsx` |
| 15 | Store JWT after login | ✅ Done | localStorage via AuthContext |
| 16 | React Router | ✅ Done | react-router-dom v7 |
| 17 | Routes: /, /login, /register, /dashboard | ✅ Done | `client/src/App.jsx` |
| 18 | Protect /dashboard | ✅ Done | `ProtectedRoute` component |
| 19 | Redirect unauthenticated to /login | ✅ Done | Tested in browser |
| 20 | Backend on port 5000 | ✅ Done | Default PORT = 5000 |
| 21 | Clean /server and /client structure | ✅ Done | Separate directories |
| 22 | Clear README | ✅ Done | `README.md` |
| 23 | Register → Login → Dashboard flow | ✅ Done | Tested end-to-end in browser |

## Requirements Still Needing Confirmation

| Requirement | Notes |
|-------------|-------|
| Public GitHub repository named "tripvault" | Repository exists locally; push to GitHub not yet confirmed |
| Meaningful Git commit history | Commits need to be made manually |
| Specific deployment requirements | Not specified in Week 1 brief |
