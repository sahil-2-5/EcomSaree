import React from "react";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastProvider } from "./context/ToastContext";
import { ProductProvider } from "./context/ProductContext";
import AppRoutes from "./RoutePath/RoutesPath";

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <AppRoutes />
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
