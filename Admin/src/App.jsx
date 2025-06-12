import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import AppRoutes from "./RoutePath/RoutesPath";

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <AppRoutes />
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
