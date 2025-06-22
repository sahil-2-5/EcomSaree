import React from "react";
import { FiEdit2, FiTrash2, FiEye, FiPlus } from "react-icons/fi";
import AdminLayout from "../../components/admin/AdminPanel";

const banners = [
  {
    id: 1,
    title: "Summer Sale 2024",
    subtitle: "Up to 50% off on all summer collection",
    position: "Homepage Hero",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    clicks: 1250,
    status: "Active",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Check out our latest saree collection",
    position: "Category Page",
    startDate: "2024-07-15",
    endDate: "2024-09-15",
    clicks: 890,
    status: "Active",
  },
  {
    id: 3,
    title: "Festival Special",
    subtitle: "Special discounts for festive season",
    position: "Homepage Hero",
    startDate: "2024-10-01",
    endDate: "2024-11-01",
    clicks: 320,
    status: "Scheduled",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Active":
      return "bg-black text-white";
    case "Scheduled":
      return "bg-gray-200 text-gray-700";
    case "Inactive":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const Banners = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Banners</h1>
          <button className="inline-flex items-center px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-md hover:bg-pink-700">
            <FiPlus className="w-5 h-5 mr-2" />
            Create Banner
          </button>
        </div>

        {/* Banner Cards */}
        <div className="space-y-4">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="bg-white p-5 rounded-lg shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Content */}
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {banner.title}
                </h2>
                <p className="text-sm text-gray-500">{banner.subtitle}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Position:</span>{" "}
                  {banner.position}
                </p>
              </div>

              {/* Middle Info */}
              <div className="flex flex-wrap gap-6 md:gap-12 text-sm text-gray-600">
                <div>
                  <span className="block font-medium text-gray-700">
                    Start Date
                  </span>
                  {banner.startDate}
                </div>
                <div>
                  <span className="block font-medium text-gray-700">
                    End Date
                  </span>
                  {banner.endDate}
                </div>
                <div>
                  <span className="block font-medium text-gray-700">Clicks</span>
                  {banner.clicks.toLocaleString()}
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex flex-col md:items-end gap-3">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full w-fit ${getStatusStyle(
                    banner.status
                  )}`}
                >
                  {banner.status}
                </span>
                <div className="flex gap-2">
                  <button
                    title="Preview"
                    className="border px-3 py-1 text-sm rounded hover:bg-gray-50"
                  >
                    <FiEye />
                  </button>
                  <button
                    title="Edit"
                    className="border px-3 py-1 text-sm rounded hover:bg-gray-50"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    title="Delete"
                    className="border px-3 py-1 text-sm rounded hover:bg-gray-50"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Banners;