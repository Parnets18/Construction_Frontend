import React, { useState, useEffect } from "react";
import { Plus, Save, X, Edit, Trash2, Star } from "lucide-react";
import axios from "axios";

const AdminTestimonial = () => {
  const [form, setForm] = useState({
    rating: 0,
    paragraph: "",
    name: "",
    designation: "",
    file: null,
  });
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch testimonials
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(
        "https://construction-backend-vm2j.onrender.com/api/testimonials"
      );
      setData(res.data);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    }
  };

  // Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files && files[0]) {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: name === "rating" ? Number(value) : value });
    }
  };

  // Save (Add/Update)
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("rating", form.rating);
      formData.append("paragraph", form.paragraph);
      formData.append("name", form.name);
      formData.append("designation", form.designation);
      if (form.file) {
        formData.append("profilePic", form.file);
      }

      if (editingId) {
        await axios.put(
          `https://construction-backend-vm2j.onrender.com/api/testimonials/${editingId}`,
          formData
        );
      } else {
        await axios.post(
          "https://construction-backend-vm2j.onrender.com/api/testimonials",
          formData
        );
      }
      fetchTestimonials();
      resetForm();
    } catch (err) {
      console.error("Error saving testimonial:", err);
    }
  };

  const handleEdit = (item) => {
    setForm({
      rating: item.rating,
      paragraph: item.paragraph,
      name: item.name,
      designation: item.designation,
      file: null,
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://construction-backend-vm2j.onrender.com/api/testimonials/${id}`
      );
      fetchTestimonials();
    } catch (err) {
      console.error("Error deleting testimonial:", err);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setForm({
      rating: 0,
      paragraph: "",
      name: "",
      designation: "",
      file: null,
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="max-w-6xl mx-auto flex-1 flex flex-col w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">
            Admin Panel – Testimonials
          </h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg">
              <Plus className="mr-2" /> Add Testimonial
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white border border-blue-500/20 rounded-2xl p-6 shadow-lg shadow-blue-500/20 mb-8 space-y-4">
            {/* Rating */}
            <div>
              <label className="block font-semibold mb-1">Star Rating</label>
              <select
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className="p-3 border rounded-xl border-blue-500/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full">
                <option value={0}>Select Rating</option>
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star} Star{star > 1 && "s"}
                  </option>
                ))}
              </select>
            </div>

            {/* Paragraph */}
            <div>
              <label className="block font-semibold mb-1">Testimonial</label>
              <textarea
                name="paragraph"
                value={form.paragraph}
                onChange={handleChange}
                rows="3"
                placeholder="Enter testimonial..."
                className="p-3 border rounded-xl border-blue-500/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter client name"
                className="p-3 border rounded-xl border-blue-500/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>

            {/* Designation */}
            <div>
              <label className="block font-semibold mb-1">Designation</label>
              <input
                type="text"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                placeholder="Enter designation"
                className="p-3 border rounded-xl border-blue-500/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>

            {/* Profile Picture */}
            <div>
              <label className="block font-semibold mb-1">
                Profile Picture
              </label>
              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-2 border rounded-lg border-blue-500/20"
              />
              {form.file && (
                <img
                  src={URL.createObjectURL(form.file)}
                  alt="Preview"
                  className="mt-3 w-24 h-24 rounded-full object-cover border"
                />
              )}
            </div>

            {/* Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                className="flex items-center px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg">
                <Save className="mr-2" />
                {editingId ? "Update" : "Save"}
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center px-5 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold shadow">
                <X className="mr-2" /> Cancel
              </button>
            </div>
          </div>
        )}

        {/* Testimonials Table */}
        {data.length > 0 && (
          <div className="overflow-x-auto bg-white border border-blue-500/20 rounded-2xl shadow-lg shadow-blue-500/20">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-3">Profile</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Designation</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Testimonial</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      {item.profilePic && (
                        <img
                          src={`https://construction-backend-vm2j.onrender.com/uploads/testimonials/${item.profilePic}`}
                          alt={item.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                    </td>
                    <td className="p-3 font-semibold">{item.name}</td>
                    <td className="p-3">{item.designation}</td>
                    <td className="p-3 py-6 flex">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="text-amber-500 w-4 h-4" />
                      ))}
                    </td>
                    <td className="p-3 text-gray-600">{item.paragraph}</td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg flex items-center hover:bg-blue-200">
                          <Edit className="w-4 h-4 mr-1" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="px-3 py-2 bg-red-100 text-orange-600 rounded-lg flex items-center hover:bg-rose-200">
                          <Trash2 className="w-4 h-4 mr-1" />
                        </button>
                      </div>
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

export default AdminTestimonial;
