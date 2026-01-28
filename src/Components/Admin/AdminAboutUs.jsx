import React, { useState, useEffect } from "react";
import { Plus, Save, X, Edit, Trash2 } from "lucide-react";
import axios from "axios";

const AdminAboutUs = () => {
  const [aboutList, setAboutList] = useState([]);
  const [form, setForm] = useState({
    image: null,
    title: "",
    text: "",
    paragraph: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editing, setEditing] = useState(false);

  const API_URL = "http://localhost:5000/api/about";

  // Fetch all about entries
  const fetchAbout = async () => {
    try {
      const res = await axios.get(API_URL);
      console.log("Fetched data:", res.data);

      // Ensure always array
      setAboutList(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching about data:", err);
      setAboutList([]); // fallback
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

  // Save or Update About
  const handleSave = async (e) => {
    e.preventDefault(); // prevent page reload

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("text", form.text);
    formData.append("paragraph", form.paragraph);
    if (form.image instanceof File) formData.append("image", form.image);

    try {
      if (editingIndex !== null) {
        // Update
        const id = aboutList[editingIndex]._id;
        const res = await axios.put(`${API_URL}/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const updatedList = [...aboutList];
        updatedList[editingIndex] = res.data;
        setAboutList(updatedList);
      } else {
        // Create
        const res = await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setAboutList([...aboutList, res.data]);
      }

      // Reset form only
      setForm({ image: null, title: "", text: "", paragraph: "" });
      setEditingIndex(null);

      // ❌ Don't close modal automatically
      // setEditing(false);
    } catch (err) {
      console.error("Error saving data:", err.response?.data || err.message);
    }
  };

  const handleCancel = () => {
    setForm({ image: null, title: "", text: "", paragraph: "" });
    setEditing(false);
    setEditingIndex(null);
  };

  const handleDelete = async (index) => {
    try {
      const id = aboutList[index]._id;
      await axios.delete(`${API_URL}/${id}`);
      setAboutList(aboutList.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Error deleting data:", err);
    }
  };

  const handleEdit = (index) => {
    const item = aboutList[index];
    setForm({
      image: item.image
        ? `http://localhost:5000/uploads/about/${item.image}`
        : null,
      title: item.title,
      text: item.text,
      paragraph: item.paragraph,
    });
    setEditingIndex(index);
    setEditing(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">
            Admin – About Us
          </h1>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-red-600 text-white font-semibold shadow hover:scale-105 transition-transform">
              <Plus className="mr-2" /> Add Content
            </button>
          )}
        </div>

        {/* Form */}
        {editing && (
          <form
            onSubmit={handleSave}
            className="bg-white p-6 rounded-2xl shadow mb-8 space-y-4 border border-blue-500/20">
            <div>
              <label className="block font-semibold mb-1">Upload Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="p-3 border rounded-xl w-full outline-none border-blue-500/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {form.image && (
                <img
                  src={
                    form.image instanceof File
                      ? URL.createObjectURL(form.image)
                      : form.image
                  }
                  alt="Preview"
                  className="w-40 h-28 object-cover rounded-lg mt-2"
                />
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="p-3 border rounded-xl w-full outline-none border-blue-500/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Text</label>
              <input
                type="text"
                name="text"
                value={form.text}
                onChange={handleChange}
                className="p-3 border rounded-xl w-full outline-none border-blue-500/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Paragraph</label>
              <textarea
                name="paragraph"
                value={form.paragraph}
                onChange={handleChange}
                rows="3"
                className="p-3 border rounded-xl w-full outline-none border-blue-500/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex items-center px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-red-600 text-white font-semibold shadow hover:scale-105 transition-transform">
                <Save className="mr-2" />{" "}
                {editingIndex !== null ? "Update" : "Save"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center px-5 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300">
                <X className="mr-2" /> Cancel
              </button>
            </div>
          </form>
        )}

        {/* Table */}
        <div className="overflow-x-auto bg-white border rounded-2xl shadow">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Title</th>
                <th className="p-3">Text</th>
                <th className="p-3">Paragraph</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(aboutList) && aboutList.length > 0 ? (
                aboutList.map((item, index) => (
                  <tr key={item._id || index} className="border-b">
                    <td className="p-3">
                      {item.image ? (
                        <img
                          src={`http://localhost:5000/uploads/about/${item.image}`}
                          alt={item.title}
                          className="w-20 h-14 object-cover rounded"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="p-3">{item.title}</td>
                    <td className="p-3">{item.text}</td>
                    <td className="p-3">{item.paragraph}</td>
                    <td className="p-3 flex space-x-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="px-3 py-3 bg-blue-500 text-white rounded-lg flex items-center">
                        <Edit className="w-4 h-4 mr-1" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="px-3 py-3 bg-orange-500 text-white rounded-lg flex items-center">
                        <Trash2 className="w-4 h-4 mr-1" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAboutUs;
