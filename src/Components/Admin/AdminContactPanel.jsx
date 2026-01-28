import React, { useEffect, useState } from "react";
import {
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Filter,
  Calendar,
  Search,
} from "lucide-react";

const AdminContactPanel = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalContacts, setTotalContacts] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter states
  const [dateFilter, setDateFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const API_URL = "http://localhost:5000/api/contacts";

  // ------------------ FETCH CONTACTS WITH PAGINATION AND FILTERS ------------------
  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        dateFilter,
        search: searchTerm,
      });

      const response = await fetch(`${API_URL}?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("API Response:", data); // Debug log

      // Validate and map data
      const mappedContacts = Array.isArray(data.contacts)
        ? data.contacts.map((contact) => ({
            _id: contact._id,
            title: contact.title || contact.name || "N/A", // Fallback for name
            email: contact.email || "N/A",
            phone: contact.phone || "N/A",
            subject: contact.subject || "N/A",
            message: contact.message || "N/A",
            createdAt: contact.createdAt || new Date().toISOString(),
          }))
        : [];

      setContacts(mappedContacts);
      setTotalPages(data.totalPages || 1);
      setTotalContacts(data.totalContacts || mappedContacts.length);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setError("Failed to load contacts. Please try again later.");
      setContacts([]);
      setTotalPages(1);
      setTotalContacts(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [currentPage, itemsPerPage, dateFilter, searchTerm]);

  // ------------------ DELETE CONTACT ------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchContacts(); // Refresh the list
    } catch (error) {
      console.error("Error deleting contact:", error);
      setError("Failed to delete contact. Please try again.");
    }
  };

  // ------------------ PAGINATION HANDLERS ------------------
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  // ------------------ FILTER HANDLERS ------------------
  const handleDateFilterChange = (filter) => {
    setDateFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // ------------------ MESSAGE MODAL ------------------
  const MessageModal = ({ contact, onClose }) => {
    if (!contact) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
            <h3 className="text-lg font-bold text-blue-700">
              Contact Details
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl">
              ×
            </button>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <p className="text-gray-900 font-medium">
                  {contact.title || "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-gray-900">{contact.email || "N/A"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <p className="text-gray-900">{contact.phone || "N/A"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <p className="text-gray-900">
                  {contact.createdAt
                    ? new Date(contact.createdAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <p className="text-gray-900 font-medium">
                {contact.subject || "N/A"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <p className="text-gray-900 whitespace-pre-wrap">
                  {contact.message || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ------------------ RENDER PAGINATION ------------------
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 7;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
            i === currentPage
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100 border"
          }`}>
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-between bg-white px-6 py-4 border-t">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-700">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalContacts)} of{" "}
            {totalContacts} entries
          </span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border border-blue-200 focus:border-blue-500 rounded-lg px-3 py-1 text-sm">
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronLeft className="w-4 h-4" />
          </button>

          {pages}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700">
          📋 Contact Submissions ({totalContacts})
        </h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-blue-200 focus:border-blue-500 rounded-lg hover:bg-gray-50 transition">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by name, email, subject..."
                  className="w-full pl-10 pr-4 py-2 border border-blue-200 focus:border-blue-500 rounded-lg focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                />
              </div>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Period
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={dateFilter}
                  onChange={(e) => handleDateFilterChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-blue-200 focus:border-blue-500 rounded-lg focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent appearance-none">
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="last7days">Last 7 Days</option>
                  <option value="last30days">Last 30 Days</option>
                  <option value="last3months">Last 3 Months</option>
                  <option value="last6months">Last 6 Months</option>
                  <option value="lastyear">Last Year</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setDateFilter("all");
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="bg-white shadow-lg shadow-blue-500/20 rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="px-4 py-12 text-center text-orange-600">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">SLNO</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Subject</th>
                  <th className="px-4 py-3 text-left">Message</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length > 0 ? (
                  contacts.map((contact, index) => (
                    <tr
                      key={contact._id}
                      className="border-t hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {contact.title || "N/A"}
                      </td>
                      <td className="px-4 py-3">{contact.email || "N/A"}</td>
                      <td className="px-4 py-3">{contact.phone || "N/A"}</td>
                      <td className="px-4 py-3">
                        <span className="inline-block max-w-xs truncate">
                          {contact.subject || "N/A"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block max-w-xs truncate">
                          {contact.message || "N/A"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {contact.createdAt
                          ? new Date(contact.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => setSelectedContact(contact)}
                            className="text-blue-500 hover:text-blue-700 transition p-1"
                            title="View Details">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(contact._id)}
                            className="text-orange-600 hover:text-orange-400 transition p-1"
                            title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-4 py-12 text-center text-gray-500 italic">
                      {searchTerm || dateFilter !== "all"
                        ? "No contacts found matching your filters."
                        : "No contact submissions found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && renderPagination()}
      </div>

      {/* Message Modal */}
      <MessageModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
      />
    </div>
  );
};

export default AdminContactPanel;
