import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  FiEye,
  FiDownload,
  FiUser,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiChevronDown,
  FiFilter,
} from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdminLayout from "../../components/admin/AdminPanel";
import { useOrderContext } from "../../context/OrderContext";
import OrderDetailsModal from "./OrderDetailsModal";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minItems, setMinItems] = useState("");
  const [maxItems, setMaxItems] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  const { 
    orders, 
    loading, 
    error, 
    fetchAllOrders,
    updateOrderStatus 
  } = useOrderContext();

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Calculate status counts
  const statusCount = {
    total: orders.length,
    pending: orders.filter((o) => o.orderStatus === "pending").length,
    processing: orders.filter((o) => o.orderStatus === "processing").length,
    shipped: orders.filter((o) => o.orderStatus === "shipped").length,
    delivered: orders.filter((o) => o.orderStatus === "delivered").length,
    cancelled: orders.filter((o) => o.orderStatus === "cancelled").length,
  };

  // Filter orders based on search, status, and date range
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.shippingAddress.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.orderStatus === statusFilter;

    const matchesDateRange = () => {
      const orderDate = new Date(order.createdAt);
      orderDate.setHours(0, 0, 0, 0);
      
      if (dateRangeFilter === "custom" && startDate && endDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        return orderDate >= start && orderDate <= end;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      switch (dateRangeFilter) {
        case "today":
          return orderDate.getTime() === today.getTime();
        case "this-week":
          const firstDayOfWeek = new Date(today);
          firstDayOfWeek.setDate(today.getDate() - today.getDay());
          return orderDate >= firstDayOfWeek;
        case "this-month":
          const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          return orderDate >= firstDayOfMonth;
        default:
          return true;
      }
    };

    const matchesPriceRange = () => {
      const total = order.totalAmount;
      const min = minPrice ? parseFloat(minPrice) : 0;
      const max = maxPrice ? parseFloat(maxPrice) : Infinity;
      return total >= min && total <= max;
    };

    const matchesItemsRange = () => {
      const itemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
      const min = minItems ? parseInt(minItems) : 0;
      const max = maxItems ? parseInt(maxItems) : Infinity;
      return itemsCount >= min && itemsCount <= max;
    };

    return (
      matchesSearch && 
      matchesStatus && 
      matchesDateRange() && 
      matchesPriceRange() && 
      matchesItemsRange()
    );
  });

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  };

  const handleExport = () => {
    const dataToExport = filteredOrders.map((order) => ({
      "Order ID": order.orderId,
      "Customer Name": order.shippingAddress.name,
      "Customer Email": order.shippingAddress.email,
      Date: formatDate(order.createdAt),
      Items: order.items.reduce((sum, item) => sum + item.quantity, 0),
      "Total Amount": order.totalAmount,
      "Payment Method": getPaymentMethodIcon(order.paymentMethod),
      Status:
        order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1),
      Address: `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}`,
      Phone: order.shippingAddress.phone,
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wscols = [
      { wch: 15 }, { wch: 20 }, { wch: 25 }, { wch: 12 },
      { wch: 8 }, { wch: 12 }, { wch: 15 }, { wch: 12 },
      { wch: 40 }, { wch: 15 },
    ];
    ws["!cols"] = wscols;

    const headerRange = XLSX.utils.decode_range(ws["!ref"]);
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
      const headerCell = XLSX.utils.encode_cell({ r: headerRange.s.r, c: C });
      if (!ws[headerCell]) continue;
      ws[headerCell].s = { font: { bold: true } };
    }

    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let R = range.s.r + 1; R <= range.e.r; ++R) {
      const cell = XLSX.utils.encode_cell({ r: R, c: 5 });
      if (!ws[cell]) continue;
      ws[cell].z = "#,##0.00";
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");

    const today = new Date();
    const dateString = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

    XLSX.writeFile(wb, `orders_${dateString}.xlsx`);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending": return "bg-gray-100 text-gray-800";
      case "processing": return "bg-yellow-100 text-yellow-800";
      case "shipped": return "bg-blue-100 text-blue-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentMethodIcon = (method) => {
    return method === "razorpay" ? "UPI/Cards" : method;
  };

  const handleDateRangeChange = (value) => {
    setDateRangeFilter(value);
    if (value !== "custom") {
      setStartDate(null);
      setEndDate(null);
      setShowDatePicker(false);
    } else {
      setShowDatePicker(true);
    }
  };

  const applyCustomDateRange = () => {
    if (startDate && endDate) {
      setShowDatePicker(false);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateRangeFilter("all");
    setStartDate(null);
    setEndDate(null);
    setMinPrice("");
    setMaxPrice("");
    setMinItems("");
    setMaxItems("");
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <FiFilter className="w-4 h-4 mr-1" />
              {showAdvancedFilters ? "Hide Filters" : "Advanced Filters"}
            </button>
            <button
              onClick={handleExport}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <FiDownload className="w-5 h-5 mr-2" />
              Export Orders
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Total Orders</p>
            <h2 className="text-xl font-bold">{statusCount.total}</h2>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Pending</p>
            <h2 className="text-xl font-bold text-gray-600">
              {statusCount.pending}
            </h2>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Processing</p>
            <h2 className="text-xl font-bold text-yellow-600">
              {statusCount.processing}
            </h2>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Shipped</p>
            <h2 className="text-xl font-bold text-blue-600">
              {statusCount.shipped}
            </h2>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Delivered</p>
            <h2 className="text-xl font-bold text-green-600">
              {statusCount.delivered}
            </h2>
          </div>
        </div>

        {/* Basic Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="text"
            placeholder="Search orders..."
            className="border px-4 py-2 rounded w-full md:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border px-3 py-2 rounded"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <div className="relative">
            <select 
              className="border px-3 py-2 rounded"
              value={dateRangeFilter}
              onChange={(e) => handleDateRangeChange(e.target.value)}
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
            
            {showDatePicker && (
              <div className="absolute z-10 mt-2 bg-white p-4 rounded shadow-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    className="border px-2 py-1 rounded"
                  />
                  <span>to</span>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="End Date"
                    className="border px-2 py-1 rounded"
                  />
                </div>
                <button
                  onClick={applyCustomDateRange}
                  className="w-full bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  disabled={!startDate || !endDate}
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range (₹)</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="border px-3 py-2 rounded w-full"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    min="0"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="border px-3 py-2 rounded w-full"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    min={minPrice || "0"}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Items Quantity</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="border px-3 py-2 rounded w-full"
                    value={minItems}
                    onChange={(e) => setMinItems(e.target.value)}
                    min="0"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="border px-3 py-2 rounded w-full"
                    value={maxItems}
                    onChange={(e) => setMaxItems(e.target.value)}
                    min={minItems || "0"}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={resetFilters}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-xs font-medium text-gray-500 uppercase">
                <th className="p-4 text-left">Order ID</th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Items</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4 text-left">Payment</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2 text-gray-400" />
                      {order.orderId}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <FiUser className="mr-2 text-gray-400" />
                      <div>
                        <div className="text-gray-800 font-medium">
                          {order.shippingAddress?.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.shippingAddress?.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="p-4 text-gray-700">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                    items
                  </td>
                  <td className="p-4 font-medium text-gray-900">
                    ₹{order.totalAmount.toLocaleString()}
                  </td>
                  <td className="p-4 text-gray-700">
                    {getPaymentMethodIcon(order.paymentMethod)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClass(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus.charAt(0).toUpperCase() +
                        order.orderStatus.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 text-gray-700">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        title="View Order"
                        className="hover:text-pink-600"
                      >
                        <FiEye />
                      </button>
                      <div className="relative">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className={`appearance-none px-2 py-1 text-xs rounded pr-6 focus:outline-none focus:ring-1 focus:ring-gray-300`}
                          disabled={loading}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <FiChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs pointer-events-none" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center p-4 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </AdminLayout>
  );
};

export default Orders;