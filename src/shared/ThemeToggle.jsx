import React from "react";
import { useTheme } from "../router/context/ThemeContext";

function SunIcon() {
  return (
    <svg
      className="block h-4 w-4 text-amber-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2.2M12 18.8V21M4.22 4.22 5.8 5.8M18.2 18.2l1.58 1.58M3 12h2.2M18.8 12H21M4.22 19.78 5.8 18.2M18.2 5.8 19.78 4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      className="block h-4 mt-[3px] mr-0.5 w-4 text-slate-900"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 0 1 12.21 3 7 7 0 1 0 21 12.79Z" />
    </svg>
  );
}

export function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200/70 bg-white/90 text-slate-900 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-gray-100 dark:hover:bg-neutral-800 dark:hover:border-neutral-500 dark:focus:ring-neutral-500 dark:focus:ring-offset-neutral-950 ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <span className="inline-flex items-center justify-center">
        {isDark ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
}

