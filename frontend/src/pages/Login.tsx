

import React, { useState } from "react";

import {
  Mail,
  Lock,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

interface LoginProps {
  darkMode: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormData {
  email: string;
  password: string;
}

function Login({
  darkMode,
  setIsAuthenticated,
}: LoginProps) {

  const navigate = useNavigate();

  // ================= FORM STATE =================
const [formData, setFormData] = useState<FormData>({
  email: "",
  password: "",
});



// ================= HANDLE CHANGE =================

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>
): void => {

  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });

};

// ================= HANDLE LOGIN =================

const handleLogin = (
  e: React.FormEvent<HTMLFormElement>
): void => {

  e.preventDefault();

  if (
    !formData.email ||
    !formData.password
  ) {

    alert("Please fill all fields");
    return;
  }

  localStorage.setItem(
    "isAuthenticated",
    "true"
  );

  setIsAuthenticated(true);

  navigate("/");

};
  return (

    <div className={`${darkMode ? "dark" : ""}`}>

      <div className="w-full min-h-screen bg-gray-100 dark:bg-[#070B14] flex items-center justify-center px-5 overflow-hidden relative transition-all duration-300">

        {/* ================= BACKGROUND GLOW ================= */}

        <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-purple-500/20 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-purple-700/20 blur-[120px] rounded-full"></div>

        {/* ================= LOGIN CARD ================= */}

        <div className="w-full max-w-md bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-xl rounded-[32px] p-8 sm:p-10 relative z-10 shadow-2xl dark:shadow-purple-500/10">

          {/* ================= HEADING ================= */}

          <div className="text-center">

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Welcome Back
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">
              Login to continue managing your vendors
            </p>

          </div>

          {/* ================= FORM ================= */}

          <form
            onSubmit={handleLogin}
            className="mt-10 space-y-6"
          >

            {/* EMAIL INPUT */}

            <div>

              <label className="text-gray-700 dark:text-gray-300 text-sm font-medium block mb-3">

                Email Address

              </label>

              <div className="flex items-center bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-2xl px-4 h-14 focus-within:border-purple-400 transition duration-300">

                <Mail className="text-purple-400 w-5 h-5" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full h-full bg-transparent outline-none border-none text-gray-900 dark:text-white placeholder:text-gray-500 px-3"
                />

              </div>

            </div>

            {/* PASSWORD INPUT */}

            <div>

              <label className="text-gray-700 dark:text-gray-300 text-sm font-medium block mb-3">

                Password

              </label>

              <div className="flex items-center bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-2xl px-4 h-14 focus-within:border-purple-400 transition duration-300">

                <Lock className="text-purple-400 w-5 h-5" />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full h-full bg-transparent outline-none border-none text-gray-900 dark:text-white placeholder:text-gray-500 px-3"
                />

              </div>

            </div>

            {/* FORGOT PASSWORD */}

            <div className="flex justify-end">

              <button
                type="button"
                className="text-sm text-purple-500 hover:text-purple-400 transition duration-300"
              >

                Forgot Password?

              </button>

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-400 text-white h-14 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg shadow-purple-500/20"
            >

              Login

            </button>

          </form>

          {/* ================= REGISTER TEXT ================= */}

          <div className="text-center mt-8">

            <p className="text-gray-500 dark:text-gray-400">

              Don’t have an account?{" "}

              <Link
                to="/register"
                className="text-purple-500 hover:text-purple-400 cursor-pointer transition duration-300 font-medium"
              >

                Register Now

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;