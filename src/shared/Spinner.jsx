import React from "react";

export function Spinner({ className = "" }) {
  return (
    <span
      className={`inline-block h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900 dark:border-gray-600 dark:border-t-gray-100 ${className}`}
      aria-label="Loading"
      role="status"
    />
  );
}
