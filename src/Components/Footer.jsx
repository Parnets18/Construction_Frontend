import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  // Navigation handler function
  const handleNavigation = (path) => {
    navigate(path);
    // Scroll to top after navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-100 text-gray-800 mt-20 relative overflow-hidden">
      {/* Background pattern */}
      {/* <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-[#dc2626]"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-[#dc2626]"></div>
      </div> */}

      {/* Main footer content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Column 1 - Logo + Text */}
        <div className="space-y-6">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavigation('/')}
          >
            {/* Text-based Logo matching Header */}
            <div className="flex items-center space-x-4">
              {/* Animated Logo Circle */}
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                <span className="text-white font-bold text-xl">C</span>
                {/* Animated Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-pulse"></div>
                <div className="absolute -inset-1 rounded-full border border-blue-300/20 animate-ping"></div>
              </div>
              
              <div className="flex flex-col">
                {/* Main Logo Text with Gradient */}
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent tracking-tight">
                  Construction
                </span>
                {/* Animated Subtitle */}
                <span className="text-xs text-red-600 font-medium tracking-widest uppercase">
                  <span className="inline-block animate-pulse">Construction & Developers</span>
                </span>
              </div>
            </div>
          </div>
          <p className="text-base leading-relaxed text-gray-600">
            Our post-construction services give you peace of mind knowing that
            we are still here for you even after your project is complete.
          </p>
        </div>

        {/* Column 2 - Services */}
        <div>
          <h3 className="text-xl text-[#dc2626] font-semibold mb-6 pb-2 border-b border-[#dc2626]/30 inline-block">
            Our Services
          </h3>
          <ul className="space-y-4 text-gray-600 text-base">
            <li 
              className="hover:text-[#dc2626] transition-colors duration-200 cursor-pointer" 
            >
              Residence
            </li>
            <li 
              className="hover:text-[#dc2626] transition-colors duration-200 cursor-pointer"              
            >
              Apartments
            </li>
            <li 
              className="hover:text-[#dc2626] transition-colors duration-200 cursor-pointer"
             >
              Interiors
            </li>
            <li 
              className="hover:text-[#dc2626] transition-colors duration-200 cursor-pointer"              
            >
              Hospitality
            </li>
            <li 
              className="hover:text-[#dc2626] transition-colors duration-200 cursor-pointer"             
            >
              Landscape
            </li>
            <li 
              className="hover:text-[#dc2626] transition-colors duration-200 cursor-pointer"
            >
              Layout Design
            </li>
          </ul>
        </div>

        {/* Column 3 - Company */}
        <div>
          <h3 className="text-xl font-semibold mb-6 pb-2 border-b text-[#dc2626] border-[#dc2626]/30 inline-block">
            Company
          </h3>
          <ul className="space-y-4 text-gray-600 text-base">
            <li>
              <button
                onClick={() => handleNavigation('/about')}
                className="hover:text-[#dc2626] transition-colors duration-200 flex items-center bg-transparent border-none text-left w-full p-0 cursor-pointer text-gray-600"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('/projects')}
                className="hover:text-[#dc2626] transition-colors duration-200 flex items-center bg-transparent border-none text-left w-full p-0 cursor-pointer text-gray-600"
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('/services')}
                className="hover:text-[#dc2626] transition-colors duration-200 flex items-center bg-transparent border-none text-left w-full p-0 cursor-pointer text-gray-600"
              >
                Services
              </button>
            </li>
           
            
            <li>
              <button
                onClick={() => handleNavigation('/contactus')}
                className="hover:text-[#dc2626] transition-colors duration-200 flex items-center bg-transparent border-none text-left w-full p-0 cursor-pointer text-gray-600"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4 - Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-6 pb-2 border-b text-[#dc2626] border-[#dc2626]/30 inline-block">
            Contact Us
          </h3>
          <div className="space-y-4 text-gray-600 text-base">
          
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-[#dc2626] mr-3 mt-1 flex-shrink-0" />
              <a 
                href="tel:+919900003410"
                className="hover:text-[#dc2626] transition-colors duration-200"
              >
                +91 9900003410
              </a>
            </div>
            <div className="flex items-start">
              <Mail className="h-5 w-5 text-[#dc2626] mr-3 mt-1 flex-shrink-0" />
              <a 
                href="mailto:info@prithvidevelopers.com"
                className="hover:text-[#dc2626] transition-colors duration-200"
              >
                info@construction.com
              </a>
            </div>
          
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-[#dc2626] mr-3 mt-1 flex-shrink-0" />
              <a 
                href="https://maps.google.com?q=9/15,+1st+Main,+Vyalikaval,+Bengaluru,+560003"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#dc2626] transition-colors duration-200"
              >
                9/15, 1st Main, Vyalikaval, Bengaluru, 560003
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* First Divider */}
      <div className="border-t border-gray-300 relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-20 h-1 bg-[#dc2626] rounded-full"></div>
      </div>

      {/* Bottom Section */}
      <div className="relative max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center">
        {/* Left - Copyright */}
        <p className="text-base text-gray-500 mb-4 sm:mb-0">
          © 2026 Constructions and Developers. All Rights Reserved.
        </p>

        {/* Right - Social Media */}
        <div className="flex space-x-5">
          <a
            href="https://facebook.com/construction"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-600 p-2 rounded-full hover:bg-[#dc2626] transition-colors duration-300 group"
            aria-label="Visit our Facebook page"
          >
            <Facebook
              size={20}
              className="text-white group-hover:text-gray-800"
            />
          </a>
          <a
            href="https://instagram.com/construction"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-600 p-2 rounded-full hover:bg-[#dc2626] transition-colors duration-300 group"
            aria-label="Visit our Instagram page"
          >
            <Instagram
              size={20}
              className="text-white group-hover:text-gray-800"
            />
          </a>
          <a
            href="https://twitter.com/construction"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-600 p-2 rounded-full hover:bg-[#dc2626] transition-colors duration-300 group"
            aria-label="Visit our Twitter page"
          >
            <Twitter
              size={20}
              className="text-white group-hover:text-gray-800"
            />
          </a>
          <a
            href="https://linkedin.com/company/construction"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-600 p-2 rounded-full hover:bg-[#dc2626] transition-colors duration-300 group"
            aria-label="Visit our LinkedIn page"
          >
            <Linkedin
              size={20}
              className="text-white group-hover:text-gray-800"
            />
          </a>
        </div>
      </div>

      {/* Final decorative element */}
      <div className="w-full h-1 bg-gradient-to-r from-[#1E40AF] via-[#dc2626] to-[#1E40AF]"></div>
    </footer>
  );
};

export default Footer;