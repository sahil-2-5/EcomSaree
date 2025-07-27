import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { BannerProvider } from "./context/BannerContext";
import AppRoutes from "./RoutePath/RoutesPath";
import { OrderProvider } from "./context/OrderContext";
import { CustomerProvider } from "./context/CustomerContext";
import { ProductReviewProvider } from "./context/ProductReviewContext";

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <BannerProvider>
          <OrderProvider>
            <CustomerProvider>
              <ProductReviewProvider>
                <AppRoutes />
              </ProductReviewProvider>
            </CustomerProvider>
          </OrderProvider>
        </BannerProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
