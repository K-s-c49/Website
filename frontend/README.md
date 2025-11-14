# CodeCraft Commerce Frontend

A production-ready, feature-complete React storefront crafted for the MERN stack. This project focuses on the frontend experience, delivering a scalable component architecture, state management foundation, and mock integrations ready to connect with Node.js, Express, and MongoDB services.

## Highlights

- ⚡️ **Vite + React 18** with JSX for optimal DX and performance
- 🎨 **Tailwind CSS** + shadcn-inspired UI primitives for consistent design language
- 🧠 **Redux Toolkit** powered global state, async thunks, and typed actions
- 🔐 Authentication flows (login, register, reset) with form validation via `react-hook-form` + `zod`
- 🛒 Customer journey pages: catalog, product detail, cart, checkout, and order history
- 🛠️ Admin console for managing products, orders, and users
- 🔔 Global toasts (Sonner), loading states, protected routes, and responsive layouts
- 📦 Mock API layer and sample data to simulate backend interactions

## Getting Started

```bash
npm install
npm run dev
```

> **Note:** Installing dependencies via `npm install` is required after cloning or pulling changes. The CLI may prompt to install `@vitejs/plugin-react` dependencies on first run.

## Available Scripts

- `npm run dev` – start development server with hot module reloading
- `npm run build` – generate production build
- `npm run preview` – preview production build locally
- `npm run lint` – lint all JS/JSX files using flat ESLint config

## Project Structure

```
src/
├─ app/                # Redux store utilities (store, hooks)
├─ components/         # UI building blocks (shadcn-style ui + domain components)
├─ constants/          # Route names, enums, and shared constants
├─ features/           # Feature modules (auth, catalog, cart, admin, etc.)
├─ lib/                # Utility helpers (cn, formatters)
├─ mocks/              # Static data and mock API handlers
├─ providers/          # Global provider composition
├─ routes/             # Centralized router configuration
├─ services/           # API client + route maps + mock API implementations
├─ styles/             # Tailwind entrypoint and global styles
└─ main.jsx            # Application bootstrap
```

The folder layout follows a **feature-first** strategy while keeping cross-cutting primitives in clearly named directories. Each feature exposes pages, local components, hooks, and slices as needed to preserve encapsulation.

## Mock Data & API Strategy

- `src/mocks/data/*` seeds the experience with products, orders, and users.
- `src/services/api/mock.js` simulates asynchronous requests with latency.
- Swap mock functions with real `axios` calls when the backend is ready. Route helpers reside in `src/services/api/routes.js`.

## Styling System

- Tailwind configuration in `tailwind.config.js` enables class-based theming, brand palette, and motion utilities.
- UI components under `src/components/ui` follow shadcn/ui ergonomics (variants via `class-variance-authority`, composable primitives).
- Global styles (`src/styles/globals.css`) handle base typography, container paddings, and background.

## Testing Checklist

- [ ] Auth flows: login, register, reset (with mocked responses)
- [ ] Product discovery: search, filters, detail pages, add to cart
- [ ] Checkout: address form, shipping/payment selection, order creation
- [ ] Admin: dashboard stats, catalog table, orders/users management views

## Next Steps (Backend Integration)

1. Replace `src/services/api/mock.js` with real HTTP requests using `apiClient`.
2. Connect Redux thunks to live endpoints and handle error responses.
3. Implement persistent authentication (JWT refresh, secure storage).
4. Expand admin mutation flows (create/update products, manage orders).
5. Add automated tests (Vitest/RTL) and visual regression coverage as needed.

---

Built with care to be production-ready, maintainable, and a strong starting point for your full MERN commerce experience. 🚀




