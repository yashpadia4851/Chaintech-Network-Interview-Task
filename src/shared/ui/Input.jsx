
export function Input({ label, hint, error, className = "", ...props }) {
  return (
    <div className={`block ${className}`}>
      
      {label && (
        <label className="mb-1 block text-sm font-medium text-slate-800">
          {label}
        </label>
      )}

      <input
        className={`h-10 w-full rounded-lg bg-white px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 
        ${
          error
            ? "ring-1 ring-red-300 focus:ring-2 focus:ring-red-300"
            : "ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-400"
        }`}
        {...props}
      />

      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}

      {!error && hint && (
        <p className="mt-1 text-xs text-slate-500">{hint}</p>
      )}

    </div>
  );
}