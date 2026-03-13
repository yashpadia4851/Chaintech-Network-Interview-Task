# Authentication-Based E-Commerce Dashboard (No Backend)

## Tech
- React (Vite)
- React Router
- Tailwind CSS
- Product API: Fake Store API
- No backend (all auth/cart data stored in `localStorage`)

## Features
- Register + Login (stored in `localStorage`)
- Protected dashboard routes (cannot access without login)
- Time-bound session (expires after **5 minutes**)
- Products grid with loading + error states + search
- Cart: add, prevent duplicates (increments qty), qty +/- , remove, totals
- Profile: view/edit name/email/password
- Fully responsive UI (mobile/tablet/desktop)

## Run locally

```bash
npm i
npm run dev
```

## Deploy (Vercel / Netlify)
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **SPA routing**: ensure redirects route all paths to `index.html`

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
