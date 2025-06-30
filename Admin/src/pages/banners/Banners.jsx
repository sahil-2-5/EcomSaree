import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiEye, FiPlus, FiX, FiImage } from "react-icons/fi";
import AdminLayout from "../../components/admin/AdminPanel";
import CreateBanner from "../../pages/banners/CreateBanner";
import EditBanner from "../../pages/banners/EditBanner";
import PreviewBanner from "../../pages/banners/PreviewBanner";
import EditBannerImage from "../../pages/banners/EditBannerImage";

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
  const [showDelete, setShowDelete] = useState(false);
  const [showEditImage, setShowEditImage] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const handleAddBanner = () => {
    setShowCreate(true);
    setSelectedBanner(null);
  };

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setShowEdit(true);
  };

  const handlePreview = (banner) => {
    setSelectedBanner(banner);
    setShowPreview(true);
  };

  const handleDeleteClick = (banner) => {
    setSelectedBanner(banner);
    setShowDelete(true);
  };

  const handleEditImageClick = (banner) => {
    setSelectedBanner(banner);
    setShowEditImage(true);
  };

  const handleDeleteConfirm = (id) => {
    console.log("Deleting banner with id:", id);
    setShowDelete(false);
    // Here you would typically call an API to delete the banner
  };

  const closeAllModals = () => {
    setShowCreate(false);
    setShowEdit(false);
    setShowPreview(false);
    setShowDelete(false);
    setShowEditImage(false);
    setSelectedBanner(null);
  };

  const [featuredBanner, ...otherBanners] = banners;

  return (
    <AdminLayout>
      <div className="relative space-y-6">
        {/* Overlay for modals */}
        {(showCreate || showEdit || showPreview || showDelete || showEditImage) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
        )}

        {/* Create Banner Modal */}
        {showCreate && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={closeAllModals}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
              <CreateBanner onClose={closeAllModals} />
            </div>
          </div>
        )}

        {/* Edit Banner Modal */}
        {showEdit && selectedBanner && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={closeAllModals}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
              <EditBanner banner={selectedBanner} onClose={closeAllModals} />
            </div>
          </div>
        )}

        {/* Edit Banner Image Modal */}
        {showEditImage && selectedBanner && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={closeAllModals}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
              <EditBannerImage banner={selectedBanner} onClose={closeAllModals} />
            </div>
          </div>
        )}

        {/* Preview Banner Modal */}
        {showPreview && selectedBanner && (
          <PreviewBanner
            bannerImages={[selectedBanner.image]}
            formData={{
              title: selectedBanner.title,
              subtitle: selectedBanner.subtitle,
              description: selectedBanner.description || "",
              ctaText: "Shop Now",
            }}
            onClose={closeAllModals}
          />
        )}

        {/* Delete Confirmation Modal */}
        {showDelete && selectedBanner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <DeleteBanner 
              banner={selectedBanner}
              onClose={closeAllModals}
              onConfirm={handleDeleteConfirm}
            />
          </div>
        )}

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

        {/* Banners List */}
        <div className="space-y-4">
          {otherBanners.map((banner) => (
            <div
              key={banner.id}
              className="bg-white p-5 rounded-lg shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
               
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
              </div>

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
                  <span className="block font-medium text-gray-700">
                    Clicks
                  </span>
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
                    title="Edit Image"
                    onClick={() => handleEditImageClick(banner)}
                    className="border px-3 py-1 text-sm rounded hover:bg-gray-50"
                  >
                    <FiImage />
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
                    onClick={() => handleDeleteClick(banner)}
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