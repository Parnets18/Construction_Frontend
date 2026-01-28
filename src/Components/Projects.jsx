import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Calendar, MapPin, Users, Building, Home, Briefcase } from "lucide-react";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);
  }, []);

  const handleGetStarted = () => {
    navigate("/contactus");
    window.scrollTo(0, 0);
  };

  // Sample project data - you can replace with real data from your backend
  const projects = [
    {
      id: 1,
      title: "Luxury Villa Complex",
      category: "residential",
      location: "Bangalore, Karnataka",
      year: "2024",
      area: "15,000 sq ft",
      client: "Private Developer",
      image: "https://img.jamesedition.com/listing_images/2025/12/15/10/24/23/23724b11-3cde-49f9-82af-70113e902424/je/760x470xc.jpg",
      description: "A premium residential complex featuring modern architecture with sustainable design elements.",
      features: ["Smart Home Technology", "Solar Panels", "Rainwater Harvesting", "Landscaped Gardens"]
    },
    {
      id: 2,
      title: "Corporate Office Tower",
      category: "commercial",
      location: "Bangalore, Karnataka",
      year: "2023",
      area: "50,000 sq ft",
      client: "Tech Corporation",
      image: "https://www.shutterstock.com/image-photo/typical-corporate-campus-office-buildings-600nw-2599466111.jpg",
      description: "A state-of-the-art office building with modern amenities and energy-efficient systems.",
      features: ["LEED Certified", "High-Speed Elevators", "Conference Centers", "Parking Facility"]
    },
    {
      id: 3,
      title: "Shopping Mall Complex",
      category: "commercial",
      location: "Bangalore, Karnataka",
      year: "2023",
      area: "80,000 sq ft",
      client: "Retail Group",
      image: "https://img.freepik.com/free-photo/indoor-hotel-view_1417-1566.jpg?semt=ais_hybrid&w=740&q=80",
      description: "A modern shopping destination with retail spaces, food courts, and entertainment zones.",
      features: ["Multi-level Parking", "Food Court", "Entertainment Zone", "Retail Spaces"]
    },
    {
      id: 4,
      title: "Residential Apartments",
      category: "residential",
      location: "Bangalore, Karnataka",
      year: "2024",
      area: "25,000 sq ft",
      client: "Housing Society",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      description: "Modern apartment complex with all amenities for comfortable family living.",
      features: ["Swimming Pool", "Gym", "Children's Play Area", "24/7 Security"]
    },
    {
      id: 5,
      title: "Industrial Warehouse",
      category: "industrial",
      location: "Bangalore, Karnataka",
      year: "2023",
      area: "100,000 sq ft",
      client: "Logistics Company",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      description: "Large-scale industrial facility with modern storage and distribution capabilities.",
      features: ["Loading Docks", "Climate Control", "Security Systems", "Office Spaces"]
    },
    {
      id: 6,
      title: "Educational Institution",
      category: "institutional",
      location: "Bangalore, Karnataka",
      year: "2024",
      area: "40,000 sq ft",
      client: "Educational Trust",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
      description: "Modern educational facility with classrooms, laboratories, and recreational areas.",
      features: ["Smart Classrooms", "Science Labs", "Library", "Sports Facilities"]
    }
  ];

  const categories = [
    { id: "all", name: "All Projects", icon: Building },
    { id: "residential", name: "Residential", icon: Home },
    { id: "commercial", name: "Commercial", icon: Briefcase },
    { id: "industrial", name: "Industrial", icon: Building },
    { id: "institutional", name: "Institutional", icon: Users }
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="relative h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80')",
        }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold">Our Projects</h2>
          <p className="mt-3 text-lg">
            Showcasing excellence in construction and development.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-3 bg-red-500"></div>
      </section>

      {/* Introduction Section */}
      <section className="relative bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-blue-600">Our Portfolio of</span> <span className="text-red-600">Excellence</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
              Over the years, we have successfully completed numerous projects across various sectors. 
              Each project reflects our commitment to quality, innovation, and client satisfaction. 
              From residential complexes to commercial buildings, our diverse portfolio showcases our 
              expertise in delivering exceptional construction solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="relative bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12" data-aos="fade-up">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeFilter === category.id
                      ? "bg-gradient-to-r from-blue-500 to-red-500 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  <IconComponent size={18} />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-blue-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin size={16} className="mr-2 text-red-500" />
                      {project.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={16} className="mr-2 text-blue-500" />
                      {project.year}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Building size={16} className="mr-2 text-red-500" />
                      {project.area}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.features.slice(0, 2).map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                      {project.features.length > 2 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          +{project.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="w-full bg-gradient-to-r from-blue-500 to-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-red-600 transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Ready to Start Your Next Project?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Let's discuss how we can bring your vision to life with our expertise and commitment to excellence.
            </p>
            <button 
              onClick={handleGetStarted}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg">
              Get Started Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;