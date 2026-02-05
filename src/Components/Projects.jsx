import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Calendar, MapPin, Building } from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("https://construction-backend-vm2j.onrender.com/api/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full overflow-x-hidden">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

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

      {/* Projects Grid */}
      <section className="relative bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <div
                  key={project._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.images && project.images.length > 0 
                        ? `https://construction-backend-vm2j.onrender.com/uploads/projects/${project.images[0]}`
                        : "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
                      }
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
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
                        {project.landArea}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.features && project.features.slice(0, 2).map((feature, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                        {project.features && project.features.length > 2 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            +{project.features.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                    
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
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-500 text-lg">No projects available</div>
                <p className="text-gray-400 mt-2">Projects will appear here once they are added.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;