import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Vendors", path: "/dashboard/vendors" },
    { name: "Products", path: "/dashboard/products" },
  ];

  return (
    <div className="w-64 bg-[#0f172a] text-white min-h-screen p-5">

      <h1 className="text-2xl font-bold mb-8 text-blue-400">
        VMS System
      </h1>

      <nav className="space-y-2">

        {menu.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            className={`block px-4 py-2 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            {item.name}
          </Link>
        ))}

      </nav>

    </div>
  );
};

export default Sidebar;