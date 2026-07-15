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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const validateForm = () => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const nameRegex = /^[A-Za-z ]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!form.username || !form.name || !form.email || !form.password) {
      setMessage("All required fields are required");
      return false;
    }

    if (!usernameRegex.test(form.username)) {
      setMessage(
        "Username must contain only letters, numbers and underscore (3-20 characters).",
      );
      return false;
    }

    if (!nameRegex.test(form.name)) {
      setMessage("Name should contain only letters and spaces.");
      return false;
    }

    if (!emailRegex.test(form.email)) {
      setMessage("Please enter a valid email address.");
      return false;
    }

    if (form.phone && !phoneRegex.test(form.phone)) {
      setMessage("Please enter a valid 10-digit phone number.");
      return false;
    }

    if (!passwordRegex.test(form.password)) {
      setMessage(
        "Password must be at least 8 characters with uppercase, lowercase, number and special character.",
      );
      return false;
    }

    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("https://mini-vendor-management-system-backend.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Registration failed");
        setLoading(false);
        return;
      }
      setMessage("Registration successful");

      setTimeout(() => {
       navigate("/verify-email", {
  state: {
    email: form.email,
  },
}); 
      }, 1000);
    } catch (err) {
      console.log(err);
      setMessage("Server error. Please try again later.");
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
          darkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
        }`}
      >
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1
            className={`text-3xl sm:text-4xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Create Account
          </h1>

          <p
            className={`mt-2 text-sm sm:text-base ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Register to manage vendors
          </p>
        </div>

        {/* MESSAGE */}
        {message && (
          <div
            className={`mb-5 rounded-xl p-3 text-center text-sm ${
              message.includes("successful")
                ? "bg-green-500/10 border border-green-500/20 text-green-500"
                : "bg-red-500/10 border border-red-500/20 text-red-500"
            }`}
          >
            {message}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
            minLength={3}
            maxLength={20}
            pattern="^[a-zA-Z0-9_]{3,20}$"
            title="Only letters, numbers and underscore allowed."
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
            type="text"
            pattern="^[A-Za-z ]{2,50}$"
            title="Only letters and spaces are allowed."
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
    className="flex-1 h-14 px-4 rounded-xl border"
  />

  <button
    type="button"
    onClick={handleRegister}
    className="px-4 rounded-xl bg-purple-600 text-white"
  >
    Verify
  </button>
</div>

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            type="tel"
            maxLength={10}
            pattern="[6-9]{1}[0-9]{9}"
            title="Enter a valid 10-digit phone number."
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
            minLength={8}
            title="Minimum 8 characters with uppercase, lowercase, number and special character."
            className={`w-full h-14 px-4 rounded-xl border outline-none transition-all ${
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p
          className={`text-center mt-6 text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
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
