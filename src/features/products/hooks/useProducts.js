import { useEffect, useState } from "react";
import { fetchProducts } from "../products.api";

export function useProducts() {
  const [state, setState] = useState({
    loading: true,
    error: "",
    data: [],
  });

  useEffect(() => {
    const controller = new AbortController();
    setState({ loading: true, error: "", data: [] });
    fetchProducts({ signal: controller.signal })
      .then((data) => setState({ loading: false, error: "", data }))
      .catch((err) => {
        if (controller.signal.aborted) return;
        setState({
          loading: false,
          error: err?.message || "Something went wrong.",
          data: [],
        });
      });
    return () => controller.abort();
  }, []);

  return state;
}

