import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

const AdminVisionMission = () => {
  const [form, setForm] = useState({ title: "", paragraph: "", files: [] });
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef(null);

  const API_URL = "https://construction-backend-vm2j.onrender.com/api/vision-Mission";

  // Fetch data
  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching vision-mission data:", err);
      console.error("Error details:", err.response?.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    console.log("Files selected:", selectedFiles.length);
    
    // Validate file types
    const validFiles = selectedFiles.filter(file => file.type.startsWith('image/'));
    if (validFiles.length !== selectedFiles.length) {
      alert("Only image files are allowed!");
      return;
    }
    
    // Validate file sizes (10MB limit)
    const oversizedFiles = validFiles.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert("Some files are too large. Maximum size is 10MB per file.");
      return;
    }
    
    setForm({ ...form, files: validFiles });
  };

  // Save / Update
  const handleSave = async () => {
    if (!form.title || !form.paragraph) {
      alert("Title and paragraph are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("paragraph", form.paragraph);
    
    // Only append files if there are actually files to upload
    if (form.files && form.files.length > 0) {
      form.files.forEach((file) => formData.append("images", file));
    }

    try {
      console.log("Saving vision-mission entry:", {
        title: form.title,
        paragraph: form.paragraph,
        filesCount: form.files ? form.files.length : 0,
        editingId: editingId
      });

      if (editingId) {
        const response = await axios.put(`${API_URL}/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Update response:", response.data);
      } else {
        const response = await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Create response:", response.data);
      }
      resetForm();
      fetchData();
    } catch (err) {
      console.error("Error saving vision-mission entry:", err);
      console.error("Error details:", err.response?.data);
      alert(`Failed to save entry: ${err.response?.data?.error || err.message}`);
    }
  };

  // Edit
  const handleEdit = (item) => {
    console.log("Editing vision-mission entry:", item);
    setForm({ 
      title: item.title || "", 
      paragraph: item.paragraph || "", 
      files: [] 
    });
    setEditingId(item._id);
    setShowForm(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      console.log("Deleting vision-mission entry with ID:", id);
      await axios.delete(`${API_URL}/${id}`);
      fetchData();
    } catch (err) {
      console.error("Error deleting vision-mission entry:", err);
      console.error("Error details:", err.response?.data);
      alert("Failed to delete entry. Please check the console for details.");
    }
  };

  const resetForm = () => {
    setForm({ title: "", paragraph: "", files: [] });
    setEditingId(null);
    setShowForm(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="h-full flex flex-col bg-white text-black">
      <div className="max-w-5xl mx-auto flex-1 flex flex-col w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">
            Admin – Vision & Mission
          </h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg">
              <Plus className="mr-2" /> Add New
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow mb-8 space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Title:</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="border p-3 rounded w-full"
              />
            </div>
            
            <div>
              <label className="block mb-1 font-semibold">Paragraph:</label>
              <textarea
                name="paragraph"
                value={form.paragraph}
                onChange={handleChange}
                placeholder="Paragraph"
                className="border p-3 rounded w-full"
                rows={3}
              />
            </div>
            
            <div>
              <label className="block mb-1 font-semibold">Images:</label>
              <input
                type="file"
                ref={fileInputRef}
                multiple
                onChange={handleFileChange}
                className="border p-2 rounded w-full"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center hover:bg-blue-700 transition-colors">
                <Save className="mr-2" />
                {editingId ? "Update" : "Save"}
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-xl flex items-center">
                <X className="mr-2" /> Cancel
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white shadow-lg shadow-blue-500/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Images</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Paragraph</th>
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
                            src={`https://construction-backend-vm2j.onrender.com/uploads/vision-mission/${img}`}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded-lg border"
                          />
                        ))
                      ) : (
                        <span className="text-gray-400 text-sm">No images</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold">{item.title}</td>
                    <td className="px-4 py-3">{item.paragraph}</td>
                    <td className="px-4 py-3 flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded-lg">
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
    </div>
  );
};

export default AdminVisionMission;
