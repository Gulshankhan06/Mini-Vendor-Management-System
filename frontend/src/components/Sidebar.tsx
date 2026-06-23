import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  LogOut,
  FolderTree,
} from "lucide-react";

interface SidebarProps {
  darkMode: boolean;
  sidebarOpen?: boolean;
  setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout?: () => void;
}

const Sidebar = ({
  darkMode,
  sidebarOpen = true,
  setSidebarOpen,
  onLogout,
}: SidebarProps) => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Vendors", path: "/vendors", icon: Users },
    { name: "Products", path: "/products", icon: Package },
    { name: "Categories", path: "/categories", icon: FolderTree },
  ];

  return (
    <div
      className={`
        fixed md:static top-0 left-0 z-50
        w-[280px] h-screen
        bg-white dark:bg-white/5
        border-r border-gray-200 dark:border-white/10
        backdrop-blur-xl
        p-6 flex flex-col justify-between
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      {/* CLOSE BUTTON (MOBILE) */}
      <div className="flex justify-end md:hidden">
        <button
          onClick={() => setSidebarOpen?.(false)}
          className="text-gray-700 dark:text-white text-3xl"
        >
          ×
        </button>
      </div>

      {/* LOGO */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-11 h-11 rounded-2xl bg-purple-500 flex items-center justify-center text-white font-bold text-xl">
          V
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          VendorFlow
        </h1>
      </div>

      {/* MENU */}
      <div className="space-y-3 flex-1">
        {menu.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              onClick={() => setSidebarOpen?.(false)}
              className={`
                flex items-center gap-4 px-5 py-4 rounded-2xl transition duration-300
                ${
                  isActive
                    ? "bg-purple-500/20 border border-purple-500/20 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                }
              `}
            >
              <Icon size={22} />
              <span className="text-[17px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* LOGOUT */}
      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-400 text-white py-4 rounded-2xl font-semibold transition duration-300"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;