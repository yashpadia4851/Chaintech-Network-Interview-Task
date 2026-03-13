export async function fetchProducts({ signal } = {}) {
  const res = await fetch("https://fakestoreapi.com/products", { signal });
  if (!res.ok) {
    throw new Error(`Failed to load products (${res.status})`);
  }
  return await res.json();
}

