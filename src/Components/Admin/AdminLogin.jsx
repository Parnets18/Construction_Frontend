import React, { useState } from "react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // ✅ Yaha aap backend API call karoge login ke liye
    console.log("Email:", email, "Password:", password);
    localStorage.setItem("token", "dummy-token"); // Example
    window.location.href = "/admin"; // Admin panel par bhejna
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-90">
      {/* Modal Box */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 relative animate-fadeIn">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
           Admin Login
        </h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
