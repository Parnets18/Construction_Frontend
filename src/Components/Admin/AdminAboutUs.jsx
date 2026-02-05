import React, { useState, useEffect } from "react";
import { Plus, Save, X, Edit, Trash2 } from "lucide-react";
import axios from "axios";

const AdminAboutUs = () => {
  const [aboutList, setAboutList] = useState([]);
  const [form, setForm] = useState({
    image: null,
    title: "",
    description: "",
    stats: [],
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Stats form state
  const [statsForm, setStatsForm] = useState({
    number: "",
    label: "",
    suffix: "+"
  });

  const API_URL = "https://construction-backend-vm2j.onrender.com/api/about";

  // Fetch all about entries
  const fetchAbout = async () => {
    try {
      const res = await axios.get(`${API_URL}/all`);
      console.log("Fetched data:", res.data);
      setAboutList(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error("Error fetching about data:", err);
      setAboutList([]);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Add stats
  const addStats = (e) => {
    e.preventDefault(); // Prevent form submission
    
    if (statsForm.number.trim() && statsForm.label.trim()) {
      setForm({
        ...form,
        stats: [...form.stats, { 
          number: statsForm.number.trim(),
          label: statsForm.label.trim(),
          suffix: statsForm.suffix || "+"
        }]
      });
      setStatsForm({ number: "", label: "", suffix: "+" });
    } else {
      alert("Please enter both number and label for the statistic");
    }
  };

  // Remove stats
  const removeStats = (e, index) => {
    e.preventDefault(); // Prevent form submission
    const newStats = form.stats.filter((_, i) => i !== index);
    setForm({ ...form, stats: newStats });
  };

  // Save or Update About
  const handleSave = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!form.title.trim()) {
      alert("Please enter a title");
      return;
    }

    if (!form.description.trim()) {
      alert("Please enter a description");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title.trim());
    formData.append("description", form.description.trim());
    formData.append("stats", JSON.stringify(form.stats));

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      if (editing && editingIndex !== null) {
        const aboutId = aboutList[editingIndex]._id;
        await axios.put(`${API_URL}/${aboutId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("About section updated successfully!");
      } else {
        await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("About section created successfully!");
      }

      resetForm();
      fetchAbout();
    } catch (err) {
      console.error("Error saving about:", err);
      alert("Error saving about section");
    }
  };

  const resetForm = () => {
    setForm({
      image: null,
      title: "",
      description: "",
      stats: [],
    });
    setStatsForm({ number: "", label: "", suffix: "+" });
    setEditingIndex(null);
    setEditing(false);
    setShowForm(false);
  };

  const handleEdit = (item, index) => {
    setForm({
      image: null,
      title: item.title || "",
      description: item.description || "",
      stats: item.stats || [],
    });
    setEditingIndex(index);
    setEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (item) => {
    if (window.confirm("Are you sure you want to delete this about section?")) {
      try {
        await axios.delete(`${API_URL}/${item._id}`);
        alert("About section deleted successfully!");
        fetchAbout();
      } catch (err) {
        console.error("Error deleting about:", err);
        alert("Error deleting about section");
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-white text-black">
      <div className="flex-1 flex flex-col w-full px-6 py-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">
            Admin Panel – About Us
          </h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg">
              <Plus className="mr-2" /> Add About Section
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg shadow-blue-500/20 p-6 space-y-4 border backdrop-blur-md mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {editing ? "Edit About Section" : "Add New About Section"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Basic Info */}
              <div>
                <label className="block mb-1 font-semibold">Title:</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Title (e.g., Our Story)"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border-2 border-blue-300 focus:border-blue-600 rounded-lg focus:outline-none shadow-sm"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Description:</label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full p-3 border-2 border-blue-300 focus:border-blue-600 rounded-lg focus:outline-none shadow-sm"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Image:</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-blue-300 focus:border-blue-600 rounded-lg"
                />
              </div>

              {/* Statistics Section */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="Number (e.g., 500)"
                    value={statsForm.number}
                    onChange={(e) => setStatsForm({...statsForm, number: e.target.value})}
                    className="p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Label (e.g., Projects Delivered)"
                    value={statsForm.label}
                    onChange={(e) => setStatsForm({...statsForm, label: e.target.value})}
                    className="p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Suffix (e.g., +)"
                    value={statsForm.suffix}
                    onChange={(e) => setStatsForm({...statsForm, suffix: e.target.value})}
                    className="p-2 border rounded-lg"
                  />
                </div>
                <button
                  type="button"
                  onClick={addStats}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mb-3">
                  Add Statistic
                </button>

                {/* Display Stats */}
                <div className="space-y-2">
                  {form.stats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div>
                        <strong>{stat.number}{stat.suffix}</strong> - {stat.label}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => removeStats(e, index)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save / Cancel */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex items-center px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Save className="mr-2" />
                  {editing ? "Update" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center px-5 py-3 bg-gray-200 rounded-lg hover:bg-gray-300">
                  <X className="mr-2" /> Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Table */}
        <div className="flex-1 bg-white shadow-lg shadow-blue-500/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto h-full">
            <table className="min-w-full table-fixed">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="w-24 px-4 py-3 text-left font-semibold">Image</th>
                  <th className="w-40 px-4 py-3 text-left font-semibold">Title</th>
                  <th className="px-4 py-3 text-left font-semibold">Description</th>
                  <th className="w-36 px-4 py-3 text-left font-semibold">Statistics</th>
                  <th className="w-28 px-4 py-3 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {aboutList.length > 0 ? (
                  aboutList.map((item, index) => (
                    <tr key={item._id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-4">
                        {item.image ? (
                          <img
                            src={`https://construction-backend-vm2j.onrender.com/uploads/about/${item.image}`}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-300 shadow-sm"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No Image</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-gray-700 text-sm leading-relaxed">
                          {item.description?.length > 120 
                            ? `${item.description.substring(0, 120)}...` 
                            : item.description}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {item.stats?.length || 0} Stats
                          </span>
                          {item.stats && item.stats.length > 0 && (
                            <div className="text-xs text-gray-500">
                              {item.stats.slice(0, 1).map((stat, idx) => (
                                <div key={idx} className="truncate">
                                  {stat.number}{stat.suffix} {stat.label}
                                </div>
                              ))}
                              {item.stats.length > 1 && (
                                <div className="text-blue-600 font-medium">+{item.stats.length - 1} more</div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center gap-1">
                          <button
                            onClick={() => handleEdit(item, index)}
                            className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Plus className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No About Sections</h3>
                        <p className="text-gray-500 mb-4">Get started by creating your first about section.</p>
                        <button
                          onClick={() => setShowForm(true)}
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <Plus className="w-4 h-4 mr-2" />
                          Add About Section
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
  );
};

export default AdminAboutUs;