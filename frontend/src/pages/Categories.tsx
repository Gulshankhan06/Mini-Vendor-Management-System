import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  FolderTree,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import CategoryModal from "../components/CategoryModal";
import { Category } from "../types/category";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryApi";

interface CategoriesProps {
  darkMode: boolean;
   description?: string;
     status?: "Active" | "Inactive";
}

const Categories = ({ darkMode }: CategoriesProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [search, setSearch] = useState("");

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const buildTree = (parent: string | null = null): Category[] => {
    return categories
      .filter((cat) => {
        const parentId =
          typeof cat.parent === "object" && cat.parent !== null
            ? (cat.parent as any)._id
            : cat.parent;

        return parentId === parent;
      })
      .map((cat) => ({
        ...cat,
        children: buildTree(cat._id),
      }));
  };

  const categoryTree = useMemo(() => buildTree(), [categories]);
  const filterTree = (nodes: Category[]): Category[] => {
  return nodes
    .map((node) => ({
      ...node,
      children: filterTree(node.children || []),
    }))
    .filter(
      (node) =>
        node.name.toLowerCase().includes(search.toLowerCase()) ||
        (node.children && node.children.length > 0)
    );
};

const filteredTree = useMemo(() => {
  if (!search.trim()) return categoryTree;
  return filterTree(categoryTree);
}, [categoryTree, search]);

  const handleSave = async (data: { name: string; parent: string | null }) => {
    try {
      if (editCategory) {
        await updateCategory(editCategory._id, {
          name: data.name,
          parent: data.parent,
          
        });
      } else {
        await createCategory({
          name: data.name,
          parent: data.parent,
         
        });
      }

      await fetchCategories();
      setEditCategory(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Delete this category?");
    if (!ok) return;

    await deleteCategory(id);
    await fetchCategories();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070B14] flex">

      {/* SIDEBAR (same as Products page) */}
      <div className="hidden lg:block w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-white/10">
<Sidebar darkMode={darkMode} />      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-8 lg:p-10">

        {/* HEADER */}
        <div
          className={`mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-2xl border ${
            darkMode
              ? "bg-white/5 border-white/10 text-white"
              : "bg-white text-black"
          }`}
        >
          <div>
            <h1 className="text-3xl font-bold">Category Management</h1>
            <p className="text-gray-500 mt-1 text-base">
              Manage hierarchical categories efficiently
            </p>
          </div>

          <button
            onClick={() => {
              setEditCategory(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-5 py-3 rounded-xl font-semibold"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>

        {/* TREE */}
        <div
          className={`p-6 rounded-2xl border ${
            darkMode
              ? "bg-white/5 border-white/10 text-white"
              : "bg-white text-black"
          }`}
        >
          <div className="flex items-center gap-2 mb-6">
            <FolderTree className="text-purple-500" />
            <h2 className="text-xl font-semibold">Category Tree</h2>
          </div>

<div className="mb-6">
  <input
    type="text"
    placeholder="Search category..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className={`w-full md:w-80 px-4 py-2 rounded-xl border transition-all duration-200 outline-none ${
      darkMode
        ? "bg-[#0F172A] border-white/10 text-white placeholder-gray-400 focus:border-purple-500"
        : "bg-white border-gray-300 text-black placeholder-gray-500 focus:border-purple-500"
    }`}
  />
</div>
          {filteredTree.length === 0 ? (
            <p className="text-gray-500">No categories found</p>
          ) : (
            filteredTree.map((cat) => (
              <CategoryNode
                key={cat._id}
                category={cat}
                onEdit={(c: Category) => {
                  setEditCategory(c);
                  setIsModalOpen(true);
                }}
                onDelete={handleDelete}
                darkMode={darkMode}
                fetchCategories={fetchCategories}
              />
            ))
          )}
        </div>

        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditCategory(null);
          }}
          onSave={handleSave}
          categories={categories}
          editCategory={editCategory}
        />
      </div>
    </div>
  );
};

/* ================= NODE ================= */

const CategoryNode = ({
  category,
  onEdit,
  onDelete,
  darkMode,
  fetchCategories,
}: any) => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const toggleStatus = async () => {
    try {
      setLoading(true);

      await updateCategory(category._id, {
        status: category.status === "Active" ? "Inactive" : "Active",
      });

      await fetchCategories();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-4 border-l border-gray-300 dark:border-white/10 pl-5 py-3">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          {category.children?.length > 0 ? (
            <button onClick={() => setOpen(!open)}>
              {open ? <ChevronDown size={22} /> : <ChevronRight size={22} />}
            </button>
          ) : (
            <div className="w-5" />
          )}

          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {category.name}
            </p>

            <div className="flex items-center gap-4 text-sm mt-1 text-gray-500 dark:text-gray-400">
              <span>Products: {category.totalProducts || 0}</span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  category.status === "Active"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {category.status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={toggleStatus}
            disabled={loading}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              category.status === "Active"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {loading ? "Updating..." : category.status}
          </button>

          <button
            onClick={() => onEdit(category)}
            className="p-2 text-blue-500 hover:bg-blue-500/20 rounded-lg"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(category._id)}
            className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg"
          >
            <Trash2 size={18} />
          </button>
        </div>

      </div>

      {open && category.children?.length > 0 && (
        <div className="mt-3">
          {category.children.map((child: Category) => (
            <CategoryNode
              key={child._id}
              category={child}
              onEdit={onEdit}
              onDelete={onDelete}
              darkMode={darkMode}
              fetchCategories={fetchCategories}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;