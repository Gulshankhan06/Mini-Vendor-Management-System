import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function VendorLayout({ darkMode }: { darkMode: boolean }) {
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/vendor" },
    { name: "Orders", path: "/vendor/orders" },
    { name: "Products", path: "/vendor/products" },
    { name: "Chat", path: "/vendor/chat" },
    { name: "Profile", path: "/vendor/profile" },
  ];

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-[#070B14] text-white" : "bg-gray-100 text-black"}`}>

      {/* SIDEBAR */}
      <div className={`w-64 p-5 ${darkMode ? "bg-white/5" : "bg-white"} border-r`}>
        <h2 className="text-xl font-bold mb-8">Vendor Panel</h2>

        <ul className="space-y-3">
          {menu.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/vendor"}
                className={({ isActive }) =>
                  `block p-2 rounded ${
                    isActive ? "bg-blue-500 text-white" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* PAGE CONTENT */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default VendorLayout;