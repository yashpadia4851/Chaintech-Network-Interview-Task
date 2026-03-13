import React, { useMemo } from "react";
import { Button } from "../../../shared/ui/Button";
import { formatCurrency } from "../../../shared/lib/format";
import { useCart } from "../../cart/useCart";

export function ProductCard({ product }) {
  const { id, title, price, rating, category } = product;
  const imageUrl = product.images?.[0] || product.image;
  const { addToCart, inc, dec, items } = useCart();

  const cartQty = useMemo(
    () => items.find((item) => item.id === id)?.qty ?? 0,
    [items, id],
  );

  const productForCart = { ...product, image: imageUrl };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
      <div className="aspect-square bg-white p-6">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="line-clamp-2 text-sm font-semibold text-slate-900">
          {title}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span>⭐ {rating}</span>
          <span>•</span>
          <span>{category}</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="text-sm font-bold text-slate-900">
            {formatCurrency(price)}
          </div>

          {cartQty > 0 ? (
            <div className="inline-flex items-center justify-between rounded-full bg-emerald-800 px-3 py-1.5 text-white">
              <button
                type="button"
                onClick={() => dec(id)}
                aria-label="Decrease quantity"
                className="flex h-6 w-6 cursor-pointer items-center justify-center text-base font-medium hover:opacity-80"
              >
                −
              </button>
              <span className="min-w-6 text-center text-sm font-semibold">
                {cartQty}
              </span>
              <button
                type="button"
                onClick={() => inc(id)}
                aria-label="Increase quantity"
                className="flex h-6 w-6 cursor-pointer items-center justify-center text-base font-medium hover:opacity-80"
              >
                +
              </button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="primary"
              onClick={() => addToCart(productForCart)}
            >
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
