// 
import API from "../api/axios";
import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Sidebar from "../components/Sidebar";

interface Product {
  _id: string;
  productName: string;
  category: any;
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

function Products({ darkMode }: Readonly<ProductsProps>) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState<FormData>({
    productName: "",
    category: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products/all");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryName = (category: any) => {
    if (!category) return "-";
    if (typeof category === "object") return category.name || "-";
    const cat = categories.find((c: any) => c._id === category);
    return cat ? cat.name : "-";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (editId) {
        const res = await API.put(`/products/${editId}`, formData);

        setProducts(
          products.map((p) =>
            p._id === editId ? res.data.product : p
          )
        );

        setEditId(null);
      } else {
        const res = await API.post("/products/add", formData);
        setProducts([res.data.product, ...products]);
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

  const handleEdit = (product: Product) => {
    setFormData({
      productName: product.productName,
      category:
        typeof product.category === "object"
          ? product.category._id
          : product.category,
      price: product.price,
      quantity: product.quantity,
    });

    setEditId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await API.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const filteredProducts = products.filter((product) => {
  const categoryName = getCategoryName(product.category);

  return (
    product.productName.toLowerCase().includes(search.toLowerCase()) ||
    categoryName.toLowerCase().includes(search.toLowerCase()) ||
    product.price.toString().includes(search) ||
    product.quantity.toString().includes(search)
  );
});

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070B14] flex">

      {/* SIDEBAR */}
      <div className="hidden lg:block w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-white/10">
      <Sidebar darkMode={darkMode} />   
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-4 md:p-8 lg:p-10">

        {/* HEADER (VENDOR STYLE) */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Product Management
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-3 text-base md:text-lg">
              Add and manage all products professionally
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-3 bg-purple-500 hover:bg-purple-400 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg shadow-purple-500/20"
          >
            <Plus size={22} />
            {editId ? "Edit Product" : "Add Product"}
          </button>

        </div>

        {/* FORM CARD (VENDOR STYLE) */}
        {showForm && (
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[30px] p-5 md:p-8 backdrop-blur-xl shadow-2xl shadow-purple-500/10 mb-10">

            <form
              onSubmit={handleSaveProduct}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >

              <input
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Product Name"
                className="h-14 px-4 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="h-14 px-4 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
              >
                <option value="">Select Category</option>
                {categories.map((cat: any) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                type="number"
                className="h-14 px-4 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10"
              />

              <input
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                type="number"
                className="h-14 px-4 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10"
              />

              <button
                type="submit"
                className="md:col-span-2 bg-purple-500 hover:bg-purple-400 text-white py-4 rounded-2xl font-semibold"
              >
                Save Product
              </button>

            </form>
          </div>
        )}

        {/* TABLE CARD (VENDOR STYLE) */}
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[30px] backdrop-blur-xl shadow-2xl shadow-purple-500/10 overflow-hidden">
<div className="p-6 border-b border-gray-200 dark:border-white/10">
  <input
    type="text"
    placeholder="Search products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className={`w-full md:w-80 px-4 py-3 rounded-xl border outline-none transition-all ${
      darkMode
        ? "bg-[#0F172A] border-white/10 text-white placeholder-gray-400 focus:border-purple-500"
        : "bg-white border-gray-300 text-black placeholder-gray-500 focus:border-purple-500"
    }`}
  />
</div>
          {/* HEADER ROW */}
          <div className="grid grid-cols-5 bg-purple-500/20 px-6 py-5 font-semibold text-gray-900 dark:text-white">
            <p>Name</p>
            <p>Category</p>
            <p>Price</p>
            <p>Qty</p>
            <p className="text-center">Actions</p>
          </div>

          
       {/* ROWS */}
{filteredProducts.length > 0 ? (
  filteredProducts.map((product) => (
    <div
      key={product._id}
      className="grid grid-cols-5 px-6 py-5 border-b border-gray-200 dark:border-white/5 items-center hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
    >
      <p>{product.productName}</p>
      <p>{getCategoryName(product.category)}</p>
      <p>₹ {product.price}</p>
      <p>{product.quantity}</p>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => handleEdit(product)}
          className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => handleDelete(product._id)}
          className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  ))
) : (
  <div className="py-10 text-center text-gray-500 dark:text-gray-400">
    No products found.
  </div>
)}
        </div>

      </div>
    </div>
  );
}

export default Products;