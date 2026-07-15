import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

interface VerifyEmailProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
}

function VerifyEmail({ setIsAuthenticated, darkMode }: VerifyEmailProps) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/verify-email", {
  email,
  otp,
});

      alert(res.data.message);
navigate("/login");
     
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-8 transition-all duration-300 ${
        darkMode
          ? "bg-[#070B14]"
          : "bg-gradient-to-br from-purple-50 via-white to-blue-50"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-3xl border backdrop-blur-xl shadow-2xl p-6 sm:p-8 transition-all ${
          darkMode
            ? "bg-white/5 border-white/10"
            : "bg-white border-gray-200"
        }`}
      >
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1
            className={`text-3xl sm:text-4xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Verify Email
          </h1>

          <p
            className={`mt-2 text-sm sm:text-base ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Enter OTP sent to your email
          </p>

          <p
            className={`mt-1 text-sm font-semibold ${
              darkMode ? "text-purple-300" : "text-purple-600"
            }`}
          >
            {email}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleVerify} className="space-y-5">
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
            className={`w-full h-14 px-4 rounded-xl border outline-none text-center tracking-[8px] text-xl transition-all ${
              darkMode
                ? "bg-[#111827] text-white border-gray-700 placeholder-gray-400 focus:border-purple-500"
                : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500 focus:border-purple-500"
            }`}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* FOOTER */}
        <p
          className={`text-center mt-6 text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Didn’t receive OTP?{" "}
          <button className="text-purple-500 hover:text-purple-600 font-semibold">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}

export default VerifyEmail;