import { useEffect, useMemo, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Button } from "../../../shared/ui/Button";
import { useAuth } from "../../auth/useAuth";
import { useCart } from "../../cart/useCart";

function formatRemaining(ms) {
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

const navLinkBase =
  "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors";

export default function DashboardLayout() {
  const { logout, sessionRemainingMs } = useAuth();
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const remainingText = useMemo(
    () => formatRemaining(sessionRemainingMs),
    [sessionRemainingMs],
  );

  function onLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  // Close mobile menu after navigation
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <div className="min-h-dvh bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg ring-1 ring-slate-200 hover:bg-slate-50 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span className="text-lg">{open ? "×" : "☰"}</span>
            </button>
            <Link to="/dashboard" className="font-bold text-slate-900">
              ChainTech Shop
            </Link>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <div className="text-sm text-slate-600">
              Session:{" "}
              <span className="font-semibold text-slate-900">
                {remainingText}
              </span>
            </div>
            <Button variant="secondary" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-6 md:grid-cols-[240px_1fr]">
        <aside className="md:sticky md:top-18 md:self-start">
          <div
            className={[
              "rounded-2xl bg-white p-3 ring-1 ring-slate-200",
              open ? "block" : "hidden md:block",
            ].join(" ")}
          >
            <div className="px-3 pb-3 pt-2 md:hidden">
              <div className="mt-1 text-xs text-slate-500">
                Session remaining:{" "}
                <span className="font-semibold text-slate-900">
                  {remainingText}
                </span>
              </div>
              <div className="mt-3">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </div>
              <div className="my-3 h-px bg-slate-200" />
            </div>

            <nav className="space-y-1">
              <NavLink
                to="/dashboard/products"
                className={({ isActive }) =>
                  `${navLinkBase} ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                <span>Products</span>
              </NavLink>
              <NavLink
                to="/dashboard/cart"
                className={({ isActive }) =>
                  `${navLinkBase} ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                <span>Cart</span>
                <span
                  className={[
                    "ml-3 inline-flex min-w-7 items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold",
                    "bg-slate-100 text-slate-800",
                  ].join(" ")}
                >
                  {itemCount}
                </span>
              </NavLink>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `${navLinkBase} ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                <span>Profile</span>
              </NavLink>
            </nav>
          </div>
        </aside>

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
