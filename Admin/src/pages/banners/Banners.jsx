import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiEye, FiPlus } from "react-icons/fi";
import AdminLayout from "../../components/admin/AdminPanel";
import CreateBanner from "../../pages/banners/CreateBanner";
import EditBanner from "../../pages/banners/EditBanner";
import PreviewBanner from "../../pages/banners/PreviewBanner";

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
    image: "https://via.placeholder.com/800x300?text=Summer+Sale+2024",
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
    image: "https://via.placeholder.com/800x300?text=New+Arrivals",
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
    image: "https://via.placeholder.com/800x300?text=Festival+Special",
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
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const handleAddBanner = () => {
    setShowCreate(true);
    setShowEdit(false);
    setShowPreview(false);
    setSelectedBanner(null);
  };

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setShowEdit(true);
    setShowCreate(false);
    setShowPreview(false);
  };

  const handlePreview = (banner) => {
    setSelectedBanner(banner);
    setShowPreview(true);
    setShowEdit(false);
    setShowCreate(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      console.log("Deleting", id);
    }
  };

  const [featuredBanner, ...otherBanners] = banners;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Banners</h1>
          <button
            onClick={handleAddBanner}
            className="inline-flex items-center px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-md hover:bg-pink-700"
          >
            <FiPlus className="w-5 h-5 mr-2" />
            Create Banner
          </button>
        </div>

        {/* Conditional Components */}
        {showCreate && <CreateBanner onClose={() => setShowCreate(false)} />}
        {showEdit && selectedBanner && (
          <EditBanner banner={selectedBanner} onClose={() => setShowEdit(false)} />
        )}
        {showPreview && selectedBanner && (
          <PreviewBanner banner={selectedBanner} onClose={() => setShowPreview(false)} />
        )}

        {/* Featured Banner */}
        <div className="bg-gradient-to-r from-pink-100 to-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-6">
          <img
            src={featuredBanner.image}
            alt={featuredBanner.title}
            className="w-full md:w-1/2 h-64 object-cover rounded-md"
          />
          <div className="w-full md:w-1/2 space-y-2">
            <h2 className="text-2xl font-bold text-pink-800">{featuredBanner.title}</h2>
            <p className="text-gray-700">{featuredBanner.subtitle}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
              <div>
                <strong>Start:</strong> {featuredBanner.startDate}
              </div>
              <div>
                <strong>End:</strong> {featuredBanner.endDate}
              </div>
              <div>
                <strong>Clicks:</strong> {featuredBanner.clicks}
              </div>
            </div>
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => handlePreview(featuredBanner)}
                className="border px-3 py-1 rounded hover:bg-gray-100"
              >
                <FiEye />
              </button>
              <button
                onClick={() => handleEdit(featuredBanner)}
                className="border px-3 py-1 rounded hover:bg-gray-100"
              >
                <FiEdit2 />
              </button>
              <button
                onClick={() => handleDelete(featuredBanner.id)}
                className="border px-3 py-1 rounded hover:bg-gray-100"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        </div>

        {/* Other Banners */}
        <div className="space-y-4">
          {otherBanners.map((banner) => (
            <div
              key={banner.id}
              className="bg-white p-5 rounded-lg shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-800">{banner.title}</h2>
                <p className="text-sm text-gray-500">{banner.subtitle}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Position:</span> {banner.position}
                </p>
              </div>

              <div className="flex flex-wrap gap-6 md:gap-12 text-sm text-gray-600">
                <div>
                  <span className="block font-medium text-gray-700">Start Date</span>
                  {banner.startDate}
                </div>
                <div>
                  <span className="block font-medium text-gray-700">End Date</span>
                  {banner.endDate}
                </div>
                <div>
                  <span className="block font-medium text-gray-700">Clicks</span>
                  {banner.clicks.toLocaleString()}
                </div>
              </div>

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
                    onClick={() => handlePreview(banner)}
                    className="border px-3 py-1 text-sm rounded hover:bg-gray-50"
                  >
                    <FiEye />
                  </button>
                  <button
                    title="Edit"
                    onClick={() => handleEdit(banner)}
                    className="border px-3 py-1 text-sm rounded hover:bg-gray-50"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    title="Delete"
                    onClick={() => handleDelete(banner.id)}
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
