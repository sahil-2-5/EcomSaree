import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { BannerProvider } from "./context/BannerContext";
import AppRoutes from "./RoutePath/RoutesPath";

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <BannerProvider>
          <AppRoutes />
        </BannerProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
