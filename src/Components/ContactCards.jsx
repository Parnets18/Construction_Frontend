import React, { useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import AOS from "aos";

const ContactCards = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div
      className="relative w-full py-4 sm:py-6 px-4 sm:px-6 lg:px-8 overflow-hidden"
      data-aos="zoom-in-down"
    >
      <div className="relative max-w-5xl mx-auto">
        {/* Location Section */}
        <div 
          className="relative z-10 mb-4" 
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Section Header */}
          <div className="text-center mb-5">
            <div className="relative inline-block">
              <div className="relative inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full shadow-2xl">
                <FaMapMarkerAlt className="text-white text-lg animate-bounce" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-blue-700 mb-3 mt-4">
              Locate Our Office
            </h2>
            <p className="text-gray-600 max-w-lg mx-auto text-base">
              Premium construction services at your doorstep
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto mt-3 rounded-full shadow-lg"></div>
          </div>

          {/* Map Container */}
          <div className="relative rounded-xl p-4 sm:p-5 max-w-4xl mx-auto overflow-hidden">
            {/* Map iframe */}
            <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-white rounded-xl">
                <div className="bg-white rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.6789!2d77.5928871!3d12.9752487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1673e7d0672f%3A0xc62ca5a6e943dfb8!2sSri%20Chamarajendra%20Park%2C%20Nunegundlapalli%2C%20Ambedkar%20Veedhi%2C%20Bengaluru%2C%20Karnataka%20560001!5e0!3m2!1sen!2sin!4v1699123456789!5m2!1sen!2sin"
                    className="w-full h-48 sm:h-56 md:h-64 border-0 transition-all duration-500 group-hover:scale-[1.01]"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Construction Company Location"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-5 px-2">
              <button
                onClick={() => {
                  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                  const address = "Sri Chamarajendra Park, Nunegundlapalli, Ambedkar Veedhi, Bengaluru, Karnataka 560001";
                  if (isMobile) {
                    window.open(`https://maps.google.com/maps?daddr=${encodeURIComponent(address)}&dirflg=d`, "_blank");
                  } else {
                    window.open(`https://www.google.com/maps/dir//${encodeURIComponent(address)}`, "_blank");
                  }
                }}
                className="group relative w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-blue-600/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-0.5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  <FaMapMarkerAlt className="text-sm group-hover:animate-bounce" />
                  <span className="text-sm tracking-wide">GET DIRECTIONS</span>
                </div>
              </button>
              
              <button
                onClick={() => window.location.href = "tel:+919900003610"}
                className="group relative w-full sm:w-auto px-5 py-2.5 bg-white text-blue-600 font-medium rounded-lg shadow-md border border-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white hover:border-transparent transition-all duration-500 transform hover:scale-105 hover:-translate-y-0.5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-600/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  <FaPhoneAlt className="text-sm group-hover:animate-pulse" />
                  <span className="text-sm tracking-wide">CALL NOW</span>
                </div>
              </button>
              
              <button
                onClick={() => window.location.href = "mailto:info@prithvidevelopers.com"}
                className="group relative w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-transparent to-transparent text-blue-600 font-medium rounded-lg border border-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white hover:border-transparent transition-all duration-500 transform hover:scale-105 hover:-translate-y-0.5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-600/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  <FaEnvelope className="text-sm group-hover:animate-pulse" />
                  <span className="text-sm tracking-wide">EMAIL US</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCards;