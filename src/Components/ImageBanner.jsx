import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const VideoBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);
  const videoRefs = useRef([]);

  // Updated API URL to match your backend
  const API_URL = "https://construction-backend-vm2j.onrender.com/api/videos";

  // Fetch media from backend
  const fetchMedia = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching media from:", API_URL);
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched media data:", data);
      
      if (data && data.length > 0) {
        setMedia(data);
      } else {
        setMedia([]);
        setError("No media found");
      }
    } catch (err) {
      console.error("Error fetching media:", err);
      setError(err.message || "Failed to fetch media");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  // Auto-play banner
  useEffect(() => {
    if (media.length === 0) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
    }, 8000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [media.length]);

  // Play current video when index changes
  useEffect(() => {
    if (videoRefs.current[currentIndex]) {
      const currentVideo = videoRefs.current[currentIndex];
      if (currentVideo && currentVideo.tagName === "VIDEO") {
        currentVideo.play().catch((err) => {
          console.log("Video autoplay prevented:", err);
        });
      }
    }
  }, [currentIndex]);

  const goToSlide = (index) => setCurrentIndex(index);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const openModal = (index) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalIndex(null);
  };

  // Helper function to construct media URL
  const getMediaUrl = (mediaPath) => {
    if (!mediaPath) return null;
    
    console.log("Processing media path:", mediaPath);
    
    // If it's already a full URL, replace production with localhost URL
    if (mediaPath.startsWith("https://construction-backend-vm2j.onrender.com")) {
      const correctedUrl = mediaPath.replace("https://construction-backend-vm2j.onrender.com", "https://construction-backend-vm2j.onrender.com");
      console.log("Corrected production URL:", correctedUrl);
      return correctedUrl;
    }
    
    if (mediaPath.startsWith("http://") || mediaPath.startsWith("https://")) {
      return mediaPath;
    }
    
    // Remove leading slash if present to avoid double slashes
    const cleanPath = mediaPath.startsWith("/") ? mediaPath.slice(1) : mediaPath;
    
    const finalUrl = `https://construction-backend-vm2j.onrender.com/${cleanPath}`;
    console.log("Constructed URL:", finalUrl);
    return finalUrl;
  };

  // Helper function to check if file is an image
  const isImage = (filename) => {
    if (!filename) return false;
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".svg"];
    return imageExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
  };

  // Helper function to check if file is a video
  const isVideo = (filename) => {
    if (!filename) return false;
    const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv"];
    return videoExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-2xl">Loading media...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center">
          <div className="text-orange-600 text-2xl mb-4">Error loading media</div>
          <div className="text-white">{error}</div>
          <button
            onClick={fetchMedia}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (media.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-2xl">No media available</div>
      </div>
    );
  }

  return (
    <div className="relative w-full mx-auto">
      {/* Banner */}
      <div className="relative w-full h-[75vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden shadow-xl bg-black">
        <div
          className="w-full h-full flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {media.map((item, index) => {
            const mediaSrc = item.videos?.[0] || item.images?.[0]
              ? getMediaUrl(item.videos?.[0] || item.images?.[0])
              : null;

            const isMediaImage = mediaSrc ? isImage(mediaSrc) : false;
            const isMediaVideo = mediaSrc ? isVideo(mediaSrc) : false;

            return (
              <div
                key={item._id || index}
                className="relative min-w-full h-full group cursor-pointer"
                onClick={() => openModal(index)}>
                {mediaSrc ? (
                  <>
                    {isMediaImage && (
                      <img
                        src={mediaSrc}
                        alt={item.title || "Banner image"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error(`Image load error for item ${index}:`, mediaSrc, e);
                          if (e.target.src.includes('localhost:5000')) {
                            const correctedSrc = e.target.src.replace('https://construction-backend-vm2j.onrender.com', 'https://construction-backend-vm2j.onrender.com');
                            e.target.src = correctedSrc;
                          }
                        }}
                      />
                    )}

                    {isMediaVideo && (
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        src={mediaSrc}
                        className="w-full h-full object-cover"
                        autoPlay={index === 0}
                        loop
                        muted
                        playsInline
                        onError={(e) => {
                          console.error(`Video load error for item ${index}:`, mediaSrc, e);
                          if (e.target.src.includes('localhost:5000')) {
                            const correctedSrc = e.target.src.replace('https://construction-backend-vm2j.onrender.com', 'https://construction-backend-vm2j.onrender.com');
                            e.target.src = correctedSrc;
                          }
                        }}
                      />
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <p className="text-white text-xl">No media available</p>
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Text Overlay */}
                {(item.title || item.description) && (
                  <div className="absolute inset-0 flex items-center justify-start z-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                      <div className="max-w-2xl">
                        {item.title && (
                          <h1 className="text-2xl sm:text-4xl md:text-6xl font-semibold text-white mb-2 sm:mb-4 leading-tight">
                            {item.title}
                          </h1>
                        )}
                        {item.description && (
                          <p className="text-sm sm:text-lg md:text-xl text-gray-200 mb-4 sm:mb-8 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                        <button className="px-4 py-2 sm:px-8 sm:py-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm sm:text-base font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg">
                          Get Started
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919900003410?text=Hello%20I%20am%20interested%20in%20your%20services"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-12 right-6 bg-emerald-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 z-50">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>

        {/* Navigation Arrows */}
        {media.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition z-10">
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition z-10">
              <ChevronRight size={28} />
            </button>
          </>
        )}

        {/* Indicators */}
        {media.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {media.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-8 h-2 bg-white shadow-md"
                    : "w-2 h-2 bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && modalIndex !== null && media[modalIndex] && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 border border-white/20 z-10">
            <X size={24} />
          </button>

          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="relative shadow-2xl">
              {(media[modalIndex].videos || media[modalIndex].images || []).map(
                (mediaItem, idx) => {
                  const modalMediaSrc = getMediaUrl(mediaItem);
                  const isModalImage = isImage(modalMediaSrc);
                  const isModalVideo = isVideo(modalMediaSrc);

                  return (
                    <div key={idx} className="mb-4">
                      {isModalImage && (
                        <img
                          src={modalMediaSrc}
                          alt={media[modalIndex].title || `Modal image ${idx + 1}`}
                          className="w-full h-auto max-h-[80vh] object-contain bg-black"
                        />
                      )}

                      {isModalVideo && (
                        <video
                          src={modalMediaSrc}
                          className="w-full h-auto max-h-[80vh] object-contain bg-black"
                          autoPlay
                          loop
                          muted
                          playsInline
                          controls
                        />
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoBanner;