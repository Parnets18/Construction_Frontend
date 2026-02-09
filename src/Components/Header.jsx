import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/", isContact: false },
    { name: "About Us", path: "/about", isContact: false },
    { name: "Projects", path: "/projects", isContact: false },
    { name: "Services", path: "/services", isContact: false },
    { name: "Contact Us", path: "/contactus", isContact: true },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-lg' 
        : 'bg-white shadow-md'
    }`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-4'
        }`}>
          
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <img 
              src="/images/logo.png" 
              alt="Amogh Construction" 
              className={`transition-all duration-300 object-contain ${
                isScrolled ? 'h-12' : 'h-16'
              } group-hover:scale-105`}
            />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end
                className={({ isActive }) =>
                  item.isContact
                    ? `px-6 py-2.5 bg-gradient-to-r from-[#1E3A8A] to-red-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
                        isActive ? 'scale-105' : 'hover:scale-105'
                      }`
                    : `relative px-5 py-2 text-base font-bold transition-all duration-300 group ${
                        isActive
                          ? "text-red-600"
                          : "text-[#1E3A8A] hover:text-red-600"
                      }`
                }>
                {({ isActive }) => (
                  <>
                    {item.isContact ? (
                      <span>{item.name}</span>
                    ) : (
                      <>
                        <span className="relative z-10">{item.name}</span>
                        {isActive && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
                        )}
                        {!isActive && (
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></div>
                        )}
                      </>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#1E3A8A] hover:bg-gray-100 transition-colors">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? "max-h-96 opacity-100" 
            : "max-h-0 opacity-0"
        } overflow-hidden bg-white border-t border-gray-200`}>
        
        <div className="px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                item.isContact
                  ? `block px-4 py-3 bg-gradient-to-r from-[#1E3A8A] to-red-600 text-white text-center font-bold rounded-lg shadow-md transition-all duration-200 ${
                      isActive ? 'scale-105' : ''
                    }`
                  : `block px-4 py-3 text-base font-bold rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-white bg-red-600"
                        : "text-[#1E3A8A] hover:bg-red-50 hover:text-red-600"
                    }`
              }>
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
