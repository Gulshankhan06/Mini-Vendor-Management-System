import API from "../../api";

import React, {
  useState,
  useEffect,
} from "react";

import {
  Plus,
  Package,
  DollarSign,
  Boxes,
  ClipboardList,
  Pencil,
  Trash2,
} from "lucide-react";

function Products({ darkMode }) {

  const [showForm, setShowForm] = useState(false);

  const [products, setProducts] = useState([]);

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    quantity: "",
  });

  /* ================= FETCH PRODUCTS ================= */

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const res = await API.get("/products/all");

      setProducts(res.data.products);

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

  /* ================= SAVE PRODUCT ================= */

  const handleSaveProduct = async (e) => {

    e.preventDefault();

    if (
      !formData.productName ||
      !formData.category ||
      !formData.price ||
      !formData.quantity
    ) {

      alert("Please fill all fields");

      return;

    }

    try {

      /* ================= UPDATE PRODUCT ================= */

      if (editId) {

        const res = await API.put(
          `/products/${editId}`,
          formData
        );

        setProducts(
          products.map((product) =>
            product._id === editId
              ? res.data.product
              : product
          )
        );

        setEditId(null);

      } else {

        /* ================= ADD PRODUCT ================= */

        const res = await API.post(
          "/products/add",
          formData
        );

        setProducts([
          res.data.product,
          ...products,
        ]);

      }

      /* ================= RESET FORM ================= */

      setFormData({
        productName: "",
        category: "",
        price: "",
        quantity: "",
      });

      setShowForm(false);

    } catch (error) {

      console.log(error);

    }

  };

  /* ================= EDIT PRODUCT ================= */

  const handleEdit = (product) => {

    setFormData({
      productName: product.productName,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
    });

    setEditId(product._id);

    setShowForm(true);

  };

  /* ================= DELETE PRODUCT ================= */

  const handleDelete = async (id) => {

    try {

      await API.delete(`/products/${id}`);

      setProducts(
        products.filter(
          (product) => product._id !== id
        )
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div
      className={`w-full min-h-screen p-4 sm:p-6 md:p-10 transition duration-300 overflow-x-hidden ${
        darkMode
          ? "bg-[#070B14]"
          : "bg-gray-100"
      }`}
    >

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

        <div>

          <h1
            className={`text-3xl sm:text-4xl font-bold ${
              darkMode
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            Product Management
          </h1>

          <p
            className={`mt-3 text-base sm:text-lg ${
              darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            Add and manage all products professionally
          </p>

        </div>

        {/* ================= ADD BUTTON ================= */}

        <button
          onClick={() => {

            setShowForm(!showForm);

            if (showForm) {

              setEditId(null);

              setFormData({
                productName: "",
                category: "",
                price: "",
                quantity: "",
              });

            }

          }}
          className="w-full sm:w-auto flex items-center justify-center gap-3 bg-purple-500 hover:bg-purple-400 text-white px-6 py-4 rounded-2xl text-base sm:text-lg font-semibold transition duration-300 shadow-lg shadow-purple-500/20"
        >

          <Plus size={22} />

          {
            editId
              ? "Edit Product"
              : "Add Product"
          }

        </button>

      </div>

      {/* ================= FORM ================= */}

      {showForm && (

        <div
          className={`rounded-[30px] p-5 sm:p-8 backdrop-blur-xl shadow-2xl mb-10 transition duration-300 ${
            darkMode
              ? "bg-white/5 border border-white/10 shadow-purple-500/10"
              : "bg-white border border-gray-200 shadow-gray-300/40"
          }`}
        >

          <h2
            className={`text-2xl font-bold mb-8 ${
              darkMode
                ? "text-white"
                : "text-gray-900"
            }`}
          >

            {
              editId
                ? "Edit Product"
                : "Add New Product"
            }

          </h2>

          <form
            onSubmit={handleSaveProduct}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >

            {/* PRODUCT NAME */}

            <div>

              <label
                className={`text-sm block mb-3 ${
                  darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                }`}
              >
                Product Name
              </label>

              <div
                className={`flex items-center rounded-2xl px-4 h-14 ${
                  darkMode
                    ? "bg-white/5 border border-white/10"
                    : "bg-gray-100 border border-gray-300"
                }`}
              >

                <Package className="text-purple-400 w-5 h-5" />

                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className={`w-full h-full bg-transparent outline-none px-3 ${
                    darkMode
                      ? "text-white placeholder:text-gray-500"
                      : "text-gray-900 placeholder:text-gray-400"
                  }`}
                />

              </div>

            </div>

            {/* CATEGORY */}

            <div>

              <label
                className={`text-sm block mb-3 ${
                  darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                }`}
              >
                Category
              </label>

              <div
                className={`flex items-center rounded-2xl px-4 h-14 ${
                  darkMode
                    ? "bg-white/5 border border-white/10"
                    : "bg-gray-100 border border-gray-300"
                }`}
              >

                <ClipboardList className="text-purple-400 w-5 h-5" />

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Enter category"
                  className={`w-full h-full bg-transparent outline-none px-3 ${
                    darkMode
                      ? "text-white placeholder:text-gray-500"
                      : "text-gray-900 placeholder:text-gray-400"
                  }`}
                />

              </div>

            </div>

            {/* PRICE */}

            <div>

              <label
                className={`text-sm block mb-3 ${
                  darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                }`}
              >
                Price
              </label>

              <div
                className={`flex items-center rounded-2xl px-4 h-14 ${
                  darkMode
                    ? "bg-white/5 border border-white/10"
                    : "bg-gray-100 border border-gray-300"
                }`}
              >

                <DollarSign className="text-purple-400 w-5 h-5" />

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className={`w-full h-full bg-transparent outline-none px-3 ${
                    darkMode
                      ? "text-white placeholder:text-gray-500"
                      : "text-gray-900 placeholder:text-gray-400"
                  }`}
                />

              </div>

            </div>

            {/* QUANTITY */}

            <div>

              <label
                className={`text-sm block mb-3 ${
                  darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                }`}
              >
                Quantity
              </label>

              <div
                className={`flex items-center rounded-2xl px-4 h-14 ${
                  darkMode
                    ? "bg-white/5 border border-white/10"
                    : "bg-gray-100 border border-gray-300"
                }`}
              >

                <Boxes className="text-purple-400 w-5 h-5" />

                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                  className={`w-full h-full bg-transparent outline-none px-3 ${
                    darkMode
                      ? "text-white placeholder:text-gray-500"
                      : "text-gray-900 placeholder:text-gray-400"
                  }`}
                />

              </div>

            </div>

            {/* SAVE BUTTON */}

            <div className="md:col-span-2 flex justify-center md:justify-end mt-4">

              <button
                type="submit"
                className="w-full sm:w-auto bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg shadow-purple-500/20"
              >

                {
                  editId
                    ? "Update Product"
                    : "Save Product"
                }

              </button>

            </div>

          </form>

        </div>

      )}

      {/* ================= MOBILE CARD VIEW ================= */}

      <div className="block lg:hidden space-y-5">

        {
          products.length > 0 ? (

            products.map((product) => (

              <div
                key={product._id}
                className={`rounded-3xl p-5 ${
                  darkMode
                    ? "bg-white/5 border border-white/10"
                    : "bg-white border border-gray-200"
                }`}
              >

                <div className="space-y-3">

                  <div>
                    <p className="text-sm text-gray-400">
                      Product Name
                    </p>

                    <h3 className={`text-lg font-semibold ${
                      darkMode
                        ? "text-white"
                        : "text-gray-900"
                    }`}>
                      {product.productName}
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">
                      Category
                    </p>

                    <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                      {product.category}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">
                      Price
                    </p>

                    <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                      ₹ {product.price}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">
                      Quantity
                    </p>

                    <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                      {product.quantity}
                    </p>
                  </div>

                  {/* ACTIONS */}

                  <div className="flex items-center gap-3 pt-3">

                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 h-12 rounded-2xl bg-blue-500 hover:bg-blue-400 flex items-center justify-center text-white"
                    >

                      <Pencil size={18} />

                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex-1 h-12 rounded-2xl bg-red-500 hover:bg-red-400 flex items-center justify-center text-white"
                    >

                      <Trash2 size={18} />

                    </button>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className="py-14 text-center">

              <p className="text-gray-500 text-lg">
                No products added yet
              </p>

            </div>

          )
        }

      </div>

      {/* ================= DESKTOP TABLE ================= */}

      <div
        className={`hidden lg:block rounded-[30px] overflow-hidden backdrop-blur-xl shadow-2xl mt-6 ${
          darkMode
            ? "bg-white/5 border border-white/10 shadow-purple-500/10"
            : "bg-white border border-gray-200 shadow-gray-300/40"
        }`}
      >

        {/* HEADER */}

        <div
          className={`grid grid-cols-5 px-6 py-5 ${
            darkMode
              ? "bg-purple-500/20 border-b border-white/10"
              : "bg-purple-100 border-b border-gray-200"
          }`}
        >

          <h3 className="font-semibold text-lg text-white">
            Product Name
          </h3>

          <h3 className="font-semibold text-lg text-white">
            Category
          </h3>

          <h3 className="font-semibold text-lg text-white">
            Price
          </h3>

          <h3 className="font-semibold text-lg text-white">
            Quantity
          </h3>

          <h3 className="font-semibold text-lg text-white text-center">
            Actions
          </h3>

        </div>

        {/* BODY */}

        {
          products.length > 0 ? (

            products.map((product) => (

              <div
                key={product._id}
                className={`grid grid-cols-5 px-6 py-5 ${
                  darkMode
                    ? "border-b border-white/5 hover:bg-white/5"
                    : "border-b border-gray-100 hover:bg-gray-50"
                }`}
              >

                <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                  {product.productName}
                </p>

                <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                  {product.category}
                </p>

                <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                  ₹ {product.price}
                </p>

                <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                  {product.quantity}
                </p>

                {/* ACTIONS */}

                <div className="flex items-center justify-center gap-3">

                  <button
                    onClick={() => handleEdit(product)}
                    className="w-10 h-10 rounded-xl bg-blue-500 hover:bg-blue-400 flex items-center justify-center text-white"
                  >

                    <Pencil size={18} />

                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="w-10 h-10 rounded-xl bg-red-500 hover:bg-red-400 flex items-center justify-center text-white"
                  >

                    <Trash2 size={18} />

                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className="py-14 text-center">

              <p className="text-gray-500 text-lg">
                No products added yet
              </p>

            </div>

          )
        }

      </div>

    </div>

  );

}

export default Products;