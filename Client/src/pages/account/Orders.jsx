import { useEffect, useState } from "react";
import { FaBoxOpen, FaTruck, FaCheckCircle, FaRupeeSign } from "react-icons/fa";
import { useOrder } from "../../context/OrderContext";
import { useAuth } from "../../context/AuthContext";

const Orders = () => {
  const { fetchOrderByUserId, loading, error } = useOrder();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?._id) {
        setIsLoading(true);
        try {
          const orderData = await fetchOrderByUserId(user._id);
          if (orderData) {
            const transformedOrders = transformBackendData(orderData);
            setOrders(transformedOrders);
          }
        } catch (err) {
          console.error("Failed to fetch orders:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchOrders();
  }, [user?._id, fetchOrderByUserId]);

  const transformBackendData = (backendOrders) => {
    const ordersArray = Array.isArray(backendOrders) ? backendOrders : [backendOrders];
    
    return ordersArray.map(order => {
      const items = (order.items || []).map(item => {
        const price = parseFloat(item.price || item.product?.price || 0);
        return {
          name: item.product?.title || "Unknown Product",
          qty: item.quantity || 1,
          unitPrice: price,
          price: `${item.price.toFixed(2)} /-`,
          image: item.product?.images?.[0]?.url || "https://via.placeholder.com/80x80.png?text=Product"
        };
      });

      const subtotal = items.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
      const shipping = parseFloat(order.shippingCharge || 0);
      const discount = parseFloat(order.discount || 0);
      const tax = parseFloat(order.tax || 0);
      const total = subtotal + shipping + tax - discount;

      return {
        id: order.orderId || order._id || "N/A",
        date: order.createdAt 
          ? new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          : "Date not available",
        status: order.status || "Processing",
        paymentMethod: order.paymentMethod || "Unknown",
        items,
        summary: {
          subtotal,
          shipping,
          discount,
          tax,
          total
        }
      };
    });
  };

  if (loading || isLoading) {
    return (
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Orders</h2>
        <p className="text-sm text-gray-500">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Orders</h2>
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <FaBoxOpen className="text-gray-400 text-4xl mb-2" />
          <p className="text-sm text-gray-500">You have no orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-pink-100 rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between mb-2">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    Order ID:{" "}
                    <span className="font-medium text-gray-800">
                      {order.id}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Order Date: {order.date}
                  </p>
                  <p className="text-sm text-gray-600">
                    Payment Method: {order.paymentMethod}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                  {order.status === "Delivered" ? (
                    <>
                      <FaCheckCircle className="text-green-500" />
                      Delivered
                    </>
                  ) : order.status === "Shipped" ? (
                    <>
                      <FaTruck className="text-yellow-500" />
                      Shipped
                    </>
                  ) : (
                    <>
                      <FaBoxOpen className="text-blue-500" />
                      {order.status}
                    </>
                  )}
                </div>
              </div>

              <div className="divide-y divide-gray-100 mt-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center py-3 gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover border"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.qty} × {item.price}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">
                      {(item.unitPrice * item.qty).toFixed(2)} /-
                    </p>
                  </div>
                ))}
              </div>

              {/* Simplified Order Summary - Only Total */}
              {order.summary && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center font-semibold text-gray-800">
                    <span className="text-md">Total Amount:</span>
                    <span className="flex items-center text-lg">
                      <FaRupeeSign className="mr-1" />
                      {(order.summary.total || 0).toFixed(2)} /-
                    </span>
                  </div>
                </div>
              )}

            
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;