import { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const MissionVisionValues = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    axios
      .get("http://localhost:5000/api/vision-Mission")
      .then((res) => {
        const updatedCards = res.data.map((item) => ({
          title: item.title,
          paragraph: item.paragraph,
          images: item.images,
        }));
        setCards(updatedCards);
      })
      .catch((err) => console.error("Error fetching cards:", err));
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="relative h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/439416/pexels-photo-439416.jpeg?cs=srgb&dl=pexels-sevenstormphotography-439416.jpg&fm=jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center text-white">
          <h2 className="text-4xl md:text-5xl font-semibold">About Us</h2>
          <p className="mt-3 text-lg max-w-2xl mx-auto">
            Building strong foundations with quality, integrity, and trust.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-red-600"></div>
      </section>

      {/* Company Introduction */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center" data-aos="fade-up">
          <h2 className="text-4xl font-semibold mb-6">
            <span className="text-blue-600">Welcome to</span>{" "}
            <span className="text-red-600">Our Construction Company</span>
          </h2>

          <p className="text-lg leading-relaxed max-w-4xl mx-auto mb-6">
            We are a professionally managed construction company delivering
            reliable, high-quality residential, commercial, and industrial
            projects. Our work reflects precision, durability, and thoughtful
            planning at every stage.
          </p>

          <p className="text-lg leading-relaxed max-w-4xl mx-auto">
            From concept to completion, we manage every detail with strict
            quality control, modern construction practices, and a strong focus
            on client satisfaction.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 className="text-4xl font-semibold mb-6">
              <span className="text-blue-600">Our</span>{" "}
              <span className="text-red-600">Story</span>
            </h2>

            <p className="text-lg leading-relaxed mb-6">
              Our journey began with a simple belief — quality construction
              builds long-lasting trust. What started as a small operation has
              grown into a trusted construction partner for diverse projects.
            </p>

            <p className="text-lg leading-relaxed mb-8">
              Over the years, we have delivered projects that stand strong in
              both structure and design. Our growth is driven by skilled
              professionals, transparent processes, and satisfied clients.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-semibold text-blue-600">500+</div>
                <p className="text-gray-600">Projects Delivered</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-red-600">15+</div>
                <p className="text-gray-600">Years of Experience</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-blue-600">100+</div>
                <p className="text-gray-600">Satisfied Clients</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-red-600">50+</div>
                <p className="text-gray-600">Skilled Professionals</p>
              </div>
            </div>
          </div>

          <div data-aos="fade-left">
            <img
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
              alt="Construction Site"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Vision / Mission / Values - Dynamic */}
      <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-semibold mb-4">
            <span className="text-blue-600">Our</span>{" "}
            <span className="text-red-600">Vision & Values</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The principles that guide our work and define our commitment to
            excellence in construction and development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {card.images?.length > 0 && (
                <img
                  src={`http://localhost:5000/uploads/vision-mission/${card.images[0]}?t=${Date.now()}`}
                  alt={card.title}
                  className="w-full h-52 object-cover rounded-2xl mb-6"
                />
              )}

              <h3 className="text-2xl font-bold text-gray-800 mb-4">{card.title}</h3>
              <p className="text-gray-600 leading-relaxed">{card.paragraph}</p>
            </div>
          ))}
        </div>
      </section>

        {/* Why Choose Us */}
     <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-semibold text-gray-900 mb-4">
                <span className="text-blue-600">Why Choose</span> <span className="text-blue-600">Our</span> <span className="text-red-600">Construction</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We combine expertise, quality materials, and innovative techniques to deliver exceptional construction projects that stand the test of time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">Quality Construction</h3>
                <p className="text-base leading-relaxed">
                  Every project undergoes rigorous quality checks and follows industry best practices to ensure superior construction standards.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">On-Time Delivery</h3>
                <p className="text-base leading-relaxed">
                  We understand the importance of deadlines and consistently deliver projects on schedule without compromising quality.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">Competitive Pricing</h3>
                <p className="text-base leading-relaxed">
                  Get the best value for your investment with transparent pricing and no hidden costs throughout the project lifecycle.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">Expert Team</h3>
                <p className="text-base leading-relaxed">
                  Our skilled professionals bring years of experience and expertise to handle projects of any scale and complexity.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">Safety First</h3>
                <p className="text-base leading-relaxed">
                  We prioritize safety protocols and maintain the highest safety standards to protect our workers and your property.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">24/7 Support</h3>
                <p className="text-base leading-relaxed">
                  Round-the-clock customer support to address your concerns and provide updates throughout the construction process.
                </p>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
};

export default MissionVisionValues;
