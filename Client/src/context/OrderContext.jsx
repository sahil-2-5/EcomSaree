import { createContext, useContext, useState } from "react";
import axios from "axios";

// Create context
const OrderContext = createContext();

// Hook to use context
export const useOrder = () => useContext(OrderContext);

// Provider component
export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Step 1: Create Razorpay order
  const createOrder = async (amount) => {
    try {
      setIsPlacingOrder(true);
      const { data } = await axios.post(
        "http://localhost:2525/user/create-order",
        { amount },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (data.success && data.order) {
        setOrder(data.order); // Razorpay order object
        setIsPlacingOrder(false);
        return data.order;
      } else {
        throw new Error(data.message || "Failed to create Razorpay order");
      }
    } catch (err) {
      setIsPlacingOrder(false);
      setError(
        err.response?.data?.error || err.message || "Order creation error"
      );
      throw err;
    }
  };

  // ✅ Step 2: Open Razorpay and verify payment
  const openRazorpay = async ({ amount, items, shippingAddress, navigate, clearCart }) => {
    try {
      const razorpayOrder = await createOrder(amount);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // From .env
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Balaji Paithani",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              "http://localhost:2525/user/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                items,
                shippingAddress,
                totalAmount: amount,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );

            if (verifyRes.data.success) {
              alert(
                "✅ Payment Successful! Order ID: " +
                  verifyRes.data.order.orderId
              );
              setOrder(verifyRes.data.order); // Saved backend order object

              // ✅ Clear cart and redirect to confirmation page
              if (clearCart) clearCart();
              if (navigate) navigate("/order-confirmation");
            } else {
              alert("❌ Payment verification failed");
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("❌ Payment verification error");
          }
        },
        prefill: {
          name: "balajipaithani",
          email: "balajipaitanifashion@gmail.com",
          contact: "9724690334",
        },
        theme: {
          color: "#528ff0",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay init failed:", err);
      alert("❌ Unable to launch Razorpay: " + err.message);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        isPlacingOrder,
        error,
        createOrder,
        openRazorpay,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
