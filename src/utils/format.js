export function formatCurrency(value) {
  const number = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(number)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
}

