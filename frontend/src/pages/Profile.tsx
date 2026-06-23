import React, { useEffect, useState } from "react";

type Props = {
  darkMode: boolean;
};

interface User {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
}

const Profile = ({ darkMode }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (storedUser?.email) {
      setUser(storedUser);
      setForm({
        name: storedUser.name || "",
        phone: storedUser.phone || "",
        password: "",
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `https://mini-vendor-management-system.onrender.com/api/vendors/update/${user?._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    if (data?.user) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Profile updated successfully");
    } else {
      alert(data?.message || "Update failed");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const inputClass =
    `w-full px-4 py-3 rounded-xl border transition-all outline-none 
    focus:ring-2 focus:ring-indigo-500
    ${
      darkMode
        ? "bg-[#0B1220] border-white/10 text-white placeholder-gray-400"
        : "bg-white border-gray-300 text-black placeholder-gray-500"
    }`;

  return (
    <div
      className={`min-h-screen px-4 md:px-8 py-10 flex justify-center transition-all duration-300 ${
        darkMode ? "bg-[#070B14] text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="w-full max-w-5xl space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Profile Settings
          </h1>
          <p className={`mt-2 text-sm md:text-base ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Manage your account information and security
          </p>
        </div>

        {/* USER CARD */}
        <div
          className={`rounded-2xl p-6 border shadow-lg ${
            darkMode
              ? "bg-[#0F172A] border-white/10"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div>
              <p className="text-sm text-gray-400">Full Name</p>
              <p className="text-lg font-semibold">{user?.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-lg font-semibold break-all">{user?.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Role</p>
              <span className="inline-block mt-1 px-3 py-1 rounded-full bg-indigo-500 text-white text-sm">
                {user?.role || "User"}
              </span>
            </div>

          </div>
        </div>

        {/* EDIT FORM */}
        <div
          className={`rounded-2xl p-6 border shadow-lg space-y-6 ${
            darkMode
              ? "bg-[#0F172A] border-white/10"
              : "bg-white border-gray-200"
          }`}
        >
          <h2 className="text-xl font-semibold">Edit Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className={inputClass}
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className={inputClass}
            />

            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="New Password"
              type="password"
              className={`${inputClass} md:col-span-2`}
            />

          </div>

          {/* BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4 pt-2">

            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-xl font-semibold text-white 
              bg-gradient-to-r from-indigo-500 to-purple-600 
              hover:opacity-90 transition"
            >
              Save Changes
            </button>

            <button
              onClick={handleLogout}
              className="flex-1 py-3 rounded-xl font-semibold text-white 
              bg-red-500 hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;