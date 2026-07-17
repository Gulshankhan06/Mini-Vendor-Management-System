// 
import API from "../api/axios";
import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  productName: string;
  category: any;
  price: string;
  quantity: string;
    image: string;
}

interface FormData {
  productName: string;
  category: string;
  price: string;
  quantity: string;
}

interface ProductsProps {
  darkMode: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}
function Products({
  darkMode,
  setIsAuthenticated,
}: Readonly<ProductsProps>) {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
const [preview, setPreview] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const limit = 5;

  const [formData, setFormData] = useState<FormData>({
    productName: "",
    category: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
  fetchProducts();
}, [page]);

useEffect(() => {
  fetchCategories();
}, []);

  const fetchProducts = async () => {
  try {
    const res = await API.get(
      `/products/all?page=${page}&limit=${limit}`
    );

    setProducts(res.data.products);
    setTotalPages(res.data.totalPages);
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
  const handleImageChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  if (e.target.files && e.target.files[0]) {
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  }
};

  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (editId) {
const data = new FormData();

data.append("productName", formData.productName);
data.append("category", formData.category);
data.append("price", formData.price);
data.append("quantity", formData.quantity);

if (image) {
  data.append("image", image);
}

await API.put(`/products/${editId}`, data, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
fetchProducts();
setEditId(null);
      } else {
const data = new FormData();

data.append("productName", formData.productName);
data.append("category", formData.category);
data.append("price", formData.price);
data.append("quantity", formData.quantity);

if (image) {
  data.append("image", image);
}

await API.post("/products/add", data, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
if (page !== 1) {
  setPage(1);
} else {
  fetchProducts();
}
      }

      setFormData({
        productName: "",
        category: "",
        price: "",
        quantity: "",
      });

setImage(null);
setPreview("");
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

    // ✅ Existing image preview dikhane ke liye
  setPreview(product.image);

  // ✅ Abhi koi nayi image select nahi hui hai
  setImage(null);


    setEditId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
    await API.delete(`/products/${id}`);
fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("isAuthenticated");

  setIsAuthenticated(false);

  navigate("/", { replace: true });
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

              <div className="md:col-span-2">

  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="w-full h-14 px-4 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10"
  />

  {preview && (
    <img
      src={preview}
      alt="Preview"
      className="mt-4 w-28 h-28 rounded-xl object-cover border"
    />
  )}

</div>


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
<div className="hidden md:block">
          {/* HEADER ROW */}
   <div className="grid grid-cols-6 font-semibold bg-purple-500/20 gap-4 px-6 py-4 min-h-[90px] border-b border-gray-200 dark:border-white/5 items-center">          
            <p>Name</p>
            <p>Category</p>
            <p>Price</p>
            <p>Qty</p>
            <p className="text-center">Image</p>
            <p className="text-center">Actions</p>
          </div>

          
       {/* ROWS */}
{filteredProducts.length > 0 ? (
  filteredProducts.map((product) => (
    <div
  key={product._id}
  className="grid grid-cols-6 gap-4 px-6 py-5 border-b border-gray-200 dark:border-white/5 items-center"
>
     <p>{product.productName}</p>
<p>{getCategoryName(product.category)}</p>
<p>₹ {product.price}</p>
<p>{product.quantity}</p>

<div className="flex items-center justify-center h-full">
  <img
    src={
      product.image && product.image.trim() !== ""
        ? product.image
        : "https://placehold.co/60x60?text=No+Image"
    }
    alt={product.productName}
    className="w-16 h-16 rounded-xl object-cover border border-gray-300 shadow-sm"
  />
</div>

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
       <div className="block md:hidden p-4 space-y-4">

  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
      <div
        key={product._id}
        className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-4 shadow"
      >

        <div className="flex justify-center mb-4">
          <img
            src={
              product.image && product.image.trim() !== ""
                ? product.image
                : "https://placehold.co/100x100?text=No+Image"
            }
            alt={product.productName}
            className="w-24 h-24 rounded-xl object-cover border"
          />
        </div>

        <div className="space-y-2">

          <p>
            <span className="font-semibold">Name:</span>{" "}
            {product.productName}
          </p>

          <p>
            <span className="font-semibold">Category:</span>{" "}
            {getCategoryName(product.category)}
          </p>

          <p>
            <span className="font-semibold">Price:</span> ₹ {product.price}
          </p>

          <p>
            <span className="font-semibold">Quantity:</span>{" "}
            {product.quantity}
          </p>

        </div>

        <div className="flex justify-center gap-4 mt-5">

          <button
            onClick={() => handleEdit(product)}
            className="bg-blue-500 text-white rounded-xl px-5 py-2"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => handleDelete(product._id)}
            className="bg-red-500 text-white rounded-xl px-5 py-2"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>
    ))
  ) : (
    <div className="text-center py-6">
      No products found.
    </div>
  )}

</div> 
        </div>
        


        <div className="flex justify-center items-center gap-4 mt-6 mb-6">
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="px-4 py-2 rounded-lg bg-gray-300 disabled:opacity-50"
  >
    Previous
  </button>

  <span className="font-semibold">
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="px-4 py-2 rounded-lg bg-purple-600 text-white disabled:opacity-50"
  >
    Next
  </button>
</div>

      </div>
    </div>
  );
}

export default Products;