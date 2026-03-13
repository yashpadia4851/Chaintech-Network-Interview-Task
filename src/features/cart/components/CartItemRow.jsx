import React from "react";
import { Button } from "../../../shared/ui/Button";
import { formatCurrency } from "../../../shared/lib/format";

export function CartItemRow({ item, onInc, onDec, onRemove }) {
  const subtotal = item.qty * item.price;
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 flex-none overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-100">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-contain p-2"
            loading="lazy"
          />
        </div>
        <div className="min-w-0">
          <div className="line-clamp-2 text-sm font-semibold text-slate-900">
            {item.title}
          </div>
          <div className="mt-1 text-xs text-slate-600">
            {formatCurrency(item.price)} each
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-between gap-3 sm:justify-end">
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onDec(item.id)}
            aria-label="Decrease quantity"
          >
            −
          </Button>
          <span className="w-10 text-center text-sm font-semibold text-slate-900">
            {item.qty}
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onInc(item.id)}
            aria-label="Increase quantity"
          >
            +
          </Button>
        </div>

        <div className="text-right">
          <div className="text-sm font-bold text-slate-900">
            {formatCurrency(subtotal)}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="mt-1 text-red-700 hover:bg-red-50"
            onClick={() => onRemove(item.id)}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
