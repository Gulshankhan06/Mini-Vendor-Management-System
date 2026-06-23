
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
}

function Login({ setIsAuthenticated, darkMode }: LoginProps) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ================= GOOGLE REDIRECT HANDLER =================
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("isAuthenticated", "true");

      setIsAuthenticated(true);

      window.history.replaceState({}, document.title, "/login");

      navigate("/dashboard", {
        replace: true,
      });
    }
  }, [navigate, setIsAuthenticated]);

  // ================= INPUT =================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= LOGIN =================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://mini-vendor-management-system.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login failed");
        setLoading(false);
        return;
      }

      if (!data.success && data.emailVerified === false) {
        navigate("/verify-email", {
          state: {
            email: data.email,
          },
        });
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(data.user));

      setIsAuthenticated(true);

      if (data.user.role === "vendor") {
        navigate("/vendor-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
    }

    setLoading(false);
  };

  // ================= GOOGLE LOGIN HANDLER =================
  const handleGoogleLogin = () => {
  const API_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  window.location.href = `${API_URL}/api/auth/google`;
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
            Welcome Back
          </h1>

          <p
            className={`mt-2 text-sm sm:text-base ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Login to continue managing vendors
          </p>
        </div>

        {/* ERROR */}
        {message && (
          <div className="mb-5 rounded-xl bg-red-500/10 border border-red-500/20 p-3">
            <p className="text-red-500 text-sm text-center">{message}</p>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label
              className={`block mb-2 text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className={`w-full h-14 px-4 rounded-xl border outline-none transition-all ${
                darkMode
                  ? "bg-[#111827] text-white border-gray-700 placeholder-gray-400 focus:border-purple-500"
                  : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500 focus:border-purple-500"
              }`}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label
              className={`block mb-2 text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className={`w-full h-14 px-4 rounded-xl border outline-none transition-all ${
                darkMode
                  ? "bg-[#111827] text-white border-gray-700 placeholder-gray-400 focus:border-purple-500"
                  : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500 focus:border-purple-500"
              }`}
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* GOOGLE LOGIN */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className={`w-full h-14 rounded-xl border font-medium transition-all ${
              darkMode
                ? "bg-[#111827] text-white border-gray-700 hover:bg-[#1F2937]"
                : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Continue with Google
          </button>
        </form>

        {/* REGISTER */}
        <p
          className={`text-center mt-6 text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-500 hover:text-purple-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;