import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

const AdminVisionMission = () => {
  const [form, setForm] = useState({ title: "", paragraph: "", files: [] });
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef(null);

  const API_URL =
    "http://localhost:5000/api/vision-mission";

  // Fetch data
  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
    } catch (err) {
      console.error(err);
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
    setForm({ ...form, files: Array.from(e.target.files) });
  };

  // Save / Update
  const handleSave = async () => {
    if (!form.title || !form.paragraph) return;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("paragraph", form.paragraph);
    form.files.forEach((file) => formData.append("images", file));

    try {
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
    } catch (err) {
      console.error(err);
    }
  };

  // Edit
  const handleEdit = (item) => {
    setForm({ title: item.title, paragraph: item.paragraph, files: [] });
    setEditingId(item._id);
    setShowForm(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setForm({ title: "", paragraph: "", files: [] });
    setEditingId(null);
    setShowForm(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-orange-400">
            Admin – Vision & Mission
          </h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-red-600 text-white font-semibold hover:scale-105 transition-transform shadow-lg shadow-blue-500/20">
              <Plus className="mr-2" /> Add New
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow mb-8 space-y-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="border p-3 rounded w-full"
            />
            <textarea
              name="paragraph"
              value={form.paragraph}
              onChange={handleChange}
              placeholder="Paragraph"
              className="border p-3 rounded w-full"
              rows={3}
            />
            <input
              type="file"
              ref={fileInputRef}
              multiple
              onChange={handleFileChange}
              className="border p-2 rounded w-full"
            />
            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-5 py-2 rounded-xl flex items-center">
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
        {data?.length > 0 && (
          <div className="bg-white rounded-xl shadow overflow-x-auto p-4">
            <table className="w-full border-collapse">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3">SL No</th>
                  <th className="p-3">Images</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Paragraph</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, idx) => (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{idx + 1}</td>
                    <td className="p-3 flex space-x-2">
                      {item.images?.length > 0
                        ? item.images.map((img, i) => (
                            <img
                              key={i}
                              src={`http://localhost:5000/uploads/vision-mission/${img}?t=${Date.now()}`}
                              alt="VM"
                              className="w-16 h-16 object-cover rounded border"
                              onError={(e) => {
                                console.log('Image failed to load:', e.target.src);
                                e.target.style.display = 'none';
                              }}
                            />
                          ))
                        : "No Images"}
                    </td>
                    <td className="p-3 font-semibold">{item.title}</td>
                    <td className="p-3">{item.paragraph}</td>
                    <td className="p-3 flex space-x-2 justify-center">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-blue-100 text-blue-600 px-3 py-1 rounded flex items-center">
                        <Edit className="mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-100 text-orange-600 px-3 py-1 rounded flex items-center">
                        <Trash2 className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVisionMission;
