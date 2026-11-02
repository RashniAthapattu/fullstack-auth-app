# Full-Stack Auth App

A full-stack web app with secure user authentication, built with **React**, **Express**, **TypeScript** and **PostgreSQL**.

Users can sign up, log in, stay logged in across sessions and log out. The app uses short-lived access tokens and rotating refresh tokens stored in HTTP-only cookies, and it detects when a refresh token is reused.

## Features

- **Sign up and log in** with form validation on the client (Formik + Yup)
- **JWT authentication** with Passport (local strategy for login, JWT strategies for access and refresh tokens)
- **Refresh token rotation:** refresh tokens are stored in the database, swapped on every refresh and all revoked if a reused token is detected
- **HTTP-only, SameSite cookies** for the refresh token, so it can't be read from JavaScript
- **Protected routes** on both sides: Express middleware on the API, and a `withAuth` wrapper in React
- **Automatic token refresh** in the Axios client
- **API documentation** with Swagger / OpenAPI at `/docs`
- **Integration tests** for the auth endpoints with Jest and Supertest
- CORS allow-list, central error handling, ESLint and Prettier

## Tech stack

| Layer    | Tools |
|----------|-------|
| Frontend | React, TypeScript, Vite, Material UI, React Query, React Router, Formik, Yup, Axios |
| Backend  | Node.js, Express, TypeScript, Passport, jsonwebtoken, bcrypt |
| Database | PostgreSQL with TypeORM |
| Testing  | Jest, Supertest |
| Docs     | Swagger (swagger-jsdoc, swagger-ui-express) |

## Project structure

```
backend/
  src/
    api/          routes, controllers and middleware
    database/     TypeORM models, repositories and connection
    services/     business logic (register, login, logout, token handling)
    strategies/   Passport local, access-JWT and refresh-JWT strategies
    utils/        token helpers, Swagger setup, errors
  tests/          Jest + Supertest integration tests
frontend/
  src/
    modules/      feature folders: sign-in, sign-up, dashboard, common (auth, layout, utils)
    routes/       app routing
```

## API

| Method | Endpoint             | Description |
|--------|----------------------|-------------|
| POST   | `/auth/register`     | Create an account, returns an access token and sets the refresh cookie |
| POST   | `/auth/login`        | Log in with email and password |
| GET    | `/auth/refreshtoken` | Get a new access token using the refresh cookie |
| POST   | `/auth/logout`       | Log out and revoke the refresh token |
| GET    | `/auth/protected`    | Example protected route, needs a valid access token |

Full docs are served at `http://localhost:8081/docs` when the backend is running.

## Getting started

### Requirements

- Node.js 18 or newer
- PostgreSQL running locally

### 1. Backend

```bash
cd backend
npm install
cp .sample..env .env     # then fill in your own database details and secrets
npm run dev              # or: npm run build && npm start
```

The API runs on `http://localhost:8081` by default.

### 2. Frontend

```bash
cd frontend
npm install
cp .sample.env .env      # VITE_BACKEND_API=http://localhost:8081
npm start
```

Then open the URL Vite prints (usually `http://localhost:5173`).

### Run the tests

```bash
cd backend
npm test
```

The tests need a running PostgreSQL database configured in `backend/.env`.

## Author

**Rashni Athapattu**, Full-Stack Software Engineer, Stockholm
[GitHub](https://github.com/RashniAthapattu)
