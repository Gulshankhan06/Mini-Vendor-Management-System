

import React from "react";

import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";

function Home({
  darkMode,
  setDarkMode,
  isAuthenticated,
}) {

  const navigate = useNavigate();

  return (

    <div className="w-full min-h-screen bg-white dark:bg-[#070B14] overflow-hidden relative transition duration-300">

      {/* ================= BACKGROUND GLOW ================= */}

      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-purple-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-purple-700/20 blur-[120px] rounded-full"></div>

      {/* ================= NAVBAR ================= */}

      {
        isAuthenticated && (

          <Navbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            isAuthenticated={isAuthenticated}
          />

        )
      }

      {/* ================= HERO SECTION ================= */}

      <section className="w-full min-h-screen flex items-center justify-center px-5 sm:px-8 lg:px-12 relative z-10">

        <div className="max-w-6xl mx-auto text-center">

          {/* ================= TOP BADGE ================= */}

          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black/5 dark:bg-white/5 border border-gray-300 dark:border-white/10 backdrop-blur-xl mb-10">

            <div className="w-2 h-2 rounded-full bg-purple-400"></div>

            <p className="text-purple-500 dark:text-purple-300 uppercase tracking-[4px] text-xs sm:text-sm font-semibold">

              Smart Vendor Platform

            </p>

          </div>

          {/* ================= MAIN HEADING ================= */}

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight text-gray-900 dark:text-white">

            Vendor Management

            <span className="block text-purple-500 dark:text-purple-400 mt-3">

              System

            </span>

          </h1>

          {/* ================= DESCRIPTION ================= */}

          <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl leading-relaxed mt-10 max-w-3xl mx-auto">

            Manage vendors, products and business operations
            with a modern, secure and professional dashboard
            experience built for growing businesses.

          </p>

          {/* ================= BUTTONS ================= */}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-14">

            {/* ================= LOGIN BUTTON ================= */}

            {
              !isAuthenticated && (

                <button
                  onClick={() => navigate("/login")}
                  className="bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg shadow-purple-500/20 w-full sm:w-auto"
                >

                  Login

                </button>

              )
            }

            {/* ================= DASHBOARD BUTTON ================= */}

            {
              isAuthenticated && (

                <button
                  onClick={() => navigate("/dashboard")}
                  className="bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg shadow-purple-500/20 w-full sm:w-auto"
                >

                  Open Dashboard

                </button>

              )
            }

            {/* ================= SECOND BUTTON ================= */}

            <button className="bg-black/5 dark:bg-white/5 border border-gray-300 dark:border-white/10 hover:border-purple-400 hover:text-purple-400 text-gray-900 dark:text-white px-8 py-4 rounded-2xl text-lg font-semibold transition duration-300 backdrop-blur-xl w-full sm:w-auto">

              Learn More

            </button>

          </div>

          {/* ================= STATS ================= */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20">

            {/* ================= CARD 1 ================= */}

            <div className="bg-black/5 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-purple-400 transition duration-300">

              <h2 className="text-4xl font-bold text-purple-500 dark:text-purple-400 mb-3">

                10K+

              </h2>

              <p className="text-gray-600 dark:text-gray-400 text-lg">

                Active Vendors

              </p>

            </div>

            {/* ================= CARD 2 ================= */}

            <div className="bg-black/5 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-purple-400 transition duration-300">

              <h2 className="text-4xl font-bold text-purple-500 dark:text-purple-400 mb-3">

                98%

              </h2>

              <p className="text-gray-600 dark:text-gray-400 text-lg">

                Client Satisfaction

              </p>

            </div>

            {/* ================= CARD 3 ================= */}

            <div className="bg-black/5 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-purple-400 transition duration-300">

              <h2 className="text-4xl font-bold text-purple-500 dark:text-purple-400 mb-3">

                24/7

              </h2>

              <p className="text-gray-600 dark:text-gray-400 text-lg">

                Premium Support

              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;