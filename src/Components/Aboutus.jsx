
import React, { useEffect, useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDesignServices } from "react-icons/md";
import { GrTechnology } from "react-icons/gr";
import { RiCustomerService2Line } from "react-icons/ri";
import ServiceImg from "../../src/Images/service-img.jpg";
import AOS from "aos";
import axios from "axios";

const Aboutus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    // ✅ Backend se data fetch
    axios
      .get("https://construction-backend-vm2j.onrender.com/api/about")
      .then((res) => {
        console.log(res.data);
        setFeatures(res.data.features || []);
      })
      .catch((err) => {
        console.error("Error fetching about:", err);
      });
  }, []);

  const handleAboutUsPage = () => {
    navigate("/about");
  };

  // Icon mapping (backend se sirf name ayega)
  const iconMap = {
    MdDesignServices: MdDesignServices,
    GrTechnology: GrTechnology,
    RiCustomerService2Line: RiCustomerService2Line,
  };

  return (
    <div
      className="relative min-h-[30vh] bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden py-6 sm:py-10"
      data-aos="zoom-in-down">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-blue-600 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 sm:w-40 sm:h-40 bg-[#dc2626] rounded-full blur-2xl"></div>
      </div>

      {/* Full-width container */}
      <div className="relative w-full">
        <div className="bg-white/60 backdrop-blur-sm shadow-xl border border-white/20 overflow-hidden w-full">
          {/* Flex container with equal height */}
          <div className="flex flex-col lg:flex-row w-full items-stretch">
            {/* Left Section - Image */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="relative w-full h-52 sm:h-72 md:h-full overflow-hidden">
                <img
                  src={ServiceImg}
                  alt="Premium Construction Services"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1E40AF]/25 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Right Section - Content */}
            <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-center bg-white">
              {/* Title */}
              <div className="mb-4 text-center lg:text-left">
                <h1 className="text-4xl font-semibold text-blue-700 mb-2 leading-snug">
                  Crafting structures that{" "}
                  <span className="relative">
                    <span className="text-[#dc2626]">last a lifetime</span>
                    <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#dc2626] to-transparent rounded-full"></div>
                  </span>
                </h1>
                <div className="w-8 sm:w-10 h-1 bg-blue-600 rounded-full mx-auto lg:mx-0"></div>
              </div>

              {/* Description */}
              <p className="text-lg mb-4 leading-relaxed font-light text-center lg:text-left">
                Crafting structures that last a lifetime requires advanced
                materials, resilient design, and sustainability practices —
                blending tradition with modern technology.
              </p>

              {/* Features (Backend se data) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                {features.map((feature, index) => {
                  const IconComponent =
                    iconMap[feature.icon] || MdDesignServices;
                  return (
                    <div
                      key={index}
                      className="group bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-md hover:shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 border border-white/30">
                      <div className="flex items-start space-x-3">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-md group-hover:scale-105 transition-transform duration-300 shadow-md">
                          <IconComponent className="text-[#dc2626] text-lg sm:text-xl" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-medium mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-lg leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom description */}
              <div className="bg-gradient-to-r from-[#1E40AF]/5 to-[#dc2626]/5 rounded-lg p-3 sm:p-4 mb-4 border border-blue-500/10">
                <p className="text-base leading-relaxed font-medium text-center lg:text-left">
                  We specialize in residential, commercial, and industrial
                  projects with unmatched quality and precision.
                </p>
              </div>

              {/* Additional Company Info */}
              <div className="space-y-3 mb-4">
                <div className="bg-white/90 rounded-lg p-3 border border-blue-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <h4 className="text-lg font-medium">15+ Years of Excellence</h4>
                  </div>
                  <p className="text-base">
                    Established in 2008, we have successfully completed over 500 projects across residential and commercial sectors.
                  </p>
                </div>

                <div className="bg-white/90 rounded-lg p-3 border border-blue-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <h4 className="text-lg font-medium">Certified Professionals</h4>
                  </div>
                  <p className="text-base">
                    Our team consists of licensed engineers, certified project managers, and skilled craftsmen committed to excellence.
                  </p>
                </div>

                <div className="bg-white/90 rounded-lg p-3 border border-blue-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <h4 className="text-lg font-medium">Sustainable Building</h4>
                  </div>
                  <p className="text-base">
                    We incorporate eco-friendly materials and energy-efficient designs to create sustainable structures for the future.
                  </p>
                </div>
              </div>

              {/* CTA */}
              {isHomePage && (
                <div className="flex justify-center lg:justify-start">
                  <button
                    onClick={handleAboutUsPage}
                    className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-2 sm:py-3 px-5 sm:px-6 rounded-lg transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl overflow-hidden min-w-[140px]">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#dc2626]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center space-x-2">
                      <span className="text-xs tracking-wide">
                        Explore Now
                      </span>
                      <div className="bg-white/20 p-1 rounded-full group-hover:bg-white/30 transition-all duration-300">
                        <HiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
