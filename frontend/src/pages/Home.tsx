import React, { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Package,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

interface HomeProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function Home({
  darkMode,
  setDarkMode,
  isAuthenticated,
  setIsAuthenticated,
}: HomeProps) {

  const navigate = useNavigate();

const [menuOpen, setMenuOpen] = useState<boolean>(false);

const handleLogout = (): void => {
    localStorage.removeItem("isAuthenticated");

    setIsAuthenticated(false);

    navigate("/");

  };

  return (

    <div className="w-full min-h-screen bg-white dark:bg-[#070B14] overflow-hidden relative transition duration-300">

      {/* ================= BACKGROUND GLOW ================= */}

      {/* ================= THEME TOGGLE ================= */}

<button
  onClick={() => setDarkMode(!darkMode)}
  className="fixed top-5 right-5 z-[9999] w-12 h-12 rounded-2xl 
  bg-white/80 dark:bg-white/10 
  border border-gray-300 dark:border-white/10 
  flex items-center justify-center 
  text-gray-900 dark:text-white 
  backdrop-blur-xl shadow-lg hover:scale-105 transition"
>
  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
</button>

      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-purple-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-purple-700/20 blur-[120px] rounded-full"></div>

      {/* ================= MOBILE NAVBAR ================= */}

      {
        isAuthenticated && (

          <div className="lg:hidden w-full flex items-center justify-between px-5 py-5 border-b border-gray-200 dark:border-white/10 backdrop-blur-xl relative z-50">

            {/* LOGO */}

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-2xl bg-purple-500 flex items-center justify-center text-white font-bold text-xl">

                V

              </div>

              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">

                VendorFlow

              </h1>

            </div>

            {/* MENU BUTTON */}

            <button
              onClick={() => setMenuOpen(true)}
              className="text-gray-900 dark:text-white"
            >

              <Menu size={34} />

            </button>

          </div>

        )
      }

      {/* ================= MOBILE MENU ================= */}

      {
        menuOpen && (

          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] lg:hidden">

            <div className="w-[280px] h-full bg-white dark:bg-[#0F172A] p-6 flex flex-col justify-between">

              {/* TOP */}

              <div>

                {/* HEADER */}

                <div className="flex items-center justify-between mb-10">

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-2xl bg-purple-500 flex items-center justify-center text-white font-bold text-xl">

                      V

                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">

                      VendorFlow

                    </h1>

                  </div>

                  <button
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-900 dark:text-white"
                  >

                    <X size={30} />

                  </button>

                </div>

                {/* MENU LINKS */}

                <div className="space-y-5">

                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-4 bg-purple-500/20 text-gray-900 dark:text-white px-5 py-4 rounded-2xl"
                  >

                    <LayoutDashboard size={22} />

                    Dashboard

                  </Link>

                  <Link
                    to="/vendors"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 px-5 py-4 rounded-2xl transition duration-300"
                  >

                    <Users size={22} />

                    Vendors

                  </Link>

                  <Link
                    to="/products"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 px-5 py-4 rounded-2xl transition duration-300"
                  >

                    <Package size={22} />

                    Products

                  </Link>

                </div>

              </div>

              {/* BOTTOM */}

              <div className="space-y-4">

                {/* DARK MODE BUTTON */}

                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="w-full flex items-center justify-center gap-3 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white py-4 rounded-2xl font-semibold"
                >

                  {
                    darkMode
                      ? <Sun size={20} />
                      : <Moon size={20} />
                  }

                  {
                    darkMode
                      ? "Light Mode"
                      : "Dark Mode"
                  }

                </button>

                {/* LOGOUT BUTTON */}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-400 text-white py-4 rounded-2xl font-semibold transition duration-300"
                >

                  <LogOut size={20} />

                  Logout

                </button>

              </div>

            </div>

          </div>

        )
      }

      {/* ================= HERO SECTION ================= */}

      <section className="w-full min-h-screen flex items-center justify-center px-5 sm:px-8 lg:px-12 relative z-10">

        <div className="max-w-6xl mx-auto text-center">

          {/* TOP BADGE */}

          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black/5 dark:bg-white/5 border border-gray-300 dark:border-white/10 backdrop-blur-xl mb-10">

            <div className="w-2 h-2 rounded-full bg-purple-400"></div>

            <p className="text-purple-500 dark:text-purple-300 uppercase tracking-[4px] text-xs sm:text-sm font-semibold">

              Smart Vendor Platform

            </p>

          </div>

          {/* HEADING */}

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight text-gray-900 dark:text-white">

            Vendor Management

            <span className="block text-purple-500 dark:text-purple-400 mt-3">

              System

            </span>

          </h1>

          {/* DESCRIPTION */}

          <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl leading-relaxed mt-10 max-w-3xl mx-auto">

            Manage vendors, products and business operations
            with a modern, secure and professional dashboard
            experience built for growing businesses.

          </p>

          {/* BUTTONS */}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-14">

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
{
  isAuthenticated && (
    <>
      <button
        onClick={() => navigate("/dashboard")}
        className="bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg shadow-purple-500/20 w-full sm:w-auto"
      >
        Admin Dashboard
      </button>

      <button
        onClick={() => navigate("/vendor-dashboard")}
        className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg shadow-green-500/20 w-full sm:w-auto"
      >
        Vendor Dashboard
      </button>
    </>
  )
}
           
            <button className="bg-black/5 dark:bg-white/5 border border-gray-300 dark:border-white/10 hover:border-purple-400 hover:text-purple-400 text-gray-900 dark:text-white px-8 py-4 rounded-2xl text-lg font-semibold transition duration-300 backdrop-blur-xl w-full sm:w-auto">

              Learn More

            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;