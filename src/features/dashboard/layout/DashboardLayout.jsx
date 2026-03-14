import { useEffect, useMemo, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Button } from "../../../shared/Button";
import { ThemeToggle } from "../../../shared/ThemeToggle";
import { useAuth } from "../../auth/useAuth";
import { useCart } from "../../cart/useCart";

function formatRemaining(ms) {
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

const navLinkBase =
  "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium transition-colors sm:text-base";

export default function DashboardLayout() {
  const { logout, sessionRemainingMs } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const remainingText = useMemo(
    () => formatRemaining(sessionRemainingMs),
    [sessionRemainingMs],
  );

  function onLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-dvh bg-slate-100/80 transition-colors duration-300 dark:bg-neutral-950">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-black/25">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link
            to="/dashboard"
            className="text-base font-bold tracking-tight text-slate-900 transition-colors dark:text-gray-100 sm:text-lg"
          >
            E-Commerce Dashboard
          </Link>

          <div className="hidden items-center gap-4 md:flex">
            <nav className="flex items-center gap-2 rounded-full px-2 py-1">
              <NavLink
                to="/dashboard/products"
                className={({ isActive }) =>
                  `${navLinkBase} ${
                    isActive
                      ? "bg-slate-900 text-white dark:bg-gray-200 dark:text-gray-900"
                      : "text-slate-700 hover:bg-white dark:text-gray-300 dark:hover:bg-gray-800"
                  }`
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/dashboard/cart"
                className={({ isActive }) =>
                  `${navLinkBase} ${
                    isActive
                      ? "bg-slate-900 text-white dark:bg-gray-200 dark:text-gray-900"
                      : "text-slate-700 hover:bg-white dark:text-gray-300 dark:hover:bg-gray-800"
                  }`
                }
              >
                <span>Cart</span>
                <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-slate-900 px-2 py-0.5 text-[11px] font-semibold text-white dark:bg-gray-200 dark:text-gray-900">
                  {itemCount}
                </span>
              </NavLink>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `${navLinkBase} ${
                    isActive
                      ? "bg-slate-900 text-white dark:bg-gray-200 dark:text-gray-900"
                      : "text-slate-700 hover:bg-white dark:text-gray-300 dark:hover:bg-gray-800"
                  }`
                }
              >
                Profile
              </NavLink>
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="mr-3 text-sm text-slate-600 transition-colors dark:text-gray-400">
                Session{" "}
                <span className="font-semibold text-slate-900 dark:text-gray-200">
                  {remainingText}
                </span>
              </div>
              <Button variant="secondary" size="sm" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1 ring-slate-200 hover:bg-slate-50 transition-colors dark:ring-gray-600 dark:hover:bg-gray-800 md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="text-lg text-slate-700 dark:text-gray-200">☰</span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 flex justify-end md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          type="button"
          className="h-full flex-1 bg-black/50"
          aria-label="Close menu"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`relative flex min-h-dvh w-80 max-w-full flex-col bg-white text-slate-900 shadow-xl transition-transform duration-300 ease-out dark:bg-neutral-900 dark:text-gray-100 dark:shadow-black/40 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-gray-700">
            <span className="text-xl font-semibold tracking-tight">Menu</span>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xl hover:bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
              aria-label="Close menu"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ×
            </button>
          </div>

          <nav className="mt-6 flex-1 space-y-2 px-5 text-xl font-medium">
            <NavLink
              to="/dashboard/products"
              className={({ isActive }) =>
                `flex items-center justify-between rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-gray-200 dark:text-gray-900"
                    : "text-slate-700 hover:bg-slate-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`
              }
            >
              <span>Products</span>
            </NavLink>

            <NavLink
              to="/dashboard/cart"
              className={({ isActive }) =>
                `flex items-center justify-between rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-gray-200 dark:text-gray-900"
                    : "text-slate-700 hover:bg-slate-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`
              }
            >
              <span>Cart</span>

              <span className="inline-flex min-w-8 items-center justify-center rounded-full bg-slate-900 px-2 py-1 text-sm font-semibold text-white dark:bg-gray-200 dark:text-gray-900">
                {itemCount}
              </span>
            </NavLink>

            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center justify-between rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-gray-200 dark:text-gray-900"
                    : "text-slate-700 hover:bg-slate-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`
              }
            >
              <span>Profile</span>
            </NavLink>
          </nav>

          <div className="mx-5 my-4 h-[2px] bg-slate-200 dark:bg-gray-700" />

          <div className="space-y-4 px-5 py-5">
            <div className="flex items-center justify-center gap-2 text-lg text-slate-700 dark:text-gray-300">
              <span className="font-medium">Session:</span>
              <span className="font-bold text-slate-900 dark:text-gray-100">{remainingText}</span>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full rounded-full text-lg font-semibold"
              onClick={onLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
