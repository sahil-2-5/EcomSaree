import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';

const ForgotOtp = () => {

  const { verifyResetOtp } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    otp: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = verifyResetOtp(formData);
      alert(response.msg || "OTP verified successfully");
      navigate('/reset-password'); // Redirect to login after successful verification
    } catch (err) {
      alert(err.response?.data?.msg || "Verification failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
        </div>
        <h2 className="text-center text-3xl font-extrabold text-black">
          Verify your email
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter the verification code sent to your email
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/80 backdrop-blur-sm py-8 px-4 shadow-lg ring-1 ring-black/5 sm:rounded-xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP
              </label>
              <div className="mt-1">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="one-time-code"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  value={formData.otp}
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Button 
                type="submit" 
                variant="primary" 
                className="w-full py-3 text-base font-medium shadow-lg hover:shadow-pink-500/20 transition-shadow duration-200"
              >
                Verify OTP
              </Button>
            </div>

            <div className="text-sm text-center">
              <span className="text-gray-600">Didn't receive code?</span>{' '}
              <button type="button" className="font-medium text-pink-600 hover:text-pink-500">
                Resend
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotOtp;