import React, { useEffect } from "react";

import ImageBanner from "./ImageBanner";
import Aboutus from "./Aboutus";
import ConstructionServices from "./ConstructionServices";
import TestimonialsCard from "./TestimonialsCard";
import ContactSection from "./ContactSection";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Banner Section */}
      <section className="relative overflow-hidden">
        <div className="relative z-10 w-full">
          <div className="relative">
            <ImageBanner />
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="flex flex-col">
        {/* About Us Section */}
        <section id="projects" className="bg-gray-50">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <Aboutus />
          </div>
        </section>

        <section id="projects" className="bg-gray-50">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <ConstructionServices isHomePage={true} />
          </div>
        </section>

       {/* Key Features Section */}
         <section className="relative bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl font-semibold mb-6">
              <span className="text-blue-600">Our Key</span> <span className="text-red-600">Features</span>
            </h2>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto">
              Discover what sets us apart in the construction industry through our commitment to excellence and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group" data-aos="fade-up" data-aos-delay="100">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">Expert Craftsmanship</h3>
              <p className="text-base leading-relaxed">
                Our skilled craftsmen bring decades of experience to every project, ensuring superior quality and attention to detail.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group" data-aos="fade-up" data-aos-delay="200">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">Timely Delivery</h3>
              <p className="text-base leading-relaxed">
                We understand the importance of deadlines and consistently deliver projects on time without compromising quality.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group" data-aos="fade-up" data-aos-delay="300">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">Quality Assurance</h3>
              <p className="text-base leading-relaxed">
                Every project undergoes rigorous quality checks to ensure it meets our high standards and client expectations.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group" data-aos="fade-up" data-aos-delay="400">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">Innovation & Technology</h3>
              <p className="text-base leading-relaxed">
                We embrace cutting-edge construction technologies and innovative methods to deliver modern, efficient solutions.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-50 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group" data-aos="fade-up" data-aos-delay="500">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">Client Satisfaction</h3>
              <p className="text-base leading-relaxed">
                Our client-centric approach ensures personalized service and complete satisfaction throughout the project lifecycle.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-50 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group" data-aos="fade-up" data-aos-delay="600">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">Safety First</h3>
              <p className="text-base leading-relaxed">
                We prioritize safety in all our operations, maintaining strict safety protocols to protect our workers and clients.
              </p>
            </div>
          </div>
        </div>
      </section>
        <section id="projects" className="bg-gray-50">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <TestimonialsCard />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
