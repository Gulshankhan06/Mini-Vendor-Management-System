import API from "../api/axios";

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
  Pencil,
  Trash2,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

interface Vendor {
  _id: string;
  vendorName: string;
  email: string;
  phone: string;
  address: string;
  businessId: string;
}

interface FormData {
  vendorName: string;
  email: string;
  phone: string;
  address: string;
  businessId: string;
}

interface VendorsProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function Vendors({
  darkMode,
  setDarkMode,
}: VendorsProps) {

  const [showForm, setShowForm] = useState<boolean>(false);

  const [vendors, setVendors] = useState<Vendor[]>([]);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState<FormData>({
    vendorName: "",
    email: "",
    phone: "",
    address: "",
    businessId: "",
  });

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async (): Promise<void> => {
    try {
      const res = await API.get("/vendors/all");
      setVendors(res.data.vendors as Vendor[]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveVendor = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {

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

      if (editIndex !== null) {

        await API.put(
          `/vendors/${vendors[editIndex]._id}`,
          formData
        );

        fetchVendors();
        setEditIndex(null);

      } else {

        const res = await API.post(
          "/vendors/add",
          formData
        );

        setVendors([
          res.data.vendor,
          ...vendors,
        ]);
      }

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

  const handleEdit = (index: number): void => {

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

  const handleDelete = async (
    id: string
  ): Promise<void> => {

    try {

      await API.delete(`/vendors/${id}`);
      fetchVendors();

    } catch (error) {
      console.log(error);
    }
  };

  const filteredVendors = vendors.filter((vendor) =>
  vendor.vendorName.toLowerCase().includes(search.toLowerCase()) ||
  vendor.email.toLowerCase().includes(search.toLowerCase()) ||
  vendor.phone.toLowerCase().includes(search.toLowerCase()) ||
  vendor.address.toLowerCase().includes(search.toLowerCase()) ||
  vendor.businessId.toLowerCase().includes(search.toLowerCase())
);

  return (

    
  <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#070B14]">

  {/* LEFT SIDEBAR */}
  <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070B14]">
  <div className="flex">

    {/* Sidebar Desktop Only */}
    <div className="hidden lg:block w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-white/10">
    <Sidebar darkMode={darkMode} />   
    </div>

    {/* Content */}
    <div className="flex-1 p-4 md:p-6 lg:p-10">

  
  

    {/* HEADER */}
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

      <div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Vendor Management
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mt-3 text-base md:text-lg">
          Add and manage all vendors professionally
        </p>
      </div>

      <div className="flex items-center">
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
          className="w-full md:w-auto flex items-center justify-center gap-3 bg-purple-500 hover:bg-purple-400 text-white px-6 md:px-7 py-4 rounded-2xl text-base md:text-lg font-semibold transition duration-300 shadow-lg shadow-purple-500/20"
        >
          <Plus size={22} />
{editIndex !== null ? "Edit Vendor" : "Add Vendor"}
        </button>
      </div>

    </div>

      {/* ================= FORM ================= */}

      {
        showForm && (

          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[30px] p-5 md:p-8 backdrop-blur-xl shadow-2xl shadow-purple-500/10 mb-10 transition duration-300">

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
                  className="w-full md:w-auto bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg shadow-purple-500/20"
                >

                Save vendor

                </button>

              </div>

            </form>

          </div>

        )
      }

      {/* ================= TABLE ================= */}

      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[30px] backdrop-blur-xl shadow-2xl shadow-purple-500/10 overflow-hidden">

        {/* ================= SCROLL CONTAINER ================= */}
        <div className="p-6 border-b border-gray-200 dark:border-white/10">
  <input
    type="text"
    placeholder="Search vendors..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className={`w-full md:w-80 px-4 py-3 rounded-xl border outline-none transition-all ${
      darkMode
        ? "bg-[#0F172A] border-white/10 text-white placeholder-gray-400 focus:border-purple-500"
        : "bg-white border-gray-300 text-black placeholder-gray-500 focus:border-purple-500"
    }`}
  />
</div>

        <div className="overflow-x-auto">

          <div className="min-w-[1000px]">

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
            
filteredVendors.length > 0 ? (
  filteredVendors.map((vendor, index) => (
                  <div
                    key={vendor._id}
                    className="grid grid-cols-6 px-6 py-5 border-b border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/5 transition duration-300 items-center"
                  >

                    <p className="text-gray-700 dark:text-gray-300 break-words pr-4">
                      {vendor.vendorName}
                    </p>

                    <p className="text-gray-700 dark:text-gray-300 break-words pr-4">
                      {vendor.email}
                    </p>

                    <p className="text-gray-700 dark:text-gray-300">
                      {vendor.phone}
                    </p>

                    <p className="text-gray-700 dark:text-gray-300 break-words pr-4">
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

                    No vendors found.

                  </p>

                </div>

              )
            }

          </div>

        </div>

      </div>

    </div>
    </div>
    </div>
    </div>
  );
}

export default Vendors;