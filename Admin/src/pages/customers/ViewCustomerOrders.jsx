import { FiX } from "react-icons/fi";

const ViewCustomerOrders = ({
  selectedCustomer,
  customerOrders,
  ordersLoading,
  ordersError,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Orders of {selectedCustomer?.customerName}
          </h2>
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
        ) : customerOrders.length === 0 ? (
          <div className="p-4 text-gray-500">
            No orders found for this customer
          </div>
        ) : (
          <div className="p-4">
            <table className="w-full text-sm divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="text-xs font-medium text-gray-500 uppercase">
                  <th className="p-3 text-left">Order ID</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Items</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Product</th>
                </tr>
              </thead>
              {console.log(customerOrders)}
              <tbody>
                {customerOrders.map((order) => {
                  const firstItem = order.items?.[0];
                  const product = firstItem?.product;
                  const productImage = product?.images?.[0]?.url;

                  return (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-800">
                        {order.orderId || order._id}
                      </td>
                      <td className="p-3 text-gray-700">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-gray-700">
                        {order.items?.length || 0} items
                      </td>
                      <td className="p-3 font-medium text-gray-900">
                        ₹{order.totalAmount || 0}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status || "pending"}
                        </span>
                      </td>
                      <td className="p-3 flex items-center gap-2">
                        {productImage ? (
                          <img
                            src={productImage}
                            alt={product?.title}
                            className="w-10 h-10 object-cover rounded"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                            N/A
                          </div>
                        )}
                        <span className="text-xs text-gray-700">
                          {product?.title || "No Title"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCustomerOrders;
