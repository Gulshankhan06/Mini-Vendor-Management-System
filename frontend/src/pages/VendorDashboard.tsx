// 
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, Package, Users, MessageCircle } from "lucide-react";
import API from "../api/axios";

interface Stats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  monthlySales: number;
  totalRevenue: number;
}

type Props = {
  darkMode: boolean;
};

function VendorDashboard({ darkMode }: Props) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token || user.role !== "vendor") return;

    fetch(
      `https://mini-vendor-management-system.onrender.com/api/vendors/dashboard/${user._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(console.log);
  }, []);

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
            {/* MOBILE CLOSE */}
            <div className="flex justify-end md:hidden mb-4">
              <button onClick={() => setSidebarOpen(false)}>
                <X size={28} className="text-white" />
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
                to="/vendor-dashboard"
                className="flex items-center gap-4 bg-purple-500/20 border border-purple-500/20 text-gray-900 dark:text-white px-5 py-4 rounded-2xl"
              >
                <LayoutDashboard size={22} />
                <span className="text-[17px] font-medium">Dashboard</span>
              </Link>

              <Link
                to="/vendor-products"
                className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 px-5 py-4 rounded-2xl"
              >
                <Package size={22} />
                <span className="text-[17px] font-medium">Products</span>
              </Link>

              <Link
                to="/vendor-orders"
                className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 px-5 py-4 rounded-2xl"
              >
                <Users size={22} />
                <span className="text-[17px] font-medium">Orders</span>
              </Link>

              <Link
                to="/vendor-chat"
                className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 px-5 py-4 rounded-2xl"
              >
                <MessageCircle size={22} />
                <span className="text-[17px] font-medium">Chat</span>
              </Link>
            </div>
          </div>

          {/* FOOTER */}
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-400 text-white py-4 rounded-2xl font-semibold transition"
          >
            Logout
          </button>
        </div>

        {/* OVERLAY */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ================= MAIN ================= */}
        <div className="flex-1 w-full p-4 md:p-10 overflow-y-auto">

          {/* MOBILE HEADER */}
          <div className="md:hidden flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-purple-500 flex items-center justify-center text-white font-bold text-xl">
                V
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                VendorFlow
              </h1>
            </div>

            <button onClick={() => setSidebarOpen(true)}>
              <Menu size={30} className="text-gray-900 dark:text-white" />
            </button>
          </div>

          {/* HEADING */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Vendor Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-3">
              Manage your orders and performance
            </p>
          </div>

          {/* ================= CARDS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* TOTAL ORDERS */}
            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[28px] p-6 shadow-xl">
              <p className="text-gray-500 dark:text-gray-400">Total Orders</p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-4">
                {stats?.totalOrders || 0}
              </h2>
            </div>

            {/* PENDING */}
            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[28px] p-6 shadow-xl">
              <p className="text-gray-500 dark:text-gray-400">Pending Orders</p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-4">
                {stats?.pendingOrders || 0}
              </h2>
            </div>

            {/* COMPLETED */}
            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[28px] p-6 shadow-xl">
              <p className="text-gray-500 dark:text-gray-400">Completed Orders</p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-4">
                {stats?.completedOrders || 0}
              </h2>
            </div>

          </div>
        </div>
      </div>

      {/* CHAT BUTTON */}
      <button
        onClick={() => navigate("/vendor-chat")}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center shadow-xl"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
}

export default VendorDashboard;