import React, { useMemo } from "react";
import { Button } from "../../../shared/ui/Button";
import { formatCurrency } from "../../../shared/lib/format";
import { useCart } from "../../cart/useCart";

export function ProductCard({ product }) {
  const { id, thumbnail, title, price, rating, category } = product;
  const { addToCart, items } = useCart();

  const inCart = useMemo(
    () => items.some((item) => item.id === id),
    [items, id],
  );

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
      <div className="aspect-square bg-white p-6">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="line-clamp-2 text-sm font-semibold text-slate-900">
          {title}
        </div>

        {/* <div className="flex items-center gap-2 text-xs text-slate-600">
          <span>⭐ {rating}</span>
          <span>•</span>
          <span>{category}</span>
        </div> */}

        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="text-sm font-bold text-slate-900">
            {formatCurrency(price)}
          </div>

          <Button
            size="sm"
            variant={inCart ? "secondary" : "primary"}
            onClick={() => addToCart(product)}
          >
            {inCart ? "Add again" : "Add to cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
