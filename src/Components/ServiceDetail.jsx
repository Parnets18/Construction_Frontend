import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { MdSupportAgent } from "react-icons/md";
import axios from "axios";

// --- Contact + Support Section (unchanged) ---
const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/contacts",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200) {
        setSuccess("Message sent successfully!");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setSuccess("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setSuccess("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 px-4 sm:px-6 lg:px-14">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* --- Support Section --- */}
        <div
          className="lg:w-1/3 bg-gray-50 rounded-2xl p-6 sm:p-4 shadow-md hover:scale-105 transition"
          data-aos="fade-right"
          data-aos-duration="1000">
          <div className="text-center lg:text-left mb-6">
            <span className="text-white font-bold text-sm w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-4xl sm:text-5xl mx-auto lg:mx-0">
              <MdSupportAgent />
            </span>
            <h3 className="text-2xl font-bold text-blue-600 mb-2 mt-2">
              Support Center
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              We’re here to help 24/7
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">📞</span>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600">
                  Call Support 24/7
                </h4>
                <p className="text-gray-600 text-sm">+91 990 000 3011</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">✉️</span>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600">Write To Us</h4>
                <p className="text-gray-600 text-sm">
                  info@prithvidevelopers.com
                </p>
              </div>
            </div>

            <img
              src="https://www.shutterstock.com/shutterstock/photos/1837034656/display_1500/stock-photo-photo-of-pretty-young-girl-sit-desktop-pc-hold-pen-write-notepad-wear-glasses-shirt-in-home-office-1837034656.jpg"
              alt="Support team member"
              className="rounded-lg shadow-md mt-6 w-full object-cover"
            />
          </div>
        </div>

        {/* --- Contact Form --- */}
        <div
          className="lg:w-2/3 bg-white rounded-2xl p-6 sm:p-8 shadow-lg"
          data-aos="fade-left"
          data-aos-duration="1000">
          <div className="mb-6 sm:mb-8 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-4">
              Reach out to us
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">
              Have questions about our services? Need a project quote? Fill out
              the form and our team will get back to you soon.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Full Name *"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-red-600 outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email Address *"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-red-600 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-red-600 outline-none"
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-red-600 outline-none"
              />
            </div>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Your Message *"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-red-600 outline-none resize-none"></textarea>

            {success && (
              <p className="text-blue-600 font-semibold">{success}</p>
            )}

            <div className="text-center lg:text-left">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-200 text-sm sm:text-base">
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Service Detail Page with Backend Images ---
const ServiceDetail = () => {
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [service, setService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ once: true });

    axios
      .get("http://localhost:5000/api/services")
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
                src={`http://localhost:5000/uploads/services/${service.images[0]}`}
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
                    src={`http://localhost:5000/uploads/services/${img}`}
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

      {/* --- Contact + Support Section --- */}
      <ContactSection />
    </div>
  );
};

export default ServiceDetail;