import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, MapPin, Users, Building } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactSection from "./ContactSection";

// Mock project data - replace with actual API call
const mockProjects = [
  {
    id: 1,
    title: "Modern Residential Complex",
    description: "A state-of-the-art residential complex featuring modern amenities and sustainable design.",
    location: "Bangalore, Karnataka",
    completionDate: "December 2023",
    projectType: "Residential",
    teamSize: "25+ Professionals",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80"
    ],
    features: [
      "Sustainable building materials",
      "Energy-efficient design",
      "Modern amenities",
      "Green spaces",
      "Smart home technology"
    ],
    details: "This project showcases our commitment to sustainable construction practices while maintaining the highest standards of quality and design. The complex features 150 residential units with modern amenities including a clubhouse, swimming pool, and landscaped gardens."
  },
  {
    id: 2,
    title: "Commercial Office Tower",
    description: "A 20-story commercial office building with cutting-edge architecture and smart building systems.",
    location: "Mumbai, Maharashtra",
    completionDate: "March 2024",
    projectType: "Commercial",
    teamSize: "40+ Professionals",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80"
    ],
    features: [
      "Smart building automation",
      "LEED Gold certification",
      "High-speed elevators",
      "Modern office spaces",
      "Parking facilities"
    ],
    details: "A landmark commercial project that combines functionality with aesthetic appeal. The building features state-of-the-art office spaces, advanced security systems, and sustainable design elements that reduce energy consumption by 30%."
  }
];

const ProjectDetail = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ once: true });
    fetchProjects();
  }, []);

  useEffect(() => {
    if (id && projects.length > 0) {
      const foundProject = projects.find((p) => (p._id || p.id) === id);
      setProject(foundProject || projects[0]);
    } else if (projects.length > 0) {
      setProject(projects[0]);
    }
  }, [id, projects]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("https://construction-backend-vm2j.onrender.com/api/projects");
      const data = await response.json();
      if (data.length === 0) {
        // Fallback to mock data if no projects in backend
        setProjects(mockProjects);
      } else {
        setProjects(data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      // Fallback to mock data on error
      setProjects(mockProjects);
    } finally {
      setLoading(false);
    }
  };

  const nextProject = () => {
    if (!project) return;
    const currentIndex = projects.findIndex((p) => (p._id || p.id) === (project._id || project.id));
    const nextIndex = (currentIndex + 1) % projects.length;
    navigate(`/projects/${projects[nextIndex]._id || projects[nextIndex].id}`);
  };

  const prevProject = () => {
    if (!project) return;
    const currentIndex = projects.findIndex((p) => (p._id || p.id) === (project._id || project.id));
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    navigate(`/projects/${projects[prevIndex]._id || projects[prevIndex].id}`);
  };

  const nextImage = () => {
    if (!project) return;
    const images = project.images || [];
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (!project) return;
    const images = project.images || [];
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goBack = () => navigate("/projects");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!project) return null;

  const images = project.images || [];
  const currentImage = images.length > 0 
    ? (images[currentImageIndex].startsWith('http') 
        ? images[currentImageIndex] 
        : `https://construction-backend-vm2j.onrender.com/uploads/projects/${images[currentImageIndex]}`)
    : "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80";

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
                src={currentImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {images.length > 1 && (
                <>
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
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 rounded-lg overflow-hidden ${
                      currentImageIndex === index
                        ? "ring-2 ring-red-600"
                        : "hover:ring-2 hover:ring-gray-300"
                    }`}>
                    <img
                      src={img.startsWith('http') ? img : `https://construction-backend-vm2j.onrender.com/uploads/projects/${img}`}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-20 h-16 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Project Navigation */}
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={prevProject}
                className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous Project
              </button>
              <button
                onClick={nextProject}
                className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                Next Project
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Project Details */}
          <div
            className="space-y-6"
            data-aos="fade-up"
            data-aos-duration="1200">
            <h1 className="text-3xl font-bold text-blue-600">
              {project.title}
            </h1>
            <p className="text-lg text-gray-700">{project.description}</p>
            <div className="w-20 h-1 bg-red-600 rounded-full"></div>

            {/* Project Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold">{project.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Year</p>
                  <p className="font-semibold">{project.year || project.completionDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Building className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-semibold">{project.category || project.projectType}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">{project.area ? 'Area' : 'Team Size'}</p>
                  <p className="font-semibold">{project.area || project.teamSize}</p>
                </div>
              </div>
            </div>

            <p className="text-base text-gray-600">{project.details || project.description}</p>

            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Key Features
              </h3>
              <ul className="space-y-3">
                {project.features?.map((feature, i) => (
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

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default ProjectDetail;