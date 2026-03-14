import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./features/auth/context/AuthContext.jsx";
import { CartProvider } from "./features/cart/context/CartContext.jsx";
import { ThemeProvider } from "./router/context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
          <App />
          <Toaster position="top-center" />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
