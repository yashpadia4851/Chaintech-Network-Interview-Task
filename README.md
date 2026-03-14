# E-Commerce Dashboard

A front-end e-commerce dashboard with authentication, product browsing, cart, and profile management. No backend — auth and cart data are stored in the browser via `localStorage`. Built with React, Vite, and Tailwind CSS.

---

## Project overview

- **Purpose:** Demo dashboard for browsing products, managing a cart, and maintaining a user profile behind login.
- **Auth:** Register and login with email/password. Sessions are stored in `localStorage` and expire after **5 minutes**; protected routes redirect unauthenticated users to the login page.
- **Products:** Grid of products (from Fake Store API) with search, infinite scroll, and add-to-cart. Each product shows image, title, rating, category, and price.
- **Cart:** Add items, adjust quantity (increment/decrement), remove items, view order summary and total. Cart state persists in `localStorage` and is reflected in the navbar (desktop: nav link with cart icon and red count badge; mobile: cart with icon and badge inside the sidebar menu).
- **Profile:** View and update name, email, and password (with validation: min length, no spaces). Updates are stored in `localStorage`.
- **UI/UX:** Responsive layout (mobile sidebar, desktop top nav), dark/light theme toggle (persisted), form validation (react-hook-form), and toast notifications (react-hot-toast) for errors and success.

---

## Tech stack

- **React** (Vite)
- **React Router** (protected and public routes)
- **Tailwind CSS** (styling, dark mode via class)
- **Fake Store API** (products)
- **react-hook-form** (forms and validation)
- **react-hot-toast** (notifications)
- **react-intersection-observer** (infinite scroll)
- No backend; `localStorage` for users, session, and cart

---

## Features

- Register and login (email/password, validation: password min 4 chars, no spaces; name on register min 5 chars)
- Protected dashboard routes; session expiry with toast prompt to log in again
- Products page: grid, search by title, infinite scroll, loading and error states
- Cart: add, update quantity, remove, clear cart, order summary and total
- Profile: edit name, email, password (with validation)
- Dark/light theme with persistent preference and smooth transitions
- Responsive navbar: desktop (Products, Cart with icon + red badge, Profile, theme toggle, session timer, logout); mobile (theme toggle, menu; cart with icon + red badge in sidebar only)
- Toasts for invalid login, session expiry, profile update, and other feedback

---

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (e.g. `https://e-commerce-task-by-ctn.netlify.app`).

---

## Build and deploy

- **Build:** `npm run build`
- **Output:** `dist`
- **Hosting (Netlify):** Use the above build command and output directory; configure redirects so all routes serve `index.html` (SPA).
