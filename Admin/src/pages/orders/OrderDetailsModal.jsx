import React, { useState } from "react";
import { FiUser, FiCalendar, FiMapPin } from "react-icons/fi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Main Order Modal
const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold">Order Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Order Info & Customer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <FiCalendar className="mr-2" />
                Order Information
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-500">Order ID:</span>{" "}
                  {order.orderId}
                </p>
                <p>
                  <span className="text-gray-500">Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="text-gray-500">Status:</span>
                  <span
                    className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      order.orderStatus === "pending"
                        ? "bg-gray-100 text-gray-800"
                        : order.orderStatus === "processing"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.orderStatus === "shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.orderStatus.charAt(0).toUpperCase() +
                      order.orderStatus.slice(1)}
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <FiUser className="mr-2" />
                Customer Details
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-500">Name:</span>{" "}
                  {order.shippingAddress.name}
                </p>
                <p>
                  <span className="text-gray-500">Email:</span>{" "}
                  {order.shippingAddress.email}
                </p>
                <p>
                  <span className="text-gray-500">Phone:</span>{" "}
                  {order.shippingAddress.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <FiMapPin className="mr-2" />
              Shipping Address
            </h3>
            <div className="text-sm">
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>
              <p>Pincode: {order.shippingAddress.pincode}</p>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">
              Payment Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Method</p>
                <p>
                  {order.paymentMethod === "razorpay"
                    ? "UPI / Card"
                    : order.paymentMethod}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className="capitalize">{order.paymentStatus}</p>
              </div>
              <div>
                <p className="text-gray-500">Paid At</p>
                <p>
                  {order.paidAt
                    ? new Date(order.paidAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Amount</p>
                <p>₹{order.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Order Items Table */}
          <OrderItemsTable items={order.items} />

          {/* Summary */}
          <OrderSummary totalAmount={order.totalAmount} />
        </div>
      </div>
    </div>
  );
};

// ✅ Product Image Carousel Component
const ProductImageCarousel = ({ images }) => {
  const [mainIndex, setMainIndex] = useState(0);
  const [thumbStartIndex, setThumbStartIndex] = useState(0);

  const visibleThumbs = 3;

  const prevThumbs = () => {
    setThumbStartIndex((prev) => Math.max(prev - visibleThumbs, 0));
  };

  const nextThumbs = () => {
    setThumbStartIndex((prev) =>
      Math.min(prev + visibleThumbs, images.length - visibleThumbs)
    );
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-[180px] h-[320px] bg-gray-200 flex items-center justify-center text-gray-500 rounded">
        No Image
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Main Image 9:16 Ratio */}
      <div className="w-[180px] h-[320px] rounded overflow-hidden shadow-md">
        <img
          src={images[mainIndex].url}
          alt={`Product ${mainIndex}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex items-center gap-2">
        {thumbStartIndex > 0 && (
          <button
            onClick={prevThumbs}
            className="text-gray-500 hover:text-black"
          >
            <FaArrowLeft />
          </button>
        )}

        <div className="flex gap-2">
          {images
            .slice(thumbStartIndex, thumbStartIndex + visibleThumbs)
            .map((img, idx) => {
              const actualIndex = thumbStartIndex + idx;
              return (
                <img
                  key={actualIndex}
                  src={img.url}
                  alt={`Thumb ${actualIndex}`}
                  onClick={() => setMainIndex(actualIndex)}
                  className={`w-12 h-16 rounded border-2 cursor-pointer object-cover ${
                    actualIndex === mainIndex
                      ? "border-pink-500"
                      : "border-gray-200"
                  }`}
                />
              );
            })}
        </div>

        {thumbStartIndex + visibleThumbs < images.length && (
          <button
            onClick={nextThumbs}
            className="text-gray-500 hover:text-black"
          >
            <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

// ✅ Order Items Table with carousel inside
const OrderItemsTable = ({ items }) => {
  return (
    <div>
      <h3 className="font-medium text-gray-900 mb-3">Order Items</h3>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-500">
              <th className="p-3">Images</th>
              <th className="p-3">Product</th>
              <th className="p-3">Details</th>
              <th className="p-3">Price</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3">
                  <ProductImageCarousel images={item.product?.images || []} />
                </td>

                <td className="p-3 font-medium">
                  {item.product?.title || `Product ID: ${item.product?._id}`}
                  <div className="text-xs text-gray-500">SKU: {item._id}</div>
                </td>

                <td className="p-3 text-xs space-y-1">
                  <p>
                    <span className="font-medium">Material:</span>{" "}
                    {item.product?.filter?.material}
                  </p>
                  <p>
                    <span className="font-medium">Occasion:</span>{" "}
                    {item.product?.filter?.occasion?.join(", ")}
                  </p>
                  <p>
                    <span className="font-medium">Color:</span>{" "}
                    {item.product?.filter?.color}
                  </p>
                  <p className="line-through text-gray-400">
                    ₹{item.product?.price?.toLocaleString()}
                  </p>
                  <p className="text-green-600">
                    {item.product?.offerPercentage}% off
                  </p>
                </td>

                <td className="p-3">₹{item.price.toLocaleString()}</td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3 font-medium">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ✅ Order Summary Component
const OrderSummary = ({ totalAmount }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between border-b pb-2 mb-2">
        <span className="text-gray-500">Subtotal</span>
        <span>₹{totalAmount.toLocaleString()}</span>
      </div>
      <div className="flex justify-between border-b pb-2 mb-2">
        <span className="text-gray-500">Shipping</span>
        <span>Free</span>
      </div>
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>₹{totalAmount.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
