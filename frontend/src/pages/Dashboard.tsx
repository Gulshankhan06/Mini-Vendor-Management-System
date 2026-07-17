
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../api/axios";

import {
  LayoutDashboard,
  Users,
  Package,
  LogOut,
} from "lucide-react";

import { MessageCircle } from "lucide-react";
import { ClipboardCopy } from "lucide-react";

interface DashboardProps {
  darkMode: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function Dashboard({
  darkMode,
  setIsAuthenticated,
}: DashboardProps) {
  const navigate = useNavigate();

  // ================= STATES =================
const [totalVendors, setTotalVendors] = useState<number>(0);

const [totalProducts, setTotalProducts] = useState<number>(0);

const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);


  // ================= FETCH DATA =================

  useEffect(() => {

    fetchDashboardData();

  }, []);

const fetchDashboardData = async (): Promise<void> => {
    try {

      // ================= FETCH VENDORS =================

      const vendorRes = await API.get(
        "/vendors/all"
      );

      setTotalVendors(
        vendorRes.data.vendors.length
      );

      // ================= FETCH PRODUCTS =================

      const productRes = await API.get(
        "/products/all"
      );

      setTotalProducts(
        productRes.data.products.length
      );

    } catch (error) {

      console.log(error);

    }

  };

  // ================= LOGOUT =================
const handleLogout = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("isAuthenticated");

  setIsAuthenticated(false);

  navigate("/", { replace: true });
};


  return (

    <div className={`${darkMode ? "dark" : ""}`}>

      <div className="w-full min-h-screen bg-gray-100 dark:bg-[#070B14] flex overflow-x-hidden">

        {/* ================= SIDEBAR ================= */}

        <div
          className={`
            fixed md:static top-0 left-0 z-50
            w-[280px] min-h-screen
            bg-white dark:bg-white/5
            border-r border-gray-200 dark:border-white/10
            backdrop-blur-xl p-6 flex flex-col justify-between
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >

          <div>

            {/* MOBILE CLOSE BUTTON */}

            <div className="flex justify-end md:hidden mb-4">

              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white text-3xl"
              >
                ×
              </button>

            </div>

            {/* LOGO */}

            <div className="flex items-center gap-3 mb-14">

              <div className="w-11 h-11 rounded-2xl bg-purple-500 flex items-center justify-center text-white font-bold text-xl">

                V

              </div>

              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">

                VendorFlow

              </h1>

            </div>

            {/* MENU */}

            <div className="space-y-5">

              <Link
                to="/dashboard"
                className="flex items-center gap-4 bg-purple-500/20 border border-purple-500/20 text-gray-900 dark:text-white px-5 py-4 rounded-2xl"
              >

                <LayoutDashboard size={22} />

                <span className="text-[17px] font-medium">
                 Admin Dashboard
                </span>

              </Link>

              <Link
                to="/vendors"
                className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 px-5 py-4 rounded-2xl transition duration-300"
              >

                <Users size={22} />

                <span className="text-[17px] font-medium">
                  Vendors
                </span>

              </Link>

              <Link
                to="/products"
                className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 px-5 py-4 rounded-2xl transition duration-300"
              >

                <Package size={22} />

                <span className="text-[17px] font-medium">
                  Products
                </span>

              </Link>

            </div>
                <Link
  to="/categories"
  className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 px-5 py-4 rounded-2xl transition duration-300"
>
 <ClipboardCopy size={22} />

  <span className="text-[17px] font-medium">
    Categories
  </span>
</Link>

          </div>

      

          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-400 text-white py-4 rounded-2xl font-semibold transition duration-300"
          >

            <LogOut size={20} />

            Logout

          </button>

        </div>

        {/* OVERLAY */}

        {
          sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )
        }

        {/* ================= MAIN CONTENT ================= */}

        <div className="flex-1 w-full p-4 md:p-10 overflow-y-auto">

          {/* MOBILE HEADER */}

          <div className="md:hidden flex items-center justify-between mb-6">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-2xl bg-purple-500 flex items-center justify-center text-white font-bold text-xl">

                V

              </div>

              <h1 className="text-2xl text-gray-900 font-bold  dark:text-white">

                VendorFlow

              </h1>

            </div>

            <button
              onClick={() => setSidebarOpen(true)}
              className="dark:text-white text-gray-900 text-4xl"
            >
              ☰
            </button>

          </div>

          {/* HEADING */}

          <div className="mb-10">

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">

              Vendor Dashboard

            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-3 text-base md:text-lg">

              Manage vendors and products professionally

            </p>

          </div>

          {/* ================= CARDS ================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

            {/* TOTAL VENDORS */}

            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[28px] p-6 md:p-8 shadow-xl">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg">

                    Total Vendors

                  </p>

                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-4">

                    {totalVendors}

                  </h2>

                </div>

                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center">

                  <Users
                    className="text-purple-400"
                    size={30}
                  />

                </div>

              </div>

            </div>

            {/* TOTAL PRODUCTS */}

            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[28px] p-6 md:p-8 shadow-xl">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg">

                    Total Products

                  </p>

                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-4">

                    {totalProducts}

                  </h2>

                </div>

                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center">

                  <Package
                    className="text-purple-400"
                    size={30}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
      <button
  onClick={() => navigate("/chat")}
  className="
    fixed
    bottom-6
    right-6
    z-50
    w-16
    h-16
    rounded-full
    bg-purple-500
    hover:bg-purple-600
    text-white
    flex
    items-center
    justify-center
    shadow-xl
    transition-all
    duration-300
  "
>
  <MessageCircle size={28} />
</button>

    </div>
  );
}

export default Dashboard;

