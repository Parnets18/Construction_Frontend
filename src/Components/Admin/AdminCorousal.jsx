import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

const API = axios.create({
  baseURL: "http://localhost:5000/api/videos",
});

const VideoAdmin = () => {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]); // Changed from videoFiles
  const [editingId, setEditingId] = useState(null);

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
      formData.append("media", mediaFiles[i]); // Changed from "videos" to "media"
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
      fetchVideos();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteVideo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Media Admin Panel</h1>

      {/* Media Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 flex flex-col gap-4 border p-4 rounded bg-white shadow">
        <h2 className="text-xl font-semibold">
          {editingId ? "Edit Media" : "Add Media"}
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-2 border rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="p-2 border rounded"
        />

        <input
          type="file"
          multiple
          accept="image/*,video/*" // Accept both images and videos
          onChange={(e) => setMediaFiles(Array.from(e.target.files))} // Convert to array
          className="p-2"
        />

        {mediaFiles.length > 0 && (
          <div className="text-sm text-gray-600">
            Selected files: {mediaFiles.length}
          </div>
        )}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editingId ? "Update Media" : "Add Media"}
        </button>
      </form>

      {/* Media List */}
      <table className="w-full border-collapse bg-white shadow rounded overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Media Files</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video._id} className="border-b">
              <td className="border p-2">{video.title}</td>
              <td className="border p-2">{video.description}</td>
              <td className="border p-2">
                <div className="flex flex-wrap gap-2">
                  {/* Display Videos */}
                  {video.videos &&
                    video.videos.map((v, i) => (
                      <video
                        key={`video-${i}`}
                        src={`http://localhost:5000/${v}`}
                        controls
                        className="w-32 h-20 object-cover"
                      />
                    ))}

                  {/* Display Images */}
                  {video.images &&
                    video.images.map((img, i) => (
                      <img
                        key={`image-${i}`}
                        src={`http://localhost:5000/${img}`}
                        alt={`Media ${i + 1}`}
                        className="w-32 h-20 object-cover"
                      />
                    ))}

                  {(!video.videos || video.videos.length === 0) &&
                    (!video.images || video.images.length === 0) && (
                      <span className="text-gray-500">No media files</span>
                    )}
                </div>
              </td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => editVideo(video)}
                  className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteVideo(video._id)}
                  className="text-orange-600 hover:text-orange-400">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VideoAdmin;
