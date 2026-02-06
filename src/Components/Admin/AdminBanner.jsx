import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Plus, Save, X } from "lucide-react";

const API = axios.create({
  baseURL: "https://construction-backend-vm2j.onrender.com/api/videos",
});

const BannerAdmin = () => {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchVideos = async () => {
    try {
      const res = await API.get("/");
      setVideos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    for (let i = 0; i < mediaFiles.length; i++) {
      formData.append("media", mediaFiles[i]);
    }

    try {
      if (editingId) {
        await API.put(`/${editingId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setEditingId(null);
      } else {
        await API.post("/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setTitle("");
      setDescription("");
      setMediaFiles([]);
      setShowForm(false);
      fetchVideos();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteVideo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    try {
      await API.delete(`/${id}`);
      fetchVideos();
    } catch (err) {
      console.error(err);
    }
  };

  const editVideo = (video) => {
    setEditingId(video._id);
    setTitle(video.title);
    setDescription(video.description);
    setMediaFiles([]);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="h-full flex flex-col bg-white text-black">
      <div className="flex-shrink-0 flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Admin Panel - Banner</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg">
            <Plus className="mr-2" /> Add Banner
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto max-w-6xl mx-auto w-full">
        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg shadow-blue-500/20 p-6 space-y-4 border backdrop-blur-md mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {editingId ? "Edit Banner" : "Add New Banner"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold">Title:</label>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full p-3 border-2 border-blue-300 focus:border-blue-600 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Description:</label>
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full p-3 border-2 border-blue-300 focus:border-blue-600 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
                  rows="3"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Upload Images:</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setMediaFiles(Array.from(e.target.files))}
                  className="w-full p-2 border-2 border-blue-300 focus:border-blue-600 rounded-lg"
                />
              </div>

              {mediaFiles.length > 0 && (
                <div className="text-sm text-gray-600">
                  Selected images: {mediaFiles.length}
                </div>
              )}

              {/* Save / Cancel */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex items-center px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Save className="mr-2" /> {editingId ? "Update" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setTitle("");
                    setDescription("");
                    setMediaFiles([]);
                  }}
                  className="flex items-center px-5 py-3 bg-gray-200 rounded-lg hover:bg-gray-300">
                  <X className="mr-2" /> Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Media List */}
        <div className="bg-white shadow-lg shadow-blue-500/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Images</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video) => (
                  <tr key={video._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">{video.title}</td>
                    <td className="px-4 py-3">{video.description}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {/* Display Images */}
                        {video.images && video.images.length > 0 ? (
                          video.images.map((img, i) => (
                            <img
                              key={`image-${i}`}
                              src={`https://construction-backend-vm2j.onrender.com/uploads/${img}`}
                              alt={`Banner ${i + 1}`}
                              className="w-20 h-12 object-cover rounded border"
                            />
                          ))
                        ) : (
                          <span className="text-gray-400 text-sm">No images</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 flex justify-center gap-2">
                      <button
                        onClick={() => editVideo(video)}
                        className="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg">
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteVideo(video._id)}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded-lg">
                        <FaTrash className="w-4 h-4" />
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

export default BannerAdmin;