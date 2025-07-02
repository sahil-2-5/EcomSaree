import { useState, useEffect } from "react";
import { FaCheckCircle, FaRegEdit } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user, loading, updateProfile } = useAuth(); // ✅ using updateProfile from context
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user && !isEditing) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const updatedUser = await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      setFormData({
        ...formData,
        firstName: updatedUser.firstName || "",
        lastName: updatedUser.lastName || "",
      });

      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!user)
    return <p className="text-center py-10 text-red-500">No user found.</p>;

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Personal Information
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 text-sm text-pink-600 hover:underline"
        >
          <FaRegEdit />
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Manage your personal details and account information
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            className="w-full border rounded px-3 py-2 text-sm"
            value={formData.firstName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            className="w-full border rounded px-3 py-2 text-sm"
            value={formData.lastName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            className="w-full border rounded px-3 py-2 text-sm pr-10"
            value={formData.email}
            disabled
          />
          <FaCheckCircle className="absolute right-3 top-3 text-green-500" />
        </div>
      </div>

      {isEditing && (
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-sm"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      )}
    </div>
  );
};

export default Profile;
