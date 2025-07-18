import { createContext, useContext, useState } from "react";
import axios from "axios";

// Create context
const OrderContext = createContext();

// Provider component
export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Create Razorpay order
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

      if (data.success && data.razorpayOrder && data.localOrder) {
        setOrder(data.localOrder); // Store the MongoDB order
        return data.razorpayOrder; // ✅ Return Razorpay order to open Razorpay window
      } else {
        throw new Error(data.message || "Failed to create Razorpay order");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || err.message || "Order creation error"
      );
      throw err;
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Open Razorpay and verify payment
  const openRazorpay = async ({
    amount,
    items,
    shippingAddress,
    navigate,
    clearCart,
    onSuccess,
    onError,
  }) => {
    try {
      setIsProcessing(true);

      // Validate shipping address
      const requiredAddressFields = [
        "name",
        "email",
        "phone",
        "address",
        "city",
        "state",
        "pincode",
      ];

      for (const field of requiredAddressFields) {
        if (!shippingAddress[field]) {
          throw new Error(`Missing shipping address field: ${field}`);
        }
      }

      // Validate items
      if (!items || items.length === 0) {
        throw new Error("Cart is empty");
      }

      // Create Razorpay order
      const razorpayOrder = await createOrder(amount);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Balaji Paithani",
        description: `Payment for ${items.length} items`,
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            setIsProcessing(true);

            // Prepare verification data
            const verificationData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              items: items.map((item) => ({
                product: item.id || item.product?._id || item.product?.$oid,
                title: item.name || item.title || `Product ${item.id}`,
                quantity: item.quantity || 1,
                price: item.price || item.product?.sellingPrice,
              })),
              shippingAddress,
              totalAmount: amount,
            };

            const verifyRes = await axios.post(
              "http://localhost:2525/user/verify-payment",
              verificationData,
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );

            if (verifyRes.data.success) {
              if (clearCart) clearCart();

              if (onSuccess) {
                onSuccess(verifyRes.data.order);
              } else if (navigate) {
                navigate("/order-confirmation", {
                  state: { order: verifyRes.data.order },
                });
              }
            } else {
              throw new Error(
                verifyRes.data.message || "Payment verification failed"
              );
            }
          } catch (error) {
            console.error("Verification error:", error);
            if (onError) {
              onError(error);
            } else {
              setError(error.message);
            }
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: shippingAddress.name,
          email: shippingAddress.email,
          contact: shippingAddress.phone,
        },
        theme: {
          color: "#F472B6",
        },
        modal: {
          ondismiss: () => {
            setError("Payment window was closed without completing payment");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", function (response) {
        const error = new Error(response.error.description || "Payment failed");
        if (onError) {
          onError(error);
        } else {
          setError(error.message);
        }
      });
    } catch (err) {
      console.error("Checkout error:", err);
      if (onError) {
        onError(err);
      } else {
        setError(err.message);
      }
    } finally {
      setIsProcessing(false);
    }
  };

    // Fetch Order by ID
  const fetchOrderByUserId = async (id) => {
    try {
      const res = await axios.get(`http://localhost:2525/user/get-my-orders/${id}`, {
        withCredentials: true,
      });
      setError(null);
      return res.data.orders;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch order");
      return null;
    } finally {
    }
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        isPlacingOrder,
        isProcessing,
        error,
        setError,
        createOrder,
        openRazorpay,
        fetchOrderByUserId
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
