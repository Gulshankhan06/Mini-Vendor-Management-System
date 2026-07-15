import React, { useEffect, useState } from "react";
import API from "../api/axios";

type Props = {
  darkMode: boolean;
};

interface User {
  _id: string;
  username: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  image?: string;
}

const Profile = ({ darkMode }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const u = res.data.user;

      setUser(u);

      setForm({
        name: u.name || "",
        phone: u.phone || "",
        password: "",
      });

      localStorage.setItem("user", JSON.stringify(u));
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  if (e.target.files && e.target.files[0]) {
    setSelectedImage(e.target.files[0]);
  }
};
const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");

    // Update profile (name, phone, password)
    const body: any = {
      name: form.name,
      phone: form.phone,
    };

    if (form.password.trim()) {
      body.password = form.password;
    }

    await API.put("/auth/profile", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Upload image if selected
    if (selectedImage) {
      const formData = new FormData();

      formData.append("image", selectedImage);

      await API.put("/auth/profile-image", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    }

    alert("Profile updated successfully");

    loadProfile();
  } catch (err) {
    console.log(err);
    alert("Update Failed");
  }
};
  
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div
      className={`min-h-screen p-8 ${
        darkMode
          ? "bg-[#070B14] text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-5xl mx-auto">

        <div
          className={`rounded-3xl shadow-xl p-8 ${
            darkMode
              ? "bg-[#111827]"
              : "bg-white"
          }`}
        >
          <div className="flex flex-col items-center">

            <img
              src={
                user?.image
                  ? user.image
                  : "https://placehold.co/150x150?text=User"
              }
              className="w-36 h-36 rounded-full border-4 border-indigo-500 object-cover"
              alt=""
            />
            <div className="mt-4 flex flex-col items-center gap-2">

  <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg">
    Choose Image

    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleImageChange}
    />
  </label>

  {selectedImage && (
    <p className="text-sm text-gray-400">
      {selectedImage.name}
    </p>
  )}

</div>

            <h1 className="text-3xl font-bold mt-5">
              {user?.name}
            </h1>

            <p className="text-gray-400">
              @{user?.username}
            </p>

            <span className="mt-3 bg-indigo-600 text-white px-4 py-1 rounded-full">
              {user?.role}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div>
              <label>Name</label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl border text-black"
              />
            </div>

            <div>
              <label>Phone</label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl border text-black"
              />
            </div>

            <div>
              <label>Email</label>

              <input
                disabled
                value={user?.email || ""}
                className="w-full mt-2 p-3 rounded-xl border bg-gray-200 text-black"
              />
            </div>

            <div>
              <label>Username</label>

              <input
                disabled
                value={user?.username || ""}
                className="w-full mt-2 p-3 rounded-xl border bg-gray-200 text-black"
              />
            </div>

            <div className="md:col-span-2">
              <label>New Password</label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl border text-black"
              />
            </div>

          </div>

          <div className="flex gap-4 mt-8">

            <button
              onClick={handleSave}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl"
            >
              Save Changes
            </button>

            <button
              onClick={handleLogout}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl"
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