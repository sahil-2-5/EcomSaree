import React from "react";
import { FiX, FiTrash2 } from "react-icons/fi";

const DeleteBanner = ({ banner, onClose, onConfirm }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative z-50">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <FiX className="w-6 h-6" />
      </button>

      <div className="flex items-center mb-4">
        <FiTrash2 className="text-red-500 w-6 h-6 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">
          Delete Banner
        </h2>
      </div>

      <p className="text-gray-600 mb-6">
        Are you sure you want to delete the banner titled{" "}
        <span className="font-medium text-gray-900">"{banner.title}"</span>?
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm text-gray-700 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
        >
          Confirm Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteBanner;