# CodeCraft Commerce Backend

A production-ready Express/MongoDB API designed to power the CodeCraft Commerce storefront. The service follows clean architecture patterns with clear separation between routes, controllers, services, and persistence layers.

## Features

- Express.js + MongoDB (Mongoose ODM) with modular route/controller/service layers
- JWT authentication with refresh tokens, role-based authorization (customer/admin), and bcrypt password hashing
- Product, cart, order, and user management with admin-specific capabilities
- Stripe payment placeholder service ready to be swapped for live processing
- Validation via `express-validator` and comprehensive error handling middleware
- Winston logger, morgan HTTP logging, security middlewares (helmet, cors, compression)
- Environment-based configuration and centralized config utilities
- Seed script to populate initial users/products
- Ready-to-import Postman collection for rapid API testing

## Getting Started

```bash
cd backend
npm install
cp env.example .env           # update values for your environment
npm run dev                   # starts API at http://localhost:4000
```

Ensure MongoDB is running locally or update `MONGODB_URI` to your cluster URI.

## Scripts

- `npm run dev` – start development server with Nodemon
- `npm start` – start production server
- `npm run seed` – seed database with mock users & products
- `npm run lint` – run ESLint

## Project Layout

```
src/
├─ app.js               # Express app configuration
├─ server.js            # Server bootstrap & DB connection
├─ config/              # Environment, database, logger configurations
├─ controllers/         # Route handlers (thin)
├─ services/            # Business logic & orchestration
├─ models/              # Mongoose schemas & hooks
├─ routes/              # Route definitions (RESTful, versionable)
├─ middleware/          # Auth, validation, error handling
├─ utils/               # Helpers (async wrapper, ApiError, tokens)
├─ validators/          # express-validator schemas
├─ scripts/seed.js      # Database seeding utilities
└─ docs/CodeCraft.postman_collection.json
```

## Seeding Data

```bash
npm run seed
```

Seeds an admin user, sample customers, and a curated product catalog. Update credentials inside `src/scripts/seed.js`.

## Postman Collection

`src/docs/CodeCraft.postman_collection.json` contains example requests for auth, product, cart, checkout, and admin flows. Import it into Postman/Insomnia to explore the API quickly.

## Deployment Notes

- Use a process manager such as PM2 or Docker for production.
- Configure environment variables securely (never commit `.env`).
- Set up HTTPS, JWT secret rotation, and full Stripe integration before launch.
- Add automated tests (Jest/Supertest) and CI/CD according to organizational standards.

---

Built to integrate seamlessly with the accompanying React frontend and to scale with your eCommerce roadmap. 🚀






