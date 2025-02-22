'use client'; // Mark this as a Client Component

import { CartProvider } from "./context/CartContext";

export function Providers({ children }) {
  return <CartProvider>{children}</CartProvider>;
}