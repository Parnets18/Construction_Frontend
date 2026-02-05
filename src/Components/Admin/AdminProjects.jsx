import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Plus, Save, X, Edit, Trash2 } from "lucide-react";

const AdminProjects = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    year: "",
    landArea: "",
    features: [],
    newFeature: "",
    images: [],
    imageFiles: [],
    imagePreviews: [],
  });
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const imageInputRef = useRef(null);

  const API_URL = "https://construction-backend-vm2j.onrender.com/api/projects";
  const UPLOADS_URL = "https://construction-backend-vm2j.onrender.com/uploads/projects/";

  // Fetch projects
  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
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
    if (!form.title || !form.description || !form.location || !form.year) {
      alert("Title, Description, Location, and Year are required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("location", form.location);
      formData.append("year", form.year);
      formData.append("landArea", form.landArea);
      formData.append("features", JSON.stringify(form.features));

      // Debug logging
      console.log("Form data being sent:", {
        title: form.title,
        description: form.description,
        location: form.location,
        year: form.year,
        landArea: form.landArea,
        features: form.features,
        imageFiles: form.imageFiles.length
      });

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
          ? "Project updated successfully!"
          : "Project created successfully!"
      );
    } catch (err) {
      console.error("Error saving project:", err);
      console.error("Error response:", err.response?.data);
      alert(`Error saving project: ${err.response?.data?.details || err.message}`);
    }
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description || "",
      location: item.location || "",
      year: item.year || "",
      landArea: item.landArea || "",
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
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchData();
      alert("Project deleted successfully!");
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Error deleting project.");
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      location: "",
      year: "",
      landArea: "",
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
    <div className="h-full flex flex-col bg-white text-black">
      <div className="flex-shrink-0 flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-600">
          Admin Panel – Projects
        </h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg">
            <Plus className="mr-2" /> Add Project
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg shadow-blue-500/20 p-6 space-y-4 border backdrop-blur-md mb-6">
            {/* Basic Inputs */}
            <div>
              <label className="block mb-1 font-semibold">Title:</label>
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={form.title}
                onChange={handleChange}
                className="w-full p-3 border-2 border-blue-300 focus:border-blue-600 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Description:</label>
              <textarea
                name="description"
                placeholder="Project Description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border-2 border-blue-300 focus:border-blue-600 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Location:</label>
              <input
                type="text"
                name="location"
                placeholder="Project Location"
                value={form.location}
                onChange={handleChange}
                className="w-full p-3 border-2 border-blue-300 focus:border-blue-600 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Year:</label>
              <input
                type="text"
                name="year"
                placeholder="Completion Year"
                value={form.year}
                onChange={handleChange}
                className="w-full p-3 border-2 border-blue-300 focus:border-blue-600 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Land Area (sq.ft):</label>
              <input
                type="text"
                name="landArea"
                placeholder="e.g., 2,200 sq.ft"
                value={form.landArea}
                onChange={handleChange}
                className="w-full p-3 border-2 border-blue-300 focus:border-blue-600 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
              />
            </div>

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
        <div className="flex-1 bg-white shadow-lg shadow-blue-500/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto h-full">
            <table className="min-w-full table-fixed">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="w-24 px-4 py-3 text-left font-semibold">Images</th>
                  <th className="w-48 px-4 py-3 text-left font-semibold">Title</th>
                  <th className="w-32 px-4 py-3 text-left font-semibold">Location</th>
                  <th className="w-20 px-4 py-3 text-left font-semibold">Year</th>
                  <th className="w-32 px-4 py-3 text-left font-semibold">Land Area</th>
                  <th className="px-4 py-3 text-left font-semibold">Description</th>
                  <th className="w-32 px-4 py-3 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item._id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          {item.images && item.images.length > 0 ? (
                            item.images.slice(0, 2).map((img, i) => (
                              <img
                                key={i}
                                src={`${UPLOADS_URL}${img}`}
                                alt={item.title}
                                className="w-12 h-12 object-cover rounded-lg border border-gray-300 shadow-sm"
                              />
                            ))
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center">
                              <span className="text-gray-400 text-xs">No Image</span>
                            </div>
                          )}
                          {item.images && item.images.length > 2 && (
                            <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center">
                              <span className="text-gray-400 text-xs">+{item.images.length - 2}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-gray-700 text-sm">{item.location}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-gray-700 text-sm">{item.year}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-gray-700 text-sm">{item.landArea}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-gray-700 text-sm leading-relaxed">
                          {item.description?.length > 100 
                            ? `${item.description.substring(0, 100)}...` 
                            : item.description}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center gap-1">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Plus className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects</h3>
                        <p className="text-gray-500 mb-4">Get started by creating your first project.</p>
                        <button
                          onClick={() => setShowForm(true)}
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Project
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
          </table>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;