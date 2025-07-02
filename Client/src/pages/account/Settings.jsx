import { useState } from "react";
import { FaLock, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Settings = () => {
  const { logout, user, forgotPassword, verifyResetOtp, resetPassword } =
    useAuth();

  const [form, setForm] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSendOtp = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      if (!user?.email) throw new Error("User email not found.");
      const res = await forgotPassword(user.email);
      if (!res.success) throw new Error(res.message || "Failed to send OTP");

      setOtpSent(true);
      setMessage("OTP sent successfully to your registered email.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError(null);
    setMessage(null);

    if (!form.otp) return setError("Please enter OTP.");
    setLoading(true);
    try {
      const res = await verifyResetOtp({ email: user.email, otp: form.otp });
      if (!res.success)
        throw new Error(res.message || "OTP verification failed");

      setOtpVerified(true);
      setMessage("OTP verified. Now set your new password.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setError(null);
    setMessage(null);

    if (!form.newPassword || !form.confirmPassword) {
      return setError("All fields are required.");
    }

    if (form.newPassword !== form.confirmPassword) {
      return setError("New password and confirm password do not match.");
    }

    setLoading(true);
    try {
      const res = await resetPassword({
        email: user.email,
        newPassword: form.newPassword,
      });

      if (!res.success)
        throw new Error(res.message || "Password reset failed.");

      setMessage("Password updated successfully.");
      setForm({ otp: "", newPassword: "", confirmPassword: "" });
      setOtpSent(false);
      setOtpVerified(false);
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
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Account Settings
      </h2>

      {/* Password Reset via OTP */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 flex items-center gap-2 mb-2">
          <FaLock className="text-pink-500" />
          Change Password via OTP
        </h3>

        {message && <p className="text-green-600 text-sm mb-2">{message}</p>}
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        {/* Step 1: Send OTP */}
        {!otpSent && (
          <div className="flex flex-col gap-2 w-96">
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="border rounded px-3 py-2 text-sm bg-gray-100 text-gray-700"
            />
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="px-4 py-2 bg-pink-600 text-white rounded-md text-sm hover:bg-pink-700"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        )}

        {/* Step 2: Verify OTP */}
        {otpSent && !otpVerified && (
          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={handleChange}
              className="border rounded px-3 py-2 text-sm"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        {/* Step 3: Reset Password */}
        {otpVerified && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <button
              onClick={handlePasswordReset}
              disabled={loading}
              className="mt-4 col-span-full px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        )}
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
