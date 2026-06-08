import React from "react";

import {
  User,
  Mail,
  Phone,
  Lock,
} from "lucide-react";

import { Link } from "react-router-dom";

function Registration() {

  return (

    <div className="w-full min-h-screen bg-[#F8FAFC] dark:bg-[#070B14] flex items-center justify-center px-5 overflow-hidden relative transition duration-300">

      {/* ================= BACKGROUND GLOW ================= */}

      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-purple-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-purple-700/20 blur-[120px] rounded-full"></div>

      {/* ================= REGISTER CARD ================= */}

      <div className="w-full max-w-md bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-xl rounded-[32px] p-8 sm:p-10 relative z-10 shadow-2xl shadow-purple-500/10 transition duration-300">

        {/* ================= HEADING ================= */}

        <div className="text-center">

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Create Account
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
            Register to manage your vendors easily
          </p>

        </div>

        {/* ================= FORM ================= */}

        <form className="mt-10 space-y-6">

          {/* FULL NAME */}

          <div>

            <label className="text-gray-700 dark:text-gray-300 text-sm font-medium block mb-3">
              Full Name
            </label>

            <div className="flex items-center bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-2xl px-4 h-14 focus-within:border-purple-400 transition duration-300">

              <User className="text-purple-500 dark:text-purple-400 w-5 h-5" />

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full h-full bg-transparent outline-none border-none text-gray-900 dark:text-white placeholder:text-gray-500 px-3"
              />

            </div>

          </div>

          {/* EMAIL */}

          <div>

            <label className="text-gray-700 dark:text-gray-300 text-sm font-medium block mb-3">
              Email Address
            </label>

            <div className="flex items-center bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-2xl px-4 h-14 focus-within:border-purple-400 transition duration-300">

              <Mail className="text-purple-500 dark:text-purple-400 w-5 h-5" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-full bg-transparent outline-none border-none text-gray-900 dark:text-white placeholder:text-gray-500 px-3"
              />

            </div>

          </div>

          {/* PHONE NUMBER */}

          <div>

            <label className="text-gray-700 dark:text-gray-300 text-sm font-medium block mb-3">
              Phone Number
            </label>

            <div className="flex items-center bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-2xl px-4 h-14 focus-within:border-purple-400 transition duration-300">

              <Phone className="text-purple-500 dark:text-purple-400 w-5 h-5" />

              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full h-full bg-transparent outline-none border-none text-gray-900 dark:text-white placeholder:text-gray-500 px-3"
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div>

            <label className="text-gray-700 dark:text-gray-300 text-sm font-medium block mb-3">
              Password
            </label>

            <div className="flex items-center bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-2xl px-4 h-14 focus-within:border-purple-400 transition duration-300">

              <Lock className="text-purple-500 dark:text-purple-400 w-5 h-5" />

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full h-full bg-transparent outline-none border-none text-gray-900 dark:text-white placeholder:text-gray-500 px-3"
              />

            </div>

          </div>

          {/* REGISTER BUTTON */}

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-400 text-white h-14 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg shadow-purple-500/20"
          >
            Register
          </button>

        </form>

        {/* ================= LOGIN TEXT ================= */}

        <div className="text-center mt-8">

          <p className="text-gray-600 dark:text-gray-400">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-purple-500 dark:text-purple-400 hover:text-purple-300 cursor-pointer transition duration-300 font-medium"
            >
              Login Now
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Registration;