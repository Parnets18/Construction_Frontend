import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Save, X, Edit, Trash2 } from "lucide-react";

const AdminContactCard = () => {
  const [form, setForm] = useState({
    phone: "",
    email: "",
    address: "",
  });

  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});

  const API_URL = "https://construction-backend-vm2j.onrender.com/api/contactcards";

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
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.email.trim()) newErrors.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email format is invalid";
    if (!form.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ------------------ HANDLE CHANGE ------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  // ------------------ SAVE / UPDATE ------------------
  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      console.log("Sending data:", form); // Debug log
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
      } else {
        const response = await axios.post(API_URL, form);
        console.log("Response:", response.data); // Debug log
      }
      resetForm();
      fetchData();
    } catch (err) {
      console.error("Error saving data:", err);
      console.error("Error response:", err.response?.data); // Debug log
    }
  };

  const resetForm = () => {
    setForm({
      phone: "",
      email: "",
      address: "",
    });
    setErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setForm({
      phone: item.phone || "",
      email: item.email || "",
      address: item.address || "",
    });
    setEditingId(item._id);
    setShowForm(true);
    setErrors({});
  };

  const handleDelete = async (item) => {
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
    <div className="h-full flex flex-col bg-white text-black">
      <div className="max-w-6xl mx-auto flex-1 flex flex-col w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">
            Admin Panel – Contact Cards
          </h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg">
              <Plus className="mr-2" /> Add Contact
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6">

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg shadow-blue-500/20 p-6 space-y-4 border backdrop-blur-md mb-6">
            {/* Phone */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone number (e.g., +919900003610)"
                className={`p-3 border rounded-xl bg-white focus:ring-2 focus:ring-blue-500 w-full ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Email Address *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={`p-3 border rounded-xl bg-white focus:ring-2 focus:ring-blue-500 w-full ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Address *</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter full address"
                rows={3}
                className={`p-3 border rounded-xl bg-white focus:ring-2 focus:ring-blue-500 w-full resize-none ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 pt-2">
              <button
                onClick={handleSave}
                className="flex items-center px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg">
                <Save className="mr-2" />
                {editingId ? "Update" : "Save"}
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
        <div className="bg-white shadow-lg shadow-blue-500/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Phone Number</th>
                  <th className="px-4 py-3 text-left">Email Address</th>
                  <th className="px-4 py-3 text-left">Address</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{item.phone || "-"}</td>
                    <td className="px-4 py-3">{item.email || "-"}</td>
                    <td className="px-4 py-3">{item.address || "-"}</td>
                    <td className="px-4 py-3 flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
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

        {!showForm && data.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg shadow-blue-500/20 p-8 text-center border">
            <p className="text-gray-500 text-lg">
              No contact information added yet.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 flex items-center justify-center px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg mx-auto">
              <Plus className="mr-2" /> Add Your First Contact
            </button>
          </div>
        )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContactCard;