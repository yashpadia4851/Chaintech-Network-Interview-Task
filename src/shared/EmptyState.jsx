import React from "react";

export function EmptyState({ title = "Nothing here", description, action }) {
  return (
    <div className="rounded-xl bg-white p-6 text-center ring-1 ring-slate-200">
      <div className="text-base font-semibold text-slate-900">{title}</div>
      {description ? (
        <div className="mt-1 text-sm text-slate-600">{description}</div>
      ) : null}
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}
