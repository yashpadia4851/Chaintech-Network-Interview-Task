import React from "react";

export function EmptyState({ title = "Nothing here", description, action }) {
  return (
    <div className="rounded-2xl bg-white p-6 text-center shadow-md ring-1 ring-slate-200/60 transition-colors dark:bg-neutral-900 dark:ring-neutral-700/60 dark:shadow-black/25">
      <div className="text-base font-semibold text-slate-900 dark:text-gray-100">{title}</div>
      {description ? (
        <div className="mt-1 text-sm text-slate-600 dark:text-gray-400">{description}</div>
      ) : null}
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}
