import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import ContactSection from "./ContactSection";

// --- Service Detail Page with Backend Images ---
const ServiceDetail = () => {
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [service, setService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ once: true });

    axios
      .get("https://construction-backend-vm2j.onrender.com/api/services")
      .then((res) => {
        setServices(res.data);

        if (id) {
          const clickedService = res.data.find((s) => s._id === id);
          setService(clickedService);
        } else if (res.data.length > 0) {
          setService(res.data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  console.log(service, "services.................................");

  const nextService = () => {
    if (!service) return;
    const currentIndex = services.findIndex((s) => s._id === service._id);
    const nextIndex = (currentIndex + 1) % services.length;
    navigate(`/services/${services[nextIndex]._id}`);
  };

  const prevService = () => {
    if (!service) return;
    const currentIndex = services.findIndex((s) => s._id === service._id);
    const prevIndex = (currentIndex - 1 + services.length) % services.length;
    navigate(`/services/${services[prevIndex]._id}`);
  };

  const goBack = () => navigate("/services");

  if (!service) return null;

  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-14 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      <div className="relative max-w-6xl mx-auto mt-10">
        {/* Back Button */}
        <button
          onClick={goBack}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-8 font-medium text-lg">
          <ArrowLeft className="mr-5 w-5 h-20" /> Back to Services
        </button>

        {/* Service Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Image Gallery */}
          <div
            className="space-y-4"
            data-aos="zoom-in"
            data-aos-duration="1000">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] w-full">
              {/* ✅ Backend Image */}
              <img
                src={`https://construction-backend-vm2j.onrender.com/uploads/${service.images[0]}`}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevService}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg">
                <ChevronLeft className="w-6 h-6 text-blue-600" />
              </button>
              <button
                onClick={nextService}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg">
                <ChevronRight className="w-6 h-6 text-blue-600" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {service.images.map((img, index) => (
                <button
                  key={index} // ✅ index ya filename use karo
                  onClick={() => navigate(`/services/${service._id}`)}
                  className={`flex-shrink-0 rounded-lg overflow-hidden ${
                    service.images[0] === img
                      ? "ring-2 ring-red-600"
                      : "hover:ring-2 hover:ring-gray-300"
                  }`}>
                  <img
                    src={`https://construction-backend-vm2j.onrender.com/uploads/${img}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-16 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div
            className="space-y-6"
            data-aos="fade-up"
            data-aos-duration="1200">
            <h1 className="text-3xl font-bold text-blue-600">
              {service.title}
            </h1>
            <p className="text-lg text-gray-700">{service.text}</p>
            <div className="w-20 h-1 bg-red-600 rounded-full"></div>
            <p className="text-base text-gray-600">{service.paragraph}</p>

            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Key Features
              </h3>
              <ul className="space-y-3">
                {service.features?.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* --- Contact Section --- */}
      <ContactSection />
    </div>
  );
};

export default ServiceDetail;