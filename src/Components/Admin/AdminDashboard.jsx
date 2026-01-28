import React from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // token delete
    navigate("/"); // redirect to login        // redirect to login
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <h2 className="text-xl font-bold p-4 border-b border-gray-700">
          Admin Menu
        </h2>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/admin/carousel"
            className={({ isActive }) =>
              isActive
                ? "block bg-gray-700 p-2 rounded"
                : "block p-2 hover:bg-gray-700 rounded"
            }>
            Carousel
          </NavLink>
          <NavLink
            to="/admin/aboutus"
            className={({ isActive }) =>
              isActive
                ? "block bg-gray-700 p-2 rounded"
                : "block p-2 hover:bg-gray-700 rounded"
            }>
            About Us
          </NavLink>
          <NavLink
            to="/admin/vision-mission"
            className={({ isActive }) =>
              isActive
                ? "block bg-gray-700 p-2 rounded"
                : "block p-2 hover:bg-gray-700 rounded"
            }>
            Vision & Mission
          </NavLink>
          <NavLink
            to="/admin/services"
            className={({ isActive }) =>
              isActive
                ? "block bg-gray-700 p-2 rounded"
                : "block p-2 hover:bg-gray-700 rounded"
            }>
            Services
          </NavLink>
          <NavLink
            to="/admin/testimonials"
            className={({ isActive }) =>
              isActive
                ? "block bg-gray-700 p-2 rounded"
                : "block p-2 hover:bg-gray-700 rounded"
            }>
            Testimonials
          </NavLink>
          <NavLink
            to="/admin/contactcards"
            className={({ isActive }) =>
              isActive
                ? "block bg-gray-700 p-2 rounded"
                : "block p-2 hover:bg-gray-700 rounded"
            }>
            Contact Cards
          </NavLink>
          <NavLink
            to="/admin/contact-form"
            className={({ isActive }) =>
              isActive
                ? "block bg-gray-700 p-2 rounded"
                : "block p-2 hover:bg-gray-700 rounded"
            }>
            Contact Form
          </NavLink>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="m-4 px-2 py-2 bg-red-600 text-white rounded hover:bg-orange-400 p-8">
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
