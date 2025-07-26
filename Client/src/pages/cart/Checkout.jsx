import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useAddressContext } from "../../context/AddressContext";
import { useOrder } from "../../context/OrderContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const { addresses } = useAddressContext();
  const { openRazorpay } = useOrder();

  const [useSavedAddress, setUseSavedAddress] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "card",
  });

  useEffect(() => {
    if (user && !isEditing) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      }));
    }
  }, [user, isEditing]);

  const subtotal = getCartTotal();
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleCheckboxChange = (e) => {
  const checked = e.target.checked;
  setUseSavedAddress(checked);

  if (checked && addresses.length > 0) {
    const defaultAddress = addresses.find((addr) => addr.isDefault);
    if (defaultAddress) {
      setFormData((prev) => ({
        ...prev,
        address: defaultAddress.address || "",
        city: defaultAddress.city || "",
        state: defaultAddress.state || "",
        pincode: defaultAddress.pincode || "",
        phone: defaultAddress.phone || "",
      }));
    }
  } else {
    setFormData((prev) => ({
      ...prev,
      address: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
    }));
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requiredFields = [
        "firstName", "lastName", "email", "phone",
        "address", "city", "state", "pincode"
      ];
      const missingFields = requiredFields.filter((field) => !formData[field]);
      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(", ")}`);
      }

      if (!cart || cart.length === 0) {
        throw new Error("Your cart is empty");
      }

      const shippingAddress = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      };

      const items = cart.map((item) => ({
        id: item.product._id,
        product: item.product._id,
        name: item.product.title,
        price: item.product.sellingPrice,
        quantity: item.quantity,
        image: item.product.images[0]?.url || "/placeholder.jpg",
      }));

      const orderData = {
        id: `ORD${Math.floor(Math.random() * 1000000000)}`,
        date: new Date().toISOString(),
        total,
        paymentMethod: "Credit Card",
        estimatedDelivery: "5-7 business days",
        items,
        shippingAddress,
      };

      await openRazorpay({
        amount: total,
        items,
        shippingAddress,
        orderData,
        onSuccess: (paymentResponse) => {
          const completeOrder = {
            ...orderData,
            paymentId: paymentResponse.razorpay_payment_id,
            orderId: paymentResponse.razorpay_order_id,
            paymentStatus: "completed",
          };
          clearCart();
          navigate("/order-confirmation", {
            state: { order: completeOrder, paymentStatus: "success" },
          });
        },
        onError: (error) => {
          navigate("/order-confirmation", {
            state: {
              order: orderData,
              paymentStatus: "failed",
              error: error.message,
            },
          });
        },
      });
    } catch (error) {
      console.error("Checkout error:", error);
      setCheckoutError(error.message);
    }
  };

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-white pt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wide text-pink-700 uppercase bg-pink-50 border border-pink-100 mb-4 w-fit">
            Checkout
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Complete Your Order
          </h1>
          <p className="text-gray-600">
            Please fill in your details to proceed with the purchase
          </p>
        </div>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white border border-gray-200 p-8">
                <div className="flex flex-col mb-8">
                  <span className="text-xs font-medium tracking-wide text-pink-700 uppercase mb-2">
                    Step 1
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">
                    Contact Information
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} disabled={!isEditing} required className="mt-1 block w-full border border-gray-200 px-4 py-2 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} disabled={!isEditing} required className="mt-1 block w-full border border-gray-200 px-4 py-2 text-sm" />
                  </div>
                </div>
                <div className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} disabled={!isEditing} required className="mt-1 block w-full border border-gray-200 px-4 py-2 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} disabled={!isEditing} required className="mt-1 block w-full border border-gray-200 px-4 py-2 text-sm" />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white border border-gray-200 p-8 mt-8">
                <div className="flex flex-col mb-8">
                  <span className="text-xs font-medium tracking-wide text-pink-700 uppercase mb-2">Step 2</span>
                  <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
                </div>
                <div className="space-y-4">
                 
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea id="address" name="address" value={formData.address} onChange={handleInputChange} rows={3} disabled={!isEditing} required className="mt-1 block w-full border border-gray-200 px-4 py-2 text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                      <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} disabled={!isEditing} required className="mt-1 block w-full border border-gray-200 px-4 py-2 text-sm" />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                      <input type="text" id="state" name="state" value={formData.state} onChange={handleInputChange} disabled={!isEditing} required className="mt-1 block w-full border border-gray-200 px-4 py-2 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">PIN Code</label>
                    <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} disabled={!isEditing} required className="mt-1 block w-full border border-gray-200 px-4 py-2 text-sm" />
                  </div>

                   <label className="flex items-center gap-2 text-sm font-medium text-pink-700 mb-4">
                    <input
                      type="checkbox"
                      checked={useSavedAddress}
                      disabled={addresses.length === 0}
                      onChange={handleCheckboxChange}
                    />
                    Use saved default address
                  </label>

                 <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => navigate("/getaddress")}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-pink-700 border border-pink-300 bg-pink-50 hover:bg-pink-100 rounded"
                  >
                    ➕ Add Shipping Address
                  </button>
                </div>

                </div>
              </div>

              {/* Payment Method (no changes needed) */}
              <div className="bg-white border border-gray-200 p-8 mt-8">
                <div className="flex flex-col mb-8">
                  <span className="text-xs font-medium tracking-wide text-pink-700 uppercase mb-2">
                    Step 3
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                </div>
                <div className="flex items-center gap-4 p-4 border border-pink-100 bg-pink-50 rounded">
                  <p className="text-sm text-gray-700">
                    All payments are securely processed through <strong>Razorpay</strong>.
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary (no changes needed) */}
          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="bg-white border border-gray-200 p-8 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              {cart.map((item) => (
                <div key={item.product._id} className="flex gap-4 mb-4">
                  <img src={item.product.images[0]?.url || "/placeholder.jpg"} className="h-16 w-16 object-cover" />
                  <div className="text-sm">
                    <p>{item.product.title}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>₹{(item.product.sellingPrice * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
              <div className="text-sm mt-6 space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-6 bg-pink-600 text-white py-3 rounded hover:bg-pink-700"
                onClick={handleSubmit}
              >
                Place Order
              </button>
              {checkoutError && (
                <p className="mt-4 text-sm text-red-600 text-center">{checkoutError}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;