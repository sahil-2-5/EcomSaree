import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastProvider } from "./context/ToastContext";
import { AddressProvider } from "./context/AddressContext";
import { ProductProvider } from "./context/ProductContext";
import AppRoutes from "./RoutePath/RoutesPath";
import { BannerProvider } from "./context/BannerContext";
import { OrderProvider } from "./context/OrderContext";
import { ProductReviewProvider } from "./context/ProductReviewContext";

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <AddressProvider>
                <BannerProvider>
                  <OrderProvider>
                    <ProductReviewProvider>
                      <AppRoutes />
                    </ProductReviewProvider>
                  </OrderProvider>
                </BannerProvider>
              </AddressProvider>
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
