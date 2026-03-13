import React, { useMemo, useState } from "react";
import { Spinner } from "../../../shared/ui/Spinner";
import { EmptyState } from "../../../shared/ui/EmptyState";
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/ProductCard";

export default function ProductsPage() {
  const { loading, error, data } = useProducts();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((p) => String(p.title).toLowerCase().includes(q));
  }, [data, query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-2xl font-bold tracking-tight text-slate-900">
            Products
          </div>
          <div className="mt-1 text-sm text-slate-600">
            Browse and add items to your cart.
          </div>
        </div>
        <label className="block w-full sm:w-80">
          <span className="mb-1 block text-sm font-medium text-slate-800">
            Search
          </span>
          <input
            className="h-10 w-full rounded-lg bg-white px-3 text-sm text-slate-900 ring-1 ring-inset ring-slate-200 outline-none focus:ring-2 focus:ring-slate-400"
            placeholder="Search by title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>

      {loading ? (
        <div className="rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200">
          <div className="mx-auto flex w-fit items-center gap-3 text-sm text-slate-700">
            <Spinner />
            <span>Loading products...</span>
          </div>
        </div>
      ) : error ? (
        <div className="rounded-2xl bg-red-50 p-6 text-sm text-red-700 ring-1 ring-red-100">
          {error}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Try a different search term."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
