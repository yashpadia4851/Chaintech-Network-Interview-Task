import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "../../../shared/Button";
import { EmptyState } from "../../../shared/EmptyState";
import { formatCurrency } from "../../../utils/format";
import { useCart } from "../hooks/useCart";
import { CartItemRow } from "../components/CartItemRow";

export default function CartPage() {
  const { items, inc, dec, remove, clear, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="space-y-4">
        <div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-gray-100">
            Cart
          </div>
          <div className="mt-1 text-sm text-slate-600 dark:text-gray-400">
            Your cart is currently empty.
          </div>
        </div>
        <EmptyState
          title="Cart is empty"
          description="Add products to see them here."
          action={
            <Button as={Link} to="/dashboard/products">
              Browse products
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-gray-100">
            Cart
          </div>
          <div className="mt-1 text-sm text-slate-600 dark:text-gray-400">
            {itemCount} item(s) • Total {formatCurrency(total)}
          </div>
        </div>
        <Button variant="secondary" onClick={clear}>
          Clear cart
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          {items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onInc={inc}
              onDec={dec}
              onRemove={remove}
            />
          ))}
        </div>

        <div className="lg:sticky lg:top-[96px] lg:self-start">
          <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-200/60 transition-colors dark:bg-neutral-900 dark:ring-neutral-700/60 dark:shadow-black/25">
            <div className="text-base font-semibold text-slate-900 dark:text-gray-100">
              Order summary
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between text-slate-700 dark:text-gray-300">
                <span>Items</span>
                <span className="font-medium">{itemCount}</span>
              </div>
              <div className="flex items-center justify-between text-slate-700 dark:text-gray-300">
                <span>Subtotal</span>
                <span className="font-medium">{formatCurrency(total)}</span>
              </div>
              <div className="my-3 h-px bg-slate-200 dark:bg-neutral-600" />
              <div className="flex items-center justify-between text-slate-900 dark:text-gray-100">
                <span className="font-semibold">Total</span>
                <span className="text-lg font-bold">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
            <Button
              className="mt-4 w-full"
              onClick={() =>
                toast.success("success message")
              }
            >
              Buy Now
            </Button>
            <Button
              as={Link}
              to="/dashboard/products"
              variant="secondary"
              className="mt-3 w-full"
            >
              Continue shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
