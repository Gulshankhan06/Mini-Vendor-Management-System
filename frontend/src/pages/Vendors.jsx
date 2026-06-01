import API from "../../api";

import React, {
  useState,
  useEffect,
} from "react";

import {
  Plus,
  Users,
  Mail,
  Phone,
  Building2,
  MapPin,
  Moon,
  Sun,
  Pencil,
  Trash2,
} from "lucide-react";

function Vendors({
  darkMode,
  setDarkMode,
}) {

  const [showForm, setShowForm] = useState(false);

  const [vendors, setVendors] = useState([]);

  const [editIndex, setEditIndex] = useState(null);

  const [formData, setFormData] = useState({
    vendorName: "",
    email: "",
    phone: "",
    address: "",
    businessId: "",
  });

  /* ================= FETCH VENDORS ================= */

  useEffect(() => {

    fetchVendors();

  }, []);

  const fetchVendors = async () => {

    try {

      const res = await API.get("/vendors/all");

      setVendors(res.data.vendors);

    } catch (error) {

      console.log(error);

    }

  };

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  /* ================= SAVE VENDOR ================= */

  const handleSaveVendor = async (e) => {

    e.preventDefault();

    if (
      !formData.vendorName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.businessId
    ) {

      alert("Please fill all fields");

      return;

    }

    try {

      /* ================= UPDATE ================= */

      if (editIndex !== null) {

        await API.put(
          `/vendors/${vendors[editIndex]._id}`,
          formData
        );

        fetchVendors();

        setEditIndex(null);

      } else {

        /* ================= ADD ================= */

        const res = await API.post(
          "/vendors/add",
          formData
        );

        setVendors([
          res.data.vendor,
          ...vendors,
        ]);

      }

      /* ================= RESET ================= */

      setFormData({
        vendorName: "",
        email: "",
        phone: "",
        address: "",
        businessId: "",
      });

      setShowForm(false);

    } catch (error) {

      console.log(error);

    }

  };

  /* ================= EDIT ================= */

  const handleEdit = (index) => {

    setFormData({
      vendorName: vendors[index].vendorName,
      email: vendors[index].email,
      phone: vendors[index].phone,
      address: vendors[index].address,
      businessId: vendors[index].businessId,
    });

    setEditIndex(index);

    setShowForm(true);

  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {

    try {

      await API.delete(`/vendors/${id}`);

      fetchVendors();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="w-full min-h-screen bg-[#F8FAFC] dark:bg-[#070B14] transition duration-300 p-6 md:p-10">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

        <div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">

            Vendor Management

          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">

            Add and manage all vendors professionally

          </p>

        </div>

        {/* ================= BUTTONS ================= */}

        <div className="flex items-center">

          

          {/* ================= ADD BUTTON ================= */}

          <button
            onClick={() => {

              setShowForm(!showForm);

              if (showForm) {

                setEditIndex(null);

                setFormData({
                  vendorName: "",
                  email: "",
                  phone: "",
                  address: "",
                  businessId: "",
                });

              }

            }}
            className="flex items-center justify-center gap-3 bg-purple-500 hover:bg-purple-400 text-white px-7 py-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg shadow-purple-500/20"
          >

            <Plus size={22} />

            {
              editIndex !== null
                ? "Edit Vendor"
                : "Add Vendor"
            }

          </button>

        </div>

      </div>

      {/* ================= FORM ================= */}

      {
        showForm && (

          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[30px] p-8 backdrop-blur-xl shadow-2xl shadow-purple-500/10 mb-10 transition duration-300">

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">

              {
                editIndex !== null
                  ? "Edit Vendor"
                  : "Add New Vendor"
              }

            </h2>

            <form
              onSubmit={handleSaveVendor}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >

              {/* ================= VENDOR NAME ================= */}

              <div>

                <label className="text-gray-700 dark:text-gray-300 text-sm block mb-3">

                  Vendor Name

                </label>

                <div className="flex items-center bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-2xl px-4 h-14">

                  <Users className="text-purple-500 dark:text-purple-400 w-5 h-5" />

                  <input
                    type="text"
                    name="vendorName"
                    value={formData.vendorName}
                    onChange={handleChange}
                    placeholder="Enter vendor name"
                    className="w-full h-full bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-500 px-3"
                  />

                </div>

              </div>

              {/* ================= EMAIL ================= */}

              <div>

                <label className="text-gray-700 dark:text-gray-300 text-sm block mb-3">

                  Email Address

                </label>

                <div className="flex items-center bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-2xl px-4 h-14">

                  <Mail className="text-purple-500 dark:text-purple-400 w-5 h-5" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="w-full h-full bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-500 px-3"
                  />

                </div>

              </div>

              {/* ================= PHONE ================= */}

              <div>

                <label className="text-gray-700 dark:text-gray-300 text-sm block mb-3">

                  Phone Number

                </label>

                <div className="flex items-center bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-2xl px-4 h-14">

                  <Phone className="text-purple-500 dark:text-purple-400 w-5 h-5" />

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full h-full bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-500 px-3"
                  />

                </div>

              </div>

              {/* ================= ADDRESS ================= */}

              <div>

                <label className="text-gray-700 dark:text-gray-300 text-sm block mb-3">

                  Address

                </label>

                <div className="flex items-center bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-2xl px-4 h-14">

                  <MapPin className="text-purple-500 dark:text-purple-400 w-5 h-5" />

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter vendor address"
                    className="w-full h-full bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-500 px-3"
                  />

                </div>

              </div>

              {/* ================= BUSINESS ID ================= */}

              <div>

                <label className="text-gray-700 dark:text-gray-300 text-sm block mb-3">

                  Business ID

                </label>

                <div className="flex items-center bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-2xl px-4 h-14">

                  <Building2 className="text-purple-500 dark:text-purple-400 w-5 h-5" />

                  <input
                    type="text"
                    name="businessId"
                    value={formData.businessId}
                    onChange={handleChange}
                    placeholder="Enter business ID"
                    className="w-full h-full bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-500 px-3"
                  />

                </div>

              </div>

              {/* ================= SAVE BUTTON ================= */}

              <div className="md:col-span-2 flex justify-end mt-4">

                <button
                  type="submit"
                  className="bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg shadow-purple-500/20"
                >

                  {
                    editIndex !== null
                      ? "Update Vendor"
                      : "Save Vendor"
                  }

                </button>

              </div>

            </form>

          </div>

        )
      }

      {/* ================= TABLE ================= */}

      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[30px] overflow-hidden backdrop-blur-xl shadow-2xl shadow-purple-500/10">

        {/* ================= TABLE HEADER ================= */}

        <div className="grid grid-cols-6 bg-purple-500/20 border-b border-gray-200 dark:border-white/10 px-6 py-5">

          <h3 className="text-gray-900 dark:text-white font-semibold text-lg">
            Vendor Name
          </h3>

          <h3 className="text-gray-900 dark:text-white font-semibold text-lg">
            Email
          </h3>

          <h3 className="text-gray-900 dark:text-white font-semibold text-lg">
            Phone
          </h3>

          <h3 className="text-gray-900 dark:text-white font-semibold text-lg">
            Address
          </h3>

          <h3 className="text-gray-900 dark:text-white font-semibold text-lg">
            Business ID
          </h3>

          <h3 className="text-gray-900 dark:text-white font-semibold text-lg text-center">
            Actions
          </h3>

        </div>

        {/* ================= TABLE BODY ================= */}

        {
          vendors.length > 0 ? (

            vendors.map((vendor, index) => (

              <div
                key={vendor._id}
                className="grid grid-cols-6 px-6 py-5 border-b border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/5 transition duration-300"
              >

                <p className="text-gray-700 dark:text-gray-300">
                  {vendor.vendorName}
                </p>

                <p className="text-gray-700 dark:text-gray-300">
                  {vendor.email}
                </p>

                <p className="text-gray-700 dark:text-gray-300">
                  {vendor.phone}
                </p>

                <p className="text-gray-700 dark:text-gray-300">
                  {vendor.address}
                </p>

                <p className="text-gray-700 dark:text-gray-300">
                  {vendor.businessId}
                </p>

                {/* ================= ACTION BUTTONS ================= */}

                <div className="flex items-center justify-center gap-3">

                  {/* ================= EDIT ================= */}

                  <button
                    onClick={() => handleEdit(index)}
                    className="w-10 h-10 rounded-xl bg-blue-500 hover:bg-blue-400 flex items-center justify-center text-white transition duration-300"
                  >

                    <Pencil size={18} />

                  </button>

                  {/* ================= DELETE ================= */}

                  <button
                    onClick={() => handleDelete(vendor._id)}
                    className="w-10 h-10 rounded-xl bg-red-500 hover:bg-red-400 flex items-center justify-center text-white transition duration-300"
                  >

                    <Trash2 size={18} />

                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className="py-14 text-center">

              <p className="text-gray-500 text-lg">

                No vendors added yet

              </p>

            </div>

          )
        }

      </div>

    </div>
  );
}

export default Vendors;