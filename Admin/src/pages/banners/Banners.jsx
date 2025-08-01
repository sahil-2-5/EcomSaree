import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiEye, FiPlus, FiX, FiImage } from "react-icons/fi";
import AdminLayout from "../../components/admin/AdminPanel";
import CreateBanner from "../../pages/banners/CreateBanner";
import EditBanner from "../../pages/banners/EditBanner";
import PreviewBanner from "../../pages/banners/PreviewBanner";
import EditBannerImage from "../../pages/banners/EditBannerImage";
import DeleteBanner from "../../pages/banners/DeleteBanner";
import { useBannerContext } from "../../context/BannerContext";

const getStatusStyle = (status) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800";
    case "Draft":
      return "bg-gray-100 text-gray-800";
    case "Scheduled":
      return "bg-blue-100 text-blue-800";
    case "Inactive":
      return "bg-red-100 text-red-800";
    case "Expired":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const Banners = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEditImage, setShowEditImage] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const { banners, loading, error, fetchAllBanners, deleteBanner } =
    useBannerContext();

  useEffect(() => {
    fetchAllBanners();
  }, []);

  const closeAllModals = () => {
    setShowCreate(false);
    setShowEdit(false);
    setShowPreview(false);
    setShowDelete(false);
    setShowEditImage(false);
    setSelectedBanner(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteBanner(selectedBanner._id);
      closeAllModals();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="relative space-y-6">
        {(showCreate ||
          showEdit ||
          showPreview ||
          showDelete ||
          showEditImage) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
        )}

        {showCreate && (
          <ModalWrapper onClose={closeAllModals}>
            <CreateBanner onClose={closeAllModals} />
          </ModalWrapper>
        )}

        {showEdit && selectedBanner && (
          <ModalWrapper onClose={closeAllModals}>
            <EditBanner banner={selectedBanner} onClose={closeAllModals} />
          </ModalWrapper>
        )}

        {showEditImage && selectedBanner && (
          <ModalWrapper onClose={closeAllModals}>
            <EditBannerImage banner={selectedBanner} onClose={closeAllModals} />
          </ModalWrapper>
        )}

        {showPreview && selectedBanner && (
          <PreviewBanner
            bannerImages={selectedBanner.images}
            formData={{
              title: selectedBanner.title,
              subtitle: selectedBanner.subtitle,
              description: selectedBanner.description || "",
              ctaText: "Shop Now",
            }}
            onClose={closeAllModals}
          />
        )}

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
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-md hover:bg-pink-700"
          >
            <FiPlus className="w-5 h-5 mr-2" />
            Create Banner
          </button>
        </div>

        {/* Banner List */}
        {loading ? (
          <p>Loading banners...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid gap-6">
            {banners.map((banner) => (
              <div
                key={banner._id}
                className="bg-white rounded-lg shadow-md p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10"
              >
                {/* Left: Image + Title Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-1/2">
                  <img
                    src={banner.images[0]?.url || "/placeholder.jpg"}
                    alt={banner.title}
                    className="w-full sm:w-32 h-20 object-cover rounded-md border"
                  />
                  <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {banner.title}
                    </h2>
                    <p className="text-sm text-gray-600">{banner.subtitle}</p>
                    <p className="text-xs text-gray-400">
                      Position: {banner.position}
                    </p>
                  </div>
                </div>

                {/* Center: Info */}
                <div className="flex flex-col sm:flex-row gap-3 text-sm text-gray-700 w-full md:w-auto">
                  <div>
                    <span className="block text-xs font-medium text-gray-500">
                      Start Date
                    </span>
                    {formatDate(banner.startDate)}
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-500">
                      End Date
                    </span>
                    {formatDate(banner.endDate)}
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-500">
                      Clicks
                    </span>
                    {banner.clicks || 0}
                  </div>
                </div>

                {/* Right: Status + Actions */}
                <div className="flex flex-col md:items-end gap-3 w-full md:w-auto">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full w-fit ${getStatusStyle(
                      banner.status
                    )}`}
                  >
                    {banner.status}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    <IconBtn
                      title="Preview"
                      onClick={() => {
                        setSelectedBanner(banner);
                        setShowPreview(true);
                      }}
                    >
                      <FiEye />
                    </IconBtn>
                    <IconBtn
                      title="Edit Image"
                      onClick={() => {
                        setSelectedBanner(banner);
                        setShowEditImage(true);
                      }}
                    >
                      <FiImage />
                    </IconBtn>
                    <IconBtn
                      title="Edit"
                      onClick={() => {
                        setSelectedBanner(banner);
                        setShowEdit(true);
                      }}
                    >
                      <FiEdit2 />
                    </IconBtn>
                    <IconBtn
                      title="Delete"
                      onClick={() => {
                        setSelectedBanner(banner);
                        setShowDelete(true);
                      }}
                    >
                      <FiTrash2 />
                    </IconBtn>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

// Utility Components

const IconBtn = ({ onClick, children, title }) => (
  <button
    title={title}
    onClick={onClick}
    className="border px-3 py-1 text-sm rounded hover:bg-gray-100"
  >
    {children}
  </button>
);

const ModalWrapper = ({ children, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <FiX className="w-6 h-6" />
      </button>
      {children}
    </div>
  </div>
);

export default Banners;