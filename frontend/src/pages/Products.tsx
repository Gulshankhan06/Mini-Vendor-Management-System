import API from "../services/api";

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
import Sidebar from "../components/Sidebar";

interface Product {
  _id: string;
  productName: string;
  category: string;
  price: string;
  quantity: string;
}

interface FormData {
  productName: string;
  category: string;
  price: string;
  quantity: string;
}

interface ProductsProps {
  darkMode: boolean;
}

function Products({ darkMode }: ProductsProps) {

  const [showForm, setShowForm] = useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>([]);

  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    productName: "",
    category: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (): Promise<void> => {

    try {

      const res = await API.get("/products/all");

      setProducts(res.data.products as Product[]);

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

  const handleSaveProduct = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {

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

      if (editId) {

        const res = await API.put(
          `/products/${editId}`,
          formData
        );

        setProducts(
          products.map((product: Product) =>
            product._id === editId
              ? res.data.product
              : product
          )
        );

        setEditId(null);

      } else {

        const res = await API.post(
          "/products/add",
          formData
        );

        setProducts([
          res.data.product,
          ...products,
        ]);

      }

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

  const handleEdit = (
    product: Product
  ): void => {

    setFormData({
      productName: product.productName,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
    });

    setEditId(product._id);

    setShowForm(true);

  };

  const handleDelete = async (
    id: string
  ): Promise<void> => {

    try {

      await API.delete(`/products/${id}`);

      setProducts(
        products.filter(
          (product: Product) =>
            product._id !== id
        )
      );

    } catch (error) {

      console.log(error);

    }

  };
  return (

    

  <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#070B14]">

    {/* ============ LEFT SIDEBAR ============ */}
    <div className="w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-white/10">
      <Sidebar />
    </div>

    {/* ============ RIGHT MAIN CONTENT ============ */}
    <div className="flex-1 p-4 md:p-10 overflow-x-hidden">
      {/* ================= HEADER ================= */}
<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

  <div>
    <h1
  className={`text-3xl md:text-5xl font-bold ${
    darkMode ? "text-white" : "text-gray-950"
  }`}
>Product Management</h1>

    <p className="text-gray-400 mt-3 text-lg">
      Add and manage all products professionally
    </p>
  </div>

  <button
    onClick={() => setShowForm(!showForm)}
    className="flex items-center gap-3 bg-purple-500 hover:bg-purple-400 text-white px-6 py-4 rounded-2xl font-semibold"
  >
    <Plus size={22} />
    {editId ? "Edit Product" : "Add Product"}
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
<h3 className={`font-semibold text-lg ${darkMode ? "text-white" : "text-gray-950"}`}>
  Product Name
</h3>

<h3 className={`font-semibold text-lg ${darkMode ? "text-white" : "text-gray-950"}`}>
  Category
</h3>

<h3 className={`font-semibold text-lg ${darkMode ? "text-white" : "text-gray-950"}`}>
  Price
</h3>

<h3 className={`font-semibold text-lg ${darkMode ? "text-white" : "text-gray-950"}`}>
  Quantity
</h3>

<h3 className={`font-semibold text-lg text-center ${darkMode ? "text-white" : "text-gray-950"}`}>
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

                <p className={darkMode ? "text-white" : "text-gray-700"}>
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
    </div>

  );

}

export default Products;