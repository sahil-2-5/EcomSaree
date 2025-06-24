import React from "react";

const PreviewBanner = ({ banner, onClose }) => {
  return (
    <div className="bg-white p-6 rounded shadow border">
      <h2 className="text-xl font-semibold mb-4">Preview Banner</h2>
      <div className="space-y-2">
        <p><strong>Title:</strong> {banner.title}</p>
        <p><strong>Subtitle:</strong> {banner.subtitle}</p>
        <p><strong>Position:</strong> {banner.position}</p>
        <p><strong>Start Date:</strong> {banner.startDate}</p>
        <p><strong>End Date:</strong> {banner.endDate}</p>
        <p><strong>Status:</strong> {banner.status}</p>
        <p><strong>Clicks:</strong> {banner.clicks}</p>
      </div>
      <button onClick={onClose} className="mt-4 text-gray-500">
        Close Preview
      </button>
    </div>
  );
};

export default PreviewBanner;
