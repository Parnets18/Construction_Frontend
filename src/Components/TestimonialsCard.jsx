import React, { useState, useEffect } from "react";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
import AOS from "aos";
import axios from "axios";

const TestimonialsCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonialsToShow, setTestimonialsToShow] = useState(3);
  const [testimonials, setTestimonials] = useState([]);

  // Fetch testimonials from backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(
          "https://construction-backend-vm2j.onrender.com/api/testimonials/"
        );
        const mappedTestimonials = res.data.map((item) => ({
          id: item._id,
          text: item.paragraph,
          name: item.name,
          role: item.designation,
          rating: item.rating,
          avatar: item.profilePic
            ? `https://construction-backend-vm2j.onrender.com/uploads/testimonials/${item.profilePic}`
            : "https://via.placeholder.com/150",
        }));
        setTestimonials(mappedTestimonials);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };
    fetchTestimonials();
  }, []);

  // Responsive testimonialsToShow
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setTestimonialsToShow(3);
      else if (window.innerWidth >= 768) setTestimonialsToShow(2);
      else setTestimonialsToShow(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Arrow navigation
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + testimonialsToShow >= testimonials.length
        ? 0
        : prevIndex + testimonialsToShow
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? testimonials.length -
          (testimonials.length % testimonialsToShow || testimonialsToShow)
        : prevIndex - testimonialsToShow
    );
  };

  // Looping slice
  const visibleTestimonials = [];
  for (let i = 0; i < testimonialsToShow; i++) {
    if (testimonials.length > 0) {
      visibleTestimonials.push(
        testimonials[(currentIndex + i) % testimonials.length]
      );
    }
  }

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden w-full"
      data-aos="zoom-in-down">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#dc2626] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-blue-700 mb-4 leading-tight">
            What people are saying about{" "}
            <span className="text-[#dc2626]">our work</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light">
            We specialize in a wide range of construction services, including
            residential, commercial, and industrial projects.
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={prevTestimonial}
            className="absolute -left-4 md:-left-8 z-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-3 rounded-full shadow-lg shadow-blue-500/20 hover:shadow-xl hidden md:flex items-center justify-center">
            <HiArrowLeft className="w-6 h-6" />
          </button>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {visibleTestimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 flex flex-col h-full shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all duration-500 border border-white/30 group relative">
                {/* Star Rating */}
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 fill-current ${
                        i < t.rating ? "text-amber-400" : "text-gray-300"
                      }`}
                      viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-600 mb-6 flex-grow italic">
                  "{t.text}"
                </p>
                <hr className="border-gray-200 mb-6" />

                {/* Profile */}
                <div className="flex items-center">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-12 w-12 rounded-full object-cover mr-4 border-2 border-[#dc2626]"
                  />
                  <div>
                    <h4 className="font-medium text-blue-700">{t.name}</h4>
                    <p className="text-gray-600 text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextTestimonial}
            className="absolute -right-4 md:-right-8 z-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-3 rounded-full shadow-lg shadow-blue-500/20 hover:shadow-xl hidden md:flex items-center justify-center">
            <HiArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile arrows */}
        <div className="flex justify-center mt-8 space-x-4 md:hidden">
          <button
            onClick={prevTestimonial}
            className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-3 rounded-full shadow-md hover:shadow-lg shadow-blue-500/20">
            <HiArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextTestimonial}
            className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-3 rounded-full shadow-md hover:shadow-lg shadow-blue-500/20">
            <HiArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCard;
