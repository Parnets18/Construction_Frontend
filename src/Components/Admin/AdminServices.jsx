import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Plus, Save, X, Edit, Trash2 } from "lucide-react";

const AdminServices = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    text: "",
    paragraph: "",
    details: "",
    features: [],
    newFeature: "",
    images: [],
    imageFiles: [], // files to send to backend
    imagePreviews: [],
  });
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const imageInputRef = useRef(null);

  const API_URL = "http://localhost:5000/api/services";
  const UPLOADS_URL =
    "http://localhost:5000/uploads/services/";

  // Fetch services
  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images" && files.length > 0) {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
      setForm({
        ...form,
        imageFiles: [...form.imageFiles, ...newFiles],
        imagePreviews: [...form.imagePreviews, ...newPreviews],
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Add new feature
  const handleAddFeature = () => {
    if (form.newFeature && !form.features.includes(form.newFeature)) {
      setForm({
        ...form,
        features: [...form.features, form.newFeature],
        newFeature: "",
      });
    }
  };

  // Update feature text
  const handleFeatureChange = (index, value) => {
    const updated = [...form.features];
    updated[index] = value;
    setForm({ ...form, features: updated });
  };

  // Remove a feature
  const handleRemoveFeature = (index) => {
    const updated = form.features.filter((_, i) => i !== index);
    setForm({ ...form, features: updated });
  };

  // Remove selected image before saving
  const handleRemoveImage = (index) => {
    const newPreviews = form.imagePreviews.filter((_, i) => i !== index);
    const newFiles = form.imageFiles.filter((_, i) => i !== index);
    setForm({
      ...form,
      imagePreviews: newPreviews,
      imageFiles: newFiles,
    });
  };

  // Remove existing image (from database)
  const handleRemoveExistingImage = (index) => {
    const newImages = form.images.filter((_, i) => i !== index);
    setForm({ ...form, images: newImages });
  };

  // Save / Update
  const handleSave = async () => {
    if (!form.title || !form.description) {
      alert("Title and Description are required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("text", form.text);
      formData.append("paragraph", form.paragraph);
      formData.append("details", form.details);
      formData.append("features", JSON.stringify(form.features));

      // Append new image files
      if (form.imageFiles.length > 0) {
        form.imageFiles.forEach((img) => {
          formData.append("images", img);
        });
      }

      console.log("Saving with images:", form.imageFiles.length);

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      resetForm();
      fetchData();
      alert(
        editingId
          ? "Service updated successfully!"
          : "Service created successfully!"
      );
    } catch (err) {
      console.error("Error saving service:", err);
      alert("Error saving service. Check console for details.");
    }
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description || "",
      text: item.text || "",
      paragraph: item.paragraph || "",
      details: item.details || "",
      features: item.features || [],
      newFeature: "",
      images: item.images || [],
      imageFiles: [],
      imagePreviews: [],
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchData();
      alert("Service deleted successfully!");
    } catch (err) {
      console.error("Error deleting service:", err);
      alert("Error deleting service.");
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      text: "",
      paragraph: "",
      details: "",
      features: [],
      newFeature: "",
      images: [],
      imageFiles: [],
      imagePreviews: [],
    });
    setEditingId(null);
    setShowForm(false);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold text-orange-400">
            Admin Panel – Services
          </h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-red-600 text-white font-semibold hover:scale-105 transition-transform shadow-lg shadow-blue-500/20">
              <Plus className="mr-2" /> Add Service
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg shadow-blue-500/20 p-6 space-y-4 border backdrop-blur-md">
            {/* Inputs */}
            {["title", "description", "text", "paragraph", "details"].map(
              (field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-blue-300 focus:border-blue-600 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
                />
              )
            )}

            {/* Features Section */}
            <div>
              <label className="font-semibold block mb-2">Features</label>

              {/* Input for new feature */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Enter a feature"
                  value={form.newFeature}
                  onChange={(e) =>
                    setForm({ ...form, newFeature: e.target.value })
                  }
                  className="flex-1 p-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg">
                  Add
                </button>
              </div>

              {/* List of features with remove option */}
              <div className="space-y-2">
                {form.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(i, e.target.value)}
                      className="flex-1 p-2 border rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(i)}
                      className="px-3 py-2 bg-red-100 text-orange-600 rounded-lg text-sm">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Multiple Images */}
            <div>
              <label className="block mb-1 font-semibold">Upload Images:</label>
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleChange}
                ref={imageInputRef}
                className="w-full p-2 border-2 border-blue-300 focus:border-blue-600 rounded-lg"
              />

              {/* New Image Previews */}
              {form.imagePreviews.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">
                    New Images to Upload:
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {form.imagePreviews.map((preview, i) => (
                      <div key={i} className="relative">
                        <img
                          src={preview}
                          alt={`Preview ${i + 1}`}
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                        <button
                          onClick={() => handleRemoveImage(i)}
                          className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Existing Images (in edit mode) */}
              {editingId && form.images.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Existing Images:</p>
                  <div className="flex gap-2 flex-wrap">
                    {form.images.map((img, i) => (
                      <div key={i} className="relative">
                        <img
                          src={`${UPLOADS_URL}${img}`}
                          alt={`Existing ${i + 1}`}
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                        <button
                          onClick={() => handleRemoveExistingImage(i)}
                          className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Save / Cancel */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex items-center px-5 py-3 bg-blue-600 text-white rounded-lg">
                <Save className="mr-2" /> {editingId ? "Update" : "Save"}
              </button>
              <button
                onClick={resetForm}
                className="flex items-center px-5 py-3 bg-gray-200 rounded-lg">
                <X className="mr-2" /> Cancel
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white shadow-lg shadow-blue-500/20 rounded-xl overflow-x-auto mt-6">
          <table className="min-w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Images</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Text</th>
                <th className="px-4 py-3 text-left">Paragraph</th>
                <th className="px-4 py-3 text-left">Details</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 flex gap-2">
                    {item.images && item.images.length > 0 ? (
                      item.images.map((img, i) => (
                        <img
                          key={i}
                          src={`${UPLOADS_URL}${img}`}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded-lg border"
                        />
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">No images</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-semibold">{item.title}</td>
                  <td className="px-4 py-3">{item.description}</td>
                  <td className="px-4 py-3">{item.text}</td>
                  <td className="px-4 py-3">{item.paragraph}</td>
                  <td className="px-4 py-3">{item.details}</td>
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-3 py-2 bg-red-100 text-orange-600 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminServices;
