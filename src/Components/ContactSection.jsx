import React, { useState, useEffect } from "react";
import { Phone, Mail, CheckCircle, X, Loader, MapPin } from "lucide-react";
import axios from "axios";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    title: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [contactCards, setContactCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Fetch contact cards from admin panel
  useEffect(() => {
    const fetchContactCards = async () => {
      try {
        const response = await axios.get("https://construction-backend-vm2j.onrender.com/api/contactcards");
        setContactCards(response.data);
      } catch (error) {
        console.error("Error fetching contact cards:", error);
        // Fallback to default contact info if API fails
        setContactCards([
          {
            _id: "default-phone",
            phone: "+919900003610",
            email: "info@construction.com",
            address: "9/15, 1st Main, Vyalikaval, Bengaluru, 560003"
          }
        ]);
      }
    };
    fetchContactCards();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Your name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email format is invalid";
    if (
      formData.phone &&
      !/^\+?[1-9]\d{9,14}$/.test(formData.phone.replace(/\s/g, ""))
    )
      newErrors.phone =
        "Phone number must be 10-15 digits (e.g., +919900003011)";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    // Standardize phone format (remove spaces and ensure + at start if not present)
    const updatedValue =
      id === "phone"
        ? value.replace(/\s/g, "").replace(/^(\d+)/, "+$1")
        : value;
    setFormData({ ...formData, [id]: updatedValue });
    if (errors[id]) setErrors({ ...errors, [id]: "" });
  };

  const SuccessPopup = () => (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        showPopup ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowPopup(false)}
      />
      <div
        className={`relative bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl transform transition-all duration-500 ${
          showPopup ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}>
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <X size={20} />
        </button>

        <div className="text-center">
          <div className="mb-4 relative">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full">
              <CheckCircle
                className="text-emerald-500 text-3xl animate-bounce"
                size={32}
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-emerald-200 animate-ping opacity-25"></div>
          </div>
          <h3 className="text-2xl font-medium mb-2 text-emerald-600">Thank You!</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">{popupMessage}</p>
          <button
            onClick={() => setShowPopup(false)}
            className="px-6 py-3 rounded-xl font-semibold bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all duration-300">
            Great!
          </button>
        </div>
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://construction-backend-vm2j.onrender.com/api/contacts",
        formData
      );
      console.log("API Response:", response.data); // Debug
      if (response.status === 200 || response.status === 201) {
        setPopupMessage(
          "Your message has been sent successfully! We'll get back to you within 24 hours."
        );
        setShowPopup(true);
        setFormData({
          title: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setShowPopup(false), 5000);
      } else {
        throw new Error("Server responded with an unexpected status.");
      }
    } catch (error) {
      console.error(
        "Contact form submission error:",
        error.response?.data || error.message
      );
      setPopupMessage(
        "There was an error sending your message. Please try again later or contact us directly."
      );
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden w-full py-8 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-slate-800 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-700 mb-3 sm:mb-4 leading-tight">
              Get in touch that{" "}
              <span className="relative">
                <span className="text-red-600">builds relationships</span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-transparent rounded-full"></div>
              </span>
            </h1>
            <div className="w-16 sm:w-20 h-1 bg-blue-600 rounded-full mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light">
              We're here to answer any questions you may have about our
              construction services.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Contact Cards Section */}
            <div className="w-full lg:w-1/3">
              <div className="space-y-6 h-full">
                {/* Dynamic Contact Cards */}
                {contactCards.map((card, index) => (
                  <div key={card._id} className="space-y-4">
                    {/* Phone Card */}
                    {card.phone && (
                      <div className="group bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-6 border-l-4 border-blue-600 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform">
                        <div className="flex items-center mb-4">
                          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 rounded-full mr-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                            <Phone className="text-white" size={24} />
                          </div>
                          <div>
                            <h3 className="font-bold text-blue-800 text-xl mb-1">
                              Call Support Center 24/7
                            </h3>
                            <p className="text-gray-600 text-sm">Always here to help</p>
                          </div>
                        </div>
                        <div className="text-gray-700 font-semibold text-lg pl-16">
                          <p className="cursor-pointer hover:text-blue-600 transition-colors" 
                             onClick={() => window.location.href = `tel:${card.phone}`}>
                            {card.phone}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Email Card */}
                    {card.email && (
                      <div className="group bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-6 border-l-4 border-blue-600 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform">
                        <div className="flex items-center mb-4">
                          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 rounded-full mr-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                            <Mail className="text-white" size={24} />
                          </div>
                          <div>
                            <h3 className="font-bold text-blue-800 text-xl mb-1">
                              Write To Us
                            </h3>
                            <p className="text-gray-600 text-sm">Quick response guaranteed</p>
                          </div>
                        </div>
                        <div className="text-gray-700 font-semibold text-lg pl-16">
                          <p className="cursor-pointer hover:text-blue-600 break-words transition-colors" 
                             onClick={() => window.location.href = `mailto:${card.email}`}>
                            {card.email}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Address Card */}
                    {card.address && (
                      <div className="group bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-6 border-l-4 border-blue-600 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform">
                        <div className="flex items-center mb-4">
                          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 rounded-full mr-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                            <MapPin className="text-white" size={24} />
                          </div>
                          <div>
                            <h3 className="font-bold text-blue-800 text-xl mb-1">
                              Visit Us
                            </h3>
                            <p className="text-gray-600 text-sm">Come see us in person</p>
                          </div>
                        </div>
                        <div className="text-gray-700 font-semibold pl-16">
                          <p className="whitespace-pre-line">{card.address}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form Section */}
            <div className="w-full lg:w-2/3">
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl p-6 md:p-8 h-full border border-blue-100 hover:shadow-3xl transition-all duration-300 flex flex-col">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6">
                  Get In Touch
                </h2>
                <p className="text-gray-600 mb-8 font-medium">
                  Have a project in mind? We'd love to hear from you.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 transition-all duration-300 ${
                          errors.title
                            ? "border-orange-400 bg-orange-50"
                            : "border-blue-200 focus:border-blue-500"
                        }`}
                        placeholder="Your name"
                        disabled={isLoading}
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-orange-600 animate-pulse">
                          {errors.title}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 transition-all duration-300 ${
                          errors.email
                            ? "border-orange-400 bg-orange-50"
                            : "border-blue-200 focus:border-blue-500"
                        }`}
                        placeholder="your.email@example.com"
                        disabled={isLoading}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-orange-600 animate-pulse">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Subject */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 transition-all duration-300 ${
                          errors.phone
                            ? "border-orange-400 bg-orange-50"
                            : "border-blue-200 focus:border-blue-500"
                        }`}
                        placeholder="+919900003011"
                        disabled={isLoading}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-orange-600 animate-pulse">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-blue-200 focus:border-blue-500 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 transition-all duration-300"
                        placeholder="What is this regarding?"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 transition-all duration-300 resize-none ${
                        errors.message
                          ? "border-orange-400 bg-orange-50"
                          : "border-blue-200 focus:border-blue-500"
                      }`}
                      placeholder="Tell us about your project or inquiry..."
                      disabled={isLoading}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-orange-600 animate-pulse">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Spacer to push button to bottom */}
                  <div className="flex-1"></div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group relative bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative flex items-center justify-center space-x-3">
                        {isLoading ? (
                          <>
                            <Loader
                              className="animate-spin text-lg"
                              size={18}
                            />
                            <span className="text-base font-medium tracking-wide">
                              Sending...
                            </span>
                          </>
                        ) : (
                          <span className="text-base font-medium tracking-wide">
                            Send Message
                          </span>
                        )}
                      </div>
                      <div className="absolute inset-0 rounded-xl bg-white/10 transform scale-0 group-hover:scale-100 transition-transform duration-700 ease-out"></div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SuccessPopup />
    </>
  );
};

export default ContactSection;
