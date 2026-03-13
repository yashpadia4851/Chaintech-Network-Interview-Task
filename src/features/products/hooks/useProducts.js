import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://dummyjson.com/products";

export function useProducts() {
  const [state, setState] = useState({
    loading: true,
    error: "",
    data: [],
  });

  useEffect(() => {
    async function load() {
      setState({ loading: true, error: "", data: [] });
      try {
        const response = await axios.get(API_URL);
        const products = response?.data?.products ?? [];
        setState({ loading: false, error: "", data: products });
      } catch (err) {
        setState({
          loading: false,
          error: err?.message || "Something went wrong.",
          data: [],
        });
      }
    }

    load();
  }, []);

  return state;
}
