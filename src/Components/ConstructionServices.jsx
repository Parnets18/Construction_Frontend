import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ConstructionServices = ({ isHomePage }) => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  const handleViewAllServices = () => {
    navigate("/services");
    window.scrollTo(0, 0);
  };

  const handleGetStarted = () => {
    console.log("Get Started button clicked - navigating to /contactus");
    navigate("/contactus");
    window.scrollTo(0, 0);
  };

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("https://construction-backend-vm2j.onrender.com/api/services");
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const displayedServices = isHomePage ? services.slice(0, 4) : services;

  return (
    <div className="w-full overflow-x-hidden">
      {/* Introduction Section */}
      <section className="relative bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-blue-600">Our Construction</span> <span className="text-red-600">Services</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
              Discover our comprehensive construction and design services tailored to bring your vision to life 
              with unmatched quality and precision. From residential homes to commercial buildings, we deliver 
              excellence in every project with innovative solutions and expert craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className={`relative ${isHomePage ? 'bg-gray-50' : 'bg-white'} py-16 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayedServices.map((service, index) => (
              <div
                key={service._id}
                className="group bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-blue-100"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={`https://construction-backend-vm2j.onrender.com/uploads/services/${service.images[0]}`}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-3 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{service.paragraph}</p>
                  
                  {service.features && service.features.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {service.features.slice(0, 2).map((feature, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                        {service.features.length > 2 && (
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                            +{service.features.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <button 
                    onClick={() => {
                      navigate("/contactus");
                      window.scrollTo(0, 0);
                    }}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View All Services Button - Only show on home page */}
          {isHomePage && services.length > 4 && (
            <div className="text-center mt-12" data-aos="fade-up">
              <button 
                onClick={handleViewAllServices}
                className="bg-gradient-to-r from-blue-500 to-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-red-600 transition-all duration-300 shadow-lg"
              >
                View All Services
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section - Only show on full services page */}
      {!isHomePage && (
        <section className="relative bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Ready to Start Your Services?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Let's discuss how our expert services can bring your construction vision to life with quality and precision.
              </p>
              <button 
                type="button"
                onClick={handleGetStarted}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ConstructionServices;
