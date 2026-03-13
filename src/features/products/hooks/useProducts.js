import { useEffect, useRef, useState } from "react";
import axios from "axios";

const API_URL = "https://dummyjson.com/products";
const PAGE_SIZE = 15

export function useProducts() {
  const [state, setState] = useState({
    loading: true,
    error: "",
    products: [],
    total: null,
    hasMore: true,
    loadingMore: false,
  });
  const skipRef = useRef(0);

  useEffect(() => {
    async function loadInitial() {
      setState({
        loading: true,
        error: "",
        products: [],
        total: null,
        hasMore: true,
        loadingMore: false,
      });
      try {
        const response = await axios.get(
          `${API_URL}?limit=${PAGE_SIZE}&skip=0`,
        );
        const products = response?.data?.products ?? [];
        const total = response?.data?.total ?? products.length;
        skipRef.current = products.length;

        setState({
          loading: false,
          error: "",
          products,
          total,
          hasMore: products.length < total,
          loadingMore: false,
        });
      } catch (err) {
        setState({
          loading: false,
          error: err?.message || "Something went wrong.",
          products: [],
          total: null,
          hasMore: false,
          loadingMore: false,
        });
      }
    }

    loadInitial();
  }, []);

  async function loadMore() {
    if (state.loadingMore || !state.hasMore) return;

    setState((prev) => ({ ...prev, loadingMore: true }));

    try {
      const currentSkip = skipRef.current;
      const response = await axios.get(
        `${API_URL}?limit=${PAGE_SIZE}&skip=${currentSkip}`,
      );
      const nextProducts = response?.data?.products ?? [];
      const totalFromApi = response?.data?.total;

      skipRef.current = currentSkip + nextProducts.length;

      setState((prev) => {
        const merged = [
          ...prev.products,
          ...nextProducts.filter(
            (p) => !prev.products.some((existing) => existing.id === p.id),
          ),
        ];
        const total = totalFromApi ?? prev.total ?? merged.length;
        return {
          ...prev,
          products: merged,
          total,
          hasMore: merged.length < total,
          loadingMore: false,
        };
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err?.message || "Something went wrong.",
        loadingMore: false,
      }));
    }
  }

  return {
    loading: state.loading,
    error: state.error,
    products: state.products,
    hasMore: state.hasMore,
    loadingMore: state.loadingMore,
    loadMore,
  };
}
