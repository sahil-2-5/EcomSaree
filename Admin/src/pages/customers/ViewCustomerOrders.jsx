import { FiX } from "react-icons/fi";

const ViewCustomerOrders = ({
  selectedCustomer,
  customerOrders,
  ordersLoading,
  ordersError,
  onClose,
}) => {
  // Calculate total orders count
  const totalOrdersCount = customerOrders?.length || 0;

  // Safely get the first available image URL
  const getProductImage = (product) => {
    if (!product?.images || product.images.length === 0) {
      return "https://via.placeholder.com/40?text=No+Image";
    }
    
    // Handle both array of objects with url property and array of strings
    const firstImage = product.images[0];
    return typeof firstImage === 'string' ? firstImage : firstImage.url;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">
              Orders of {selectedCustomer?.customerName || "Customer"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Total Orders: {totalOrdersCount}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>
        {ordersLoading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-600"></div>
          </div>
        ) : ordersError ? (
          <div className="p-4 text-red-500">{ordersError}</div>
        ) : customerOrders?.length === 0 ? (
          <div className="p-4 text-gray-500">
            No orders found for this customer
          </div>
        ) : (
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="text-xs font-medium text-gray-500 uppercase">
                    <th className="p-3 text-left">Order ID</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Items</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Payment</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Products</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {customerOrders?.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-800">
                        {order.orderId}
                      </td>
                      <td className="p-3 text-gray-700">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-gray-700">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </td>
                      <td className="p-3 font-medium text-gray-900">
                        ₹{order.totalAmount.toLocaleString()}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            order.paymentStatus === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            order.orderStatus === "completed"
                              ? "bg-green-100 text-green-800"
                              : order.orderStatus === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col gap-2">
                          {order.items.map((item, index) => {
                            const productTitle = item.product?.title || 'Unknown Product';
                            const productPrice = item.price?.toLocaleString() || '0';
                            const imageUrl = getProductImage(item.product);
                            
                            return (
                              <div key={index} className="flex items-center gap-2">
                                <img
                                  src={imageUrl}
                                  alt={productTitle}
                                  className="w-10 h-10 object-cover rounded"
                                  onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/40?text=No+Image";
                                  }}
                                />
                                <div>
                                  <p className="text-xs font-medium text-gray-800 line-clamp-1">
                                    {productTitle}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    ₹{productPrice}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCustomerOrders;