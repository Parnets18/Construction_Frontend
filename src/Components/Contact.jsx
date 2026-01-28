import { useEffect } from "react";
import ContactSection from "./ContactSection";
import ContactCards from "./ContactCards";

const Contact = () => {
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
            "url('https://t4.ftcdn.net/jpg/04/36/39/29/360_F_436392941_nTkBmmHSocMfO2TopRGhMfDfUJIsVIc9.jpg')",
        }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center text-white">
          <h2 className="text-4xl md:text-5xl font-semibold">Contact Us</h2>
          <p className="mt-3 text-lg">
            Get in touch with our construction experts today.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-3 bg-red-500"></div>
      </section>

      <section>
        <ContactSection />
      </section>
      <section className="pt-16">
        <ContactCards />
      </section>
    </>
  );
};
export default Contact;

// #1E40AF is a dark blue (deep navy blue)
// #ccb28b is a light gold (tan/beige gold color)
