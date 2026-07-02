import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Category } from "../types/category";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    // description: string;
    parent: string | null;
    isActive: boolean;
  }) => void;
  categories: Category[];
  editCategory?: Category | null;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  categories,
  editCategory,
}) => {
  const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  const [parent, setParent] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(true);

  /* ---------------- EDIT MODE ---------------- */
  useEffect(() => {
    if (editCategory) {
      setName(editCategory.name || "");
      // setDescription(editCategory.description || "");
      setParent(editCategory.parent || null);
      setIsActive(editCategory.status === "Active");
    } else {
      setName("");
    //  setDescription(""); 
      setParent(null);
      setIsActive(true);
    }
  }, [editCategory, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category name is required");
      return;
    }

    onSave({
      name: name.trim(),
      // description: description.trim(),
      parent,
      isActive,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {editCategory ? "Edit Category" : "Add Category"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">

          {/* CATEGORY NAME */}
          <div>
            <label className="text-sm font-medium">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          {/* DESCRIPTION
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div> */}

          {/* PARENT CATEGORY */}
          <div>
            <label className="text-sm font-medium">
              Parent Category (Subcategory Of)
            </label>

            <select
              value={parent || ""}
              onChange={(e) =>
                setParent(e.target.value || null)
              }
              className="w-full border rounded-lg px-3 py-2 mt-1"
            >
              <option value="">Root Category</option>

              {categories
                .filter((cat) => !editCategory || cat._id !== editCategory._id)
                .map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          {/* ACTIVE / INACTIVE */}
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <span className="text-sm font-medium">Status</span>

            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`px-4 py-1 rounded-lg text-white ${
                isActive ? "bg-green-600" : "bg-red-500"
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </button>
          </div>

          {/* PRODUCT COUNT (DISPLAY ONLY) */}
          {/* <div className="bg-gray-100 p-3 rounded-lg">
            <span className="text-sm text-gray-600">
              Total Products:
            </span>
            <span className="ml-2 font-semibold">
              {editCategory?.totalProducts || 0}
            </span>
          </div> */}

          {/* BUTTONS */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              {editCategory ? "Update" : "Create"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CategoryModal;