import { FaBoxOpen, FaTruck, FaCheckCircle } from "react-icons/fa";

const Orders = () => {
  const orders = [
    {
      id: "ORD123456",
      date: "June 25, 2025",
      status: "Delivered",
      items: [
        {
          name: "Wireless Headphones",
          qty: 1,
          price: "$99.99",
          image:
            "https://via.placeholder.com/80x80.png?text=Headphones",
        },
        {
          name: "Bluetooth Speaker",
          qty: 1,
          price: "$49.99",
          image:
            "https://via.placeholder.com/80x80.png?text=Speaker",
        },
      ],
    },
    {
      id: "ORD654321",
      date: "June 15, 2025",
      status: "Shipped",
      items: [
        {
          name: "Smart Watch",
          qty: 1,
          price: "$129.00",
          image:
            "https://via.placeholder.com/80x80.png?text=Watch",
        },
      ],
    },
  ];

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-sm text-gray-500">You have no orders yet.</p>
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
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                  {order.status === "Delivered" ? (
                    <>
                      <FaCheckCircle className="text-green-500" />
                      Delivered
                    </>
                  ) : (
                    <>
                      <FaTruck className="text-yellow-500" />
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
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
