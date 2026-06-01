

import React from "react";

import {
  Link,
} from "react-router-dom";

import {
  Moon,
  Sun,
} from "lucide-react";

function Navbar({
  darkMode,
  setDarkMode,
  isAuthenticated,
}) {

  return (

    <header className="w-full fixed top-0 left-0 z-50 bg-white/80 dark:bg-[#070B14]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10">

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

        <div className="h-20 flex items-center justify-between">

          {/* ================= LOGO ================= */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <div className="w-11 h-11 rounded-2xl bg-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/20">

              V

            </div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-gray-900 dark:text-white">

              VendorFlow

            </h1>

          </Link>

          {/* ================= NAV LINKS ================= */}

          {
            isAuthenticated && (

              <nav className="hidden md:flex items-center gap-12">

                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-400 text-[17px] font-medium transition duration-300"
                >
                  Home
                </Link>

                <Link
                  to="/dashboard"
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-400 text-[17px] font-medium transition duration-300"
                >
                  Dashboard
                </Link>

                <Link
                  to="/vendors"
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-400 text-[17px] font-medium transition duration-300"
                >
                  Vendors
                </Link>

                <Link
                  to="/products"
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-400 text-[17px] font-medium transition duration-300"
                >
                  Products
                </Link>

              </nav>
            )
          }

          {/* ================= RIGHT SIDE ================= */}

          <div className="hidden md:flex items-center gap-5">

            {/* ================= DARK LIGHT MODE ================= */}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-12 h-12 rounded-2xl bg-purple-500 hover:bg-purple-400 text-white flex items-center justify-center transition duration-300 shadow-lg shadow-purple-500/20"
            >

              {
                darkMode
                  ? <Sun size={20} />
                  : <Moon size={20} />
              }

            </button>

            {/* ================= LOGIN BUTTONS ================= */}

            {
              !isAuthenticated && (

                <>

                  <Link
                    to="/login"
                    className="text-gray-700 dark:text-gray-300 hover:text-purple-400 text-[17px] font-medium transition duration-300"
                  >

                    Login

                  </Link>

                  <Link
                    to="/login"
                    className="bg-purple-500 hover:bg-purple-400 text-white px-6 py-3 rounded-2xl font-semibold text-[16px] transition duration-300 shadow-lg shadow-purple-500/20"
                  >

                    Get Started

                  </Link>

                </>
              )
            }

          </div>

          {/* ================= MOBILE MENU ================= */}

          <button className="md:hidden text-gray-900 dark:text-white text-3xl">

            ☰

          </button>

        </div>

      </div>

    </header>
  );
}

export default Navbar;