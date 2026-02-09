import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/", accent: "#dc2626" },
    { name: "About Us", path: "/about", accent: "#dc2626" },
    { name: "Projects", path: "/projects", accent: "#dc2626" },
    { name: "Services", path: "/services", accent: "#dc2626" },
    { name: "Contact Us", path: "/contactus", accent: "#dc2626" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50' 
        : 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-500 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}>
          {/* Logo + Name with Animation */}
          <div className="flex items-center space-x-4 group">
            {/* Logo Image */}
            <img 
              src="/images/logo.png" 
              alt="Construction Logo" 
              className={`transition-all duration-500 group-hover:scale-110 object-contain ${
                isScrolled ? 'h-10' : 'h-12'
              }`}
            />
            
            <div className="flex flex-col transition-all duration-500">
             
              
            </div>
          </div>

          {/* Desktop Nav with Advanced Animations */}
          <nav className="hidden md:flex items-center space-x-1 relative">
            {/* Animated Background Slider */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {navItems.map((item, index) => (
              <NavLink
                key={item.name}
                to={item.path}
                end
                onMouseEnter={() => setActiveIndex(index)}
                className={({ isActive }) =>
                  `relative px-6 py-3 text-base font-bold transition-all duration-500 rounded-full overflow-hidden group ${
                    isActive
                      ? "text-[#1E3A8A]"
                      : "text-[#1E3A8A] hover:text-[#1E40AF]"
                  }`
                }>
                
                {/* Animated Background */}
                <div className={`absolute inset-0 transition-all duration-500 ${
                  ({ isActive }) => isActive 
                    ? 'bg-gradient-to-r from-orange-200 to-red-200 opacity-100 scale-100' 
                    : 'bg-gradient-to-r from-orange-100 to-red-100 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                }`}></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Floating Particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-1 left-2 w-1 h-1 bg-white/60 rounded-full animate-bounce"></div>
                  <div className="absolute top-2 right-3 w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="absolute bottom-2 left-4 w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
                
                <span className="relative z-10 transition-all duration-300 group-hover:scale-105">{item.name}</span>
                
                {/* Bottom Border Animation */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-500 to-red-600 group-hover:w-full transition-all duration-500"></div>
              </NavLink>
            ))}
          </nav>

          {/* Animated Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 transition-all duration-500 shadow-lg hover:shadow-2xl hover:scale-110 group overflow-hidden">
              
              {/* Button Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon with Rotation Animation */}
              <div className="relative z-10 transition-transform duration-500">
                {isMenuOpen ? (
                  <X size={22} className="transform rotate-180 transition-transform duration-500" />
                ) : (
                  <Menu size={22} className="transform rotate-0 transition-transform duration-500" />
                )}
              </div>
              
              {/* Ripple Effect */}
              <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-700 ease-in-out transform ${
          isMenuOpen 
            ? "max-h-96 opacity-100 translate-y-0" 
            : "max-h-0 opacity-0 -translate-y-4"
        } overflow-hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl`}>
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-transparent to-red-50/50"></div>
        
        <div className="relative px-6 py-6 space-y-2">
          {navItems.map((item, index) => (
            <NavLink
              key={item.name}
              to={item.path}
              end
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-4 text-lg font-bold rounded-2xl transition-all duration-500 transform hover:scale-105 relative overflow-hidden group ${
                  isActive
                    ? "text-[#1E3A8A] bg-gradient-to-r from-orange-200 to-red-200 shadow-lg scale-105 border-2 border-orange-300"
                    : "text-[#1E3A8A] hover:text-[#1E40AF] border border-gray-200 hover:border-orange-300"
                }`
              }
              style={{
                animationDelay: `${index * 100}ms`,
                animation: isMenuOpen ? 'slideInRight 0.5s ease-out forwards' : 'none'
              }}>
              
              {/* Mobile Link Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-red-100 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100"></div>
              
              {/* Mobile Link Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <span className="relative z-10">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;
