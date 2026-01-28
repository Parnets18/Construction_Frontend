import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, MapPin, Users, Building } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { MdSupportAgent } from "react-icons/md";
import axios from "axios";

// --- Contact + Support Section ---
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
              We're here to help 24/7
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
              Interested in This Project?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">
              Want to know more about this project or discuss a similar one? Fill out
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email Address *"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Your Message *"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>

            {success && (
              <p className="text-green-600 font-semibold">{success}</p>
            )}

            <div className="text-center lg:text-left">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-red-500 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-red-600 transition duration-200 text-sm sm:text-base">
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Project Detail Page ---
const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample project data - replace with your backend data
  const projects = [
    {
      id: 1,
      title: "Luxury Villa Complex",
      category: "residential",
      location: "Bangalore, Karnataka",
      year: "2024",
      area: "15,000 sq ft",
      client: "Private Developer",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=800&q=80"
      ],
      description: "A premium residential complex featuring modern architecture with sustainable design elements and luxury amenities for comfortable family living.",
      fullDescription: "This luxury villa complex represents the pinnacle of modern residential design, combining contemporary architecture with sustainable living practices. The project spans 15,000 square feet and features state-of-the-art amenities including smart home technology, solar energy systems, and beautifully landscaped gardens. Each villa is designed with spacious interiors, premium finishes, and energy-efficient systems that reduce environmental impact while maximizing comfort.",
      features: ["Smart Home Technology", "Solar Panels", "Rainwater Harvesting", "Landscaped Gardens", "Swimming Pool", "Gym & Fitness Center", "Children's Play Area", "24/7 Security"],
      specifications: {
        "Total Area": "15,000 sq ft",
        "Number of Units": "12 Villas",
        "Bedrooms": "3-4 BHK",
        "Parking": "2 Cars per Villa",
        "Green Rating": "LEED Gold Certified"
      }
    },
    {
      id: 2,
      title: "Corporate Office Tower",
      category: "commercial",
      location: "Mumbai, Maharashtra",
      year: "2023",
      area: "50,000 sq ft",
      client: "Tech Corporation",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80"
      ],
      description: "A state-of-the-art office building with modern amenities and energy-efficient systems designed for the future of work.",
      fullDescription: "This corporate office tower stands as a testament to modern commercial architecture, designed to meet the evolving needs of today's businesses. The 50,000 square foot facility features cutting-edge technology infrastructure, flexible workspace designs, and sustainable building practices. With LEED certification and advanced HVAC systems, the building provides an optimal work environment while minimizing environmental impact.",
      features: ["LEED Certified", "High-Speed Elevators", "Conference Centers", "Parking Facility", "Cafeteria", "Rooftop Garden", "Advanced Security Systems", "Fiber Optic Infrastructure"],
      specifications: {
        "Total Area": "50,000 sq ft",
        "Floors": "15 Floors",
        "Capacity": "500+ Employees",
        "Parking Spaces": "200 Cars",
        "Green Rating": "LEED Platinum"
      }
    }
  ];

  const [currentProject, setCurrentProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    AOS.init({ once: true });
    
    // Find project by ID
    const project = projects.find(p => p.id === parseInt(id));
    setCurrentProject(project);
    setCurrentImageIndex(0);
  }, [id]);

  const nextProject = () => {
    if (!currentProject) return;
    const currentIndex = projects.findIndex(p => p.id === currentProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    navigate(`/projects/${projects[nextIndex].id}`);
  };

  const prevProject = () => {
    if (!currentProject) return;
    const currentIndex = projects.findIndex(p => p.id === currentProject.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    navigate(`/projects/${projects[prevIndex].id}`);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      (prev + 1) % currentProject.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      (prev - 1 + currentProject.images.length) % currentProject.images.length
    );
  };

  const goBack = () => navigate("/projects");

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Not Found</h2>
          <button 
            onClick={goBack}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-14 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      <div className="relative max-w-6xl mx-auto mt-10">
        {/* Back Button */}
        <button
          onClick={goBack}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-8 font-medium text-lg">
          <ArrowLeft className="mr-2 w-5 h-5" /> Back to Projects
        </button>

        {/* Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Image Gallery */}
          <div
            className="space-y-4"
            data-aos="zoom-in"
            data-aos-duration="1000">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] w-full">
              <img
                src={currentProject.images[currentImageIndex]}
                alt={currentProject.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg">
                <ChevronLeft className="w-6 h-6 text-blue-600" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg">
                <ChevronRight className="w-6 h-6 text-blue-600" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {currentProject.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 rounded-lg overflow-hidden ${
                    currentImageIndex === index
                      ? "ring-2 ring-blue-500"
                      : "hover:ring-2 hover:ring-gray-300"
                  }`}>
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-16 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div
            className="space-y-6"
            data-aos="fade-up"
            data-aos-duration="1200">
            <div>
              <span className="bg-gradient-to-r from-blue-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {currentProject.category.charAt(0).toUpperCase() + currentProject.category.slice(1)}
              </span>
              <h1 className="text-3xl font-bold text-gray-800 mt-4">
                {currentProject.title}
              </h1>
            </div>

            {/* Project Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-2 text-red-500" />
                <span className="text-sm">{currentProject.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar size={18} className="mr-2 text-blue-500" />
                <span className="text-sm">{currentProject.year}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Building size={18} className="mr-2 text-red-500" />
                <span className="text-sm">{currentProject.area}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users size={18} className="mr-2 text-blue-500" />
                <span className="text-sm">{currentProject.client}</span>
              </div>
            </div>

            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-red-500 rounded-full"></div>
            
            <p className="text-lg text-gray-700">{currentProject.fullDescription}</p>

            {/* Key Features */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Key Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentProject.features.map((feature, i) => (
                  <div key={i} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-red-500 rounded-full mr-3"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Project Specifications
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                {Object.entries(currentProject.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0">
                    <span className="font-medium text-gray-700">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={prevProject}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                Previous Project
              </button>
              <button
                onClick={nextProject}
                className="flex-1 bg-gradient-to-r from-blue-500 to-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-red-600 transition-colors">
                Next Project
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default ProjectDetail;