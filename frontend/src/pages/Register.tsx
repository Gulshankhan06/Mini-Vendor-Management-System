import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface RegisterProps {
  darkMode: boolean;
}

function Registration({ darkMode }: RegisterProps) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
     name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");

const [otpSent, setOtpSent] = useState(false);

const [emailVerified, setEmailVerified] = useState(false);

const [otpLoading, setOtpLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!form.username || !form.name || !form.email || !form.password) {
      setMessage("All required fields must be filled");
      return false;
    }

    if (form.password.length < 6) {
      setMessage(
        "Password must be at least 6 characters"
      );
      return false;
    }

    return true;
  };
  const handleSendOtp = async () => {
  if (!form.email) {
    setMessage("Please enter email first");
    return;
  }

  setOtpLoading(true);

  try {
    const res = await fetch(
      "https://mini-vendor-management-system.onrender.com/api/auth/send-email-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message);
      setOtpLoading(false);
      return;
    }

    setOtpSent(true);
    setMessage("OTP sent successfully");
  } catch (err) {
    console.log(err);
    setMessage("Server Error");
  }

  setOtpLoading(false);
};
const handleVerifyOtp = async () => {
  if (!otp) {
    setMessage("Enter OTP");
    return;
  }

  try {
    const res = await fetch(
      "https://mini-vendor-management-system.onrender.com/api/auth/verify-email-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          otp,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message);
      return;
    }

    setEmailVerified(true);
    setMessage("Email verified successfully");
  } catch (err) {
    console.log(err);
    setMessage("Server Error");
  }
};

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://mini-vendor-management-system.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(
          data.message || "Registration failed"
        );
        setLoading(false);
        return;
      }
setMessage("Registration successful");

setTimeout(() => {
  navigate("/login");
}, 1000);
      
    } catch (err) {
      console.log(err);
      setMessage(
        "Server error. Please try again later."
      );
    }

    setLoading(false);
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
              darkMode
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            Create Account
          </h1>

          <p
            className={`mt-2 text-sm sm:text-base ${
              darkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            Register to manage vendors
          </p>
        </div>

        {/* MESSAGE */}
        {message && (
          <div
            className={`mb-5 rounded-xl p-3 text-center text-sm ${
              message.includes("OTP")
                ? "bg-green-500/10 border border-green-500/20 text-green-500"
                : "bg-red-500/10 border border-red-500/20 text-red-500"
            }`}
          >
            {message}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >
          <input
  type="text"
  name="username"
  value={form.username}
  onChange={handleChange}
  placeholder="Username"
  required
  className={`w-full h-14 px-4 rounded-xl border outline-none transition-all ${
    darkMode
      ? "bg-[#111827] text-white border-gray-700 placeholder-gray-400 focus:border-purple-500"
      : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500 focus:border-purple-500"
  }`}
/>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className={`w-full h-14 px-4 rounded-xl border outline-none transition-all ${
              darkMode
                ? "bg-[#111827] text-white border-gray-700 placeholder-gray-400 focus:border-purple-500"
                : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500 focus:border-purple-500"
            }`}
          />

          <div className="flex gap-2">
  <input
    type="email"
    name="email"
    value={form.email}
    onChange={handleChange}
    placeholder="Email Address"
    required
    className={`flex-1 h-14 px-4 rounded-xl border outline-none ${
      darkMode
        ? "bg-[#111827] text-white border-gray-700"
        : "bg-gray-50 text-gray-900 border-gray-300"
    }`}
  />

  <button
    type="button"
    onClick={handleSendOtp}
    disabled={otpLoading || emailVerified}
    className="px-4 rounded-xl bg-blue-600 text-white"
  >
    {emailVerified
      ? "Verified"
      : otpLoading
      ? "Sending..."
      : "Verify"}
  </button>
</div>
{otpSent && !emailVerified && (
  <div className="flex gap-2">
    <input
      type="text"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      placeholder="Enter OTP"
      className={`flex-1 h-14 px-4 rounded-xl border ${
        darkMode
          ? "bg-[#111827] text-white border-gray-700"
          : "bg-gray-50 text-gray-900 border-gray-300"
      }`}
    />

    <button
      type="button"
      onClick={handleVerifyOtp}
      className="px-4 rounded-xl bg-green-600 text-white"
    >
      Verify OTP
    </button>
  </div>
)}
{emailVerified && (
  <p className="text-green-500 font-medium">
    ✅ Email Verified
  </p>
)}

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className={`w-full h-14 px-4 rounded-xl border outline-none transition-all ${
              darkMode
                ? "bg-[#111827] text-white border-gray-700 placeholder-gray-400 focus:border-purple-500"
                : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500 focus:border-purple-500"
            }`}
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className={`w-full h-14 px-4 rounded-xl border outline-none transition-all ${
              darkMode
                ? "bg-[#111827] text-white border-gray-700 placeholder-gray-400 focus:border-purple-500"
                : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500 focus:border-purple-500"
            }`}
          />

          <button
            type="submit"
            disabled={loading || !emailVerified}
            className="w-full h-14 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all disabled:opacity-50"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <p
          className={`text-center mt-6 text-sm ${
            darkMode
              ? "text-gray-400"
              : "text-gray-600"
          }`}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-500 hover:text-purple-600 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;