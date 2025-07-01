import { useState } from "react";
import { FaLock, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext"; // Adjust path if needed

const Settings = () => {
  const { logout, user } = useAuth();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordUpdate = async () => {
    setError(null);
    setMessage(null);

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      return setError("All fields are required.");
    }

    if (form.newPassword !== form.confirmPassword) {
      return setError("New password and confirm password do not match.");
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:2525/user/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update password.");
      }

      setMessage("Password updated successfully.");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h2>

      {/* Password Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 flex items-center gap-2 mb-2">
          <FaLock className="text-pink-500" />
          Change Password
        </h3>

        {message && <p className="text-green-600 text-sm mb-2">{message}</p>}
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={form.currentPassword}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-sm"
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-sm"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-sm"
          />
        </div>

        <button
          onClick={handlePasswordUpdate}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-md text-sm hover:bg-pink-700"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>

      {/* Logout */}
      <div className="pt-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-red-500 hover:underline"
        >
          <FaSignOutAlt />
          Logout from Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
