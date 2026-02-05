import { useState } from "react";
import {
  Bell,
  Menu,
  UserPlus,
  Eye,
  CardSim,
  Image as ImageIcon,
  Beaker,
  CircleUserRound,
  Contact,
  Building,
  LogOut,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin/login");
  };

  const navigation = [
    {
      id: "banner",
      name: "Banner",
      icon: <ImageIcon size={20} />,
      path: "/admin/banner",
    },
    {
      id: "About-Us",
      name: "About Us",
      icon: <UserPlus size={20} />,
      path: "/admin/aboutus",
    },
    {
      id: "vision-mission",
      name: "Vision Mission",
      icon: <Eye size={20} />,
      path: "/admin/vision-mission",
    },

    {
      id: "services",
      name: "Services",
      icon: <CardSim size={20} />,
      path: "/admin/services",
    },
    {
      id: "projects",
      name: "Projects",
      icon: <Building size={20} />,
      path: "/admin/projects",
    },
    {
      id: "testimonials",
      name: "Testimonials",
      icon: <Beaker size={20} />,
      path: "/admin/testimonials",
    },
    {
      id: "contact",
      name: "Contact-Cards",
      icon: <CircleUserRound />,
      path: "/admin/contactcards",
    },
    {
      id: "contactform",
      name: "Contact Form",
      icon: <Contact />,
      path: "/admin/contact-form",
    },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-30 w-64 bg-white text-black border-r border-gray-200 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-0" : "-ml-64"
        } md:ml-0`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
              C
            </div>
            <div>
              <h1 className="text-xl font-bold text-black">Admin Panel</h1>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`w-full flex items-center p-3 rounded-lg transition-all ${
                    location.pathname === item.path
                      ? "bg-gray-200 text-black shadow-md"
                      : "text-black hover:bg-gray-100 hover:text-black"
                  }`}>
                  <span
                    className={`${
                      location.pathname === item.path
                        ? "text-black"
                        : "text-gray-600"
                    }`}>
                    {item.icon}
                  </span>
                  <span className="ml-3 font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
            
            {/* Logout Button */}
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center p-3 rounded-lg transition-all bg-red-600 text-white hover:bg-red-700">
                <LogOut size={20} className="text-white" />
                <span className="ml-3 font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10 border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-4 text-black focus:outline-none md:hidden">
                <Menu size={24} />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-1 text-black hover:text-blue-700">
                <Bell size={24} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full"></span>
              </button>

              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <span className="ml-2 text-black">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Nested routes will render here */}
        <main className="flex-1 overflow-hidden p-4 md:p-6 bg-white text-black">
          <div className="h-full overflow-y-auto">
            <Outlet /> {/* ✅ All child routes appear here */}
          </div>
        </main>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setMobileMenuOpen(false)}></div>
      )}
    </div>
  );
};

export default AdminPanel;
