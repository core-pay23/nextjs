# Project Folder Structure

This document provides a detailed overview of the folder and file structure for the `lisk-payment-gateway` project. Use this as a reference for understanding the organization of code, assets, and configuration files.

---

## Root Directory
- `design-reference.md` — Design documentation and references.
- `jsconfig.json` — JavaScript project configuration.
- `next.config.mjs` — Next.js configuration.
- `package.json` — Project dependencies and scripts.
- `postcss.config.mjs` — PostCSS configuration.
- `PROVIDERS_HOOKS.md` — Documentation for providers and hooks.

## prisma/
- `dev.db` — SQLite database file for development.
- `schema.prisma` — Prisma schema definition.
- `test-prisma.js` — Test script for Prisma.
- `migrations/` — Database migration files.
  - `migration_lock.toml` — Migration lock file.
  - `20250731163059_init/` — Initial migration folder.
    - `migration.sql` — SQL migration script.

## public/
- SVG and image assets for the frontend (e.g., `file.svg`, `globe.svg`, etc.).

## src/
### app/
- `favicon.ico` — App icon.
- `globals.css` — Global CSS styles.
- `layout.js` — Main layout component.
- `page.js` — Main page component.
- `api/` — API route handlers.
  - `create-payment/route.js` — Create payment API endpoint.
  - `get-eoa-address/route.js` — Get EOA address API endpoint.
- `dashboard/` — Dashboard pages and components.
  - `layout.js` — Dashboard layout.
  - `page.jsx` — Dashboard main page.
  - `_components/` — Dashboard-specific components (e.g., `createPaymentModal.jsx`).
- `example/` — Example code and usage.
  - `example.js` — Example script.
- `pay/` — Payment-related pages and components.
  - `[uniqueId]/` — Dynamic route for unique payment IDs.
    - `layout.js` — Layout for payment page.
    - `page.jsx` — Payment page component.
    - `_components/` — Payment-specific components (e.g., `CustomConnectButton.jsx`, `PaymentContainer.jsx`, etc.).
  - `get_trx/` — Transaction retrieval pages.
    - `[id]/page.js` — Dynamic route for transaction ID.

### components/
- Shared React components for the app.
- `dashboard/` — Dashboard-specific components (e.g., `ArtistsTable.jsx`, `ChartCard.jsx`, etc.).
- `generated/` — Generated Prisma client files and runtime.

### hooks/
- Custom React hooks (e.g., `useCrosschainTransfer.js`, `useDashboard.js`, etc.).

### lib/
- Utility libraries and helpers.
- `contracts/` — Smart contract interaction modules (e.g., `erc20.js`, `mockUSDC.js`, `paymentGateway.js`).
- `utils/` — General utility functions (e.g., `strings.js`).

### providers/
- React context providers and configuration (e.g., `AppProviders.jsx`, `wagmi-config.js`).

---

This structure supports a modular, scalable, and maintainable codebase for a Next.js-based payment gateway application with Prisma ORM and custom hooks/components.
