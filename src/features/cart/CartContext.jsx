import React, { createContext, useCallback, useEffect, useMemo, useReducer } from "react";
import { useAuth } from "../auth/useAuth";
import { readCart, writeCart } from "./cartStorage";

export const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "SET":
      return { ...state, items: action.items };
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i,
          ),
        };
      }
      return { ...state, items: [{ ...action.item, qty: 1 }, ...state.items] };
    }
    case "INC":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: i.qty + 1 } : i,
        ),
      };
    case "DEC":
      return {
        ...state,
        items: state.items
          .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
          .filter((i) => i.qty > 0),
      };
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(reducer, { items: [] });

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      dispatch({ type: "SET", items: [] });
      return;
    }
    dispatch({ type: "SET", items: readCart(user.id) });
  }, [isAuthenticated, user?.id]);

  // persist cart
  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;
    writeCart(user.id, state.items);
  }, [isAuthenticated, user?.id, state.items]);

  const addToCart = useCallback((product) => {
    dispatch({
      type: "ADD",
      item: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      },
    });
  }, []);

  const inc = useCallback((id) => dispatch({ type: "INC", id }), []);
  const dec = useCallback((id) => dispatch({ type: "DEC", id }), []);
  const remove = useCallback((id) => dispatch({ type: "REMOVE", id }), []);
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const totals = useMemo(() => {
    const itemCount = state.items.reduce((acc, i) => acc + i.qty, 0);
    const total = state.items.reduce((acc, i) => acc + i.qty * i.price, 0);
    return { itemCount, total };
  }, [state.items]);

  const value = useMemo(
    () => ({
      items: state.items,
      addToCart,
      inc,
      dec,
      remove,
      clear,
      ...totals,
    }),
    [state.items, addToCart, inc, dec, remove, clear, totals],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

