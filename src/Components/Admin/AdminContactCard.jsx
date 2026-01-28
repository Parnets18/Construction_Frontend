import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Save, X, Edit, Trash2 } from "lucide-react";

const AdminContactCard = () => {
  const [form, setForm] = useState({
    title: "",
    type: "phone",
    phone: [""],
    email: [""],
    address: "",
  });

  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});

  const API_URL = "http://localhost:5000/api/contactcards"; // backend endpoint

  // ------------------ FETCH DATA ------------------
  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ------------------ VALIDATION ------------------
  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";

    if (form.type === "phone") {
      if (!form.phone.length || form.phone.some((p) => !p.trim()))
        newErrors.phone = "At least one phone number is required";
    } else if (form.type === "email") {
      if (!form.email.length || form.email.some((e) => !e.trim()))
        newErrors.email = "At least one email address is required";
    } else if (form.type === "address") {
      if (!form.address.trim()) newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ------------------ HANDLE CHANGE ------------------
  const handleChange = (e, index = null, field = null) => {
    const value = e.target.value;

    if (field && index !== null) {
      const updated = [...form[field]];
      updated[index] = value;
      setForm({ ...form, [field]: updated });

      if (errors[field]) setErrors({ ...errors, [field]: "" });
    } else {
      const name = e.target.name;
      setForm({ ...form, [name]: value });

      if (errors[name]) setErrors({ ...errors, [name]: "" });
    }
  };

  const addField = (field) =>
    setForm({ ...form, [field]: [...form[field], ""] });
  const removeField = (index, field) =>
    setForm({ ...form, [field]: form[field].filter((_, i) => i !== index) });

  // ------------------ SAVE / UPDATE ------------------
  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      resetForm();
      fetchData();
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      type: "phone",
      phone: [""],
      email: [""],
      address: "",
    });
    setErrors({});
    setEditingIndex(null);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (index) => {
    const item = data[index];
    setForm({
      title: item.title,
      type: item.type,
      phone: item.phone || [""],
      email: item.email || [""],
      address: item.address || "",
    });
    setEditingIndex(index);
    setEditingId(item._id);
    setShowForm(true);
    setErrors({});
  };

  const handleDelete = async (index) => {
    const item = data[index];
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await axios.delete(`${API_URL}/${item._id}`);
        fetchData();
      } catch (err) {
        console.error("Error deleting data:", err);
      }
    }
  };

  // ------------------ JSX ------------------
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#083744]">
            Admin Panel – Contact Cards
          </h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#083744] to-[#0a4453] text-white font-semibold hover:scale-105 transition-transform shadow-lg">
              <Plus className="mr-2" /> Add Contact Info
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white border border-[#083744]/20 rounded-2xl p-6 shadow-lg mb-8 space-y-4">
            {/* Title */}
            <div>
              <label className="block font-semibold mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter title (e.g., Contact Number)"
                className={`p-3 border rounded-xl bg-white focus:ring-2 focus:ring-[#ccb28b] w-full ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Type */}
            <div>
              <label className="block font-semibold mb-1">Type *</label>
              <select
                name="type"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="p-3 border rounded-xl border-gray-300 bg-white focus:ring-2 focus:ring-[#ccb28b] w-full">
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="address">Address</option>
              </select>
            </div>

            {/* Dynamic Fields */}
            {form.type === "phone" &&
              form.phone.map((phone, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => handleChange(e, index, "phone")}
                    placeholder={`Enter phone ${index + 1}`}
                    className={`p-3 border rounded-xl w-full ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {form.phone.length > 1 && (
                    <button
                      onClick={() => removeField(index, "phone")}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            {form.type === "phone" && (
              <button
                onClick={() => addField("phone")}
                className="mt-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                + Add Another Phone
              </button>
            )}
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}

            {form.type === "email" &&
              form.email.map((email, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleChange(e, index, "email")}
                    placeholder={`Enter email ${index + 1}`}
                    className={`p-3 border rounded-xl w-full ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {form.email.length > 1 && (
                    <button
                      onClick={() => removeField(index, "email")}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            {form.type === "email" && (
              <button
                onClick={() => addField("email")}
                className="mt-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                + Add Another Email
              </button>
            )}
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}

            {form.type === "address" && (
              <div>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter address..."
                  className={`p-3 border rounded-xl w-full ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>
            )}

            {/* Buttons */}
            <div className="flex space-x-3 pt-2">
              <button
                onClick={handleSave}
                className="flex items-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#083744] to-[#0a4453] text-white font-semibold hover:scale-105 transition-transform shadow-lg">
                <Save className="mr-2" />
                {editingIndex !== null ? "Update" : "Save"}
              </button>
              <button
                onClick={resetForm}
                className="flex items-center px-5 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold shadow">
                <X className="mr-2" /> Cancel
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        {data.length > 0 && (
          <div className="overflow-x-auto bg-white border border-[#083744]/20 rounded-2xl shadow-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#083744] text-white">
                  <th className="p-3">SL No</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-semibold text-center">
                      {index + 1}
                    </td>
                    <td className="p-3 font-semibold">{item.title}</td>
                    <td className="p-3 text-gray-600">
                      {(item.phone && Array.isArray(item.phone) && item.phone.filter((p) => p).join(", ")) ||
                        "-"}
                    </td>
                    <td className="p-3 text-gray-600">
                      {(item.email && Array.isArray(item.email) && item.email.filter((e) => e).join(", ")) ||
                        "-"}
                    </td>
                    <td className="p-3 text-gray-600">{item.address || "-"}</td>
                    <td className="p-3 flex space-x-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg flex items-center hover:bg-blue-200">
                        <Edit className="w-4 h-4 mr-1" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded-lg flex items-center hover:bg-red-200">
                        <Trash2 className="w-4 h-4 mr-1" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!showForm && data.length === 0 && (
          <div className="bg-white border border-[#083744]/20 rounded-2xl p-8 text-center shadow-lg">
            <p className="text-gray-500 text-lg">
              No contact information added yet.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#083744] to-[#0a4453] text-white font-semibold hover:scale-105 transition-transform shadow-lg mx-auto">
              <Plus className="mr-2" /> Add Your First Contact
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContactCard;