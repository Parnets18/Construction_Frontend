import React, { useEffect } from "react";
import ConstructionServices from "./ConstructionServices";

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80')",
        }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center text-white">
          <h2 className="text-4xl md:text-5xl font-semibold">Our Services</h2>
          <p className="mt-3 text-lg">
            Comprehensive construction solutions for every project.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-3 bg-red-500"></div>
      </section>

      <ConstructionServices isHomePage={false} />
    </>
  );
};

export default Services;
