import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { BannerProvider } from "./context/BannerContext";
import AppRoutes from "./RoutePath/RoutesPath";
import { OrderProvider } from "./context/OrderContext";
import { CustomerProvider } from "./context/CustomerContext";

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <BannerProvider>
          <OrderProvider>
            <CustomerProvider>
              <AppRoutes />
            </CustomerProvider>
          </OrderProvider>
        </BannerProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
