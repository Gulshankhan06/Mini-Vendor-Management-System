import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Vendors", path: "/vendors", icon: Users },
    { name: "Products", path: "/products", icon: Package },
  ];

  return (
<div className="
  w-full
  lg:w-64
  lg:h-screen
  bg-white
  dark:bg-black
  border-r
  border-gray-200
  dark:border-white/10
  p-4
  relative
">      
      {/* Title */}
      <h1 className="text-xl font-bold text-black dark:text-white mb-6">
        Admin Panel
      </h1>

      {/* Menu */}
      <nav className="space-y-2">
        {menu.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-10 lg:absolute lg:bottom-5 w-52">
        <button className="flex items-center gap-3 text-red-500">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;