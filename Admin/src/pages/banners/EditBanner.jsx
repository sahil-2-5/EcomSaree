import React from "react";

const EditBanner = ({ banner, onClose }) => {
  return (
    <div className="bg-white p-6 rounded shadow border">
      <h2 className="text-xl font-semibold mb-4">Edit Banner</h2>
      <form className="space-y-3">
        <input defaultValue={banner.title} className="w-full border p-2 rounded" />
        <input defaultValue={banner.subtitle} className="w-full border p-2 rounded" />
        <input defaultValue={banner.position} className="w-full border p-2 rounded" />
        <input type="date" defaultValue={banner.startDate} className="w-full border p-2 rounded" />
        <input type="date" defaultValue={banner.endDate} className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update
        </button>
        <button type="button" onClick={onClose} className="ml-2 text-gray-500">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditBanner;
