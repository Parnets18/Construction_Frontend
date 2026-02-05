import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import About from "./Components/About";
import Projects from "./Components/Projects";
import Services from "./Components/Services";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import "aos/dist/aos.css";

// Admin Components
import AdminPanel from "./Components/Admin/AdminPanel"; // ✅ Updated to use AdminPanel
import AdminBanner from "./Components/Admin/AdminBanner";
import AdminAboutUs from "./Components/Admin/AdminAboutUs";
import AdminVisionMission from "./Components/Admin/AdminVisionMission";
import AdminServices from "./Components/Admin/AdminServices";
import AdminProjects from "./Components/Admin/AdminProjects";
import AdminTestimonial from "./Components/Admin/AdminTestimonial";
import AdminContactCard from "./Components/Admin/AdminContactCard";
import AdminContactPanel from "./Components/Admin/AdminContactPanel";
import AdminLogin from "./Components/Admin/AdminLogin";

// ProtectedRoute import
import ProtectedRoute from "./Components/ProtectedRoute";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminPanel /> {/* ✅ Use AdminPanel */}
            </ProtectedRoute>
          }
        >
          <Route path="banner" element={<AdminBanner />} />
          <Route path="aboutus" element={<AdminAboutUs />} />
          <Route path="vision-mission" element={<AdminVisionMission />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="testimonials" element={<AdminTestimonial />} />
          <Route path="contactcards" element={<AdminContactCard />} />
          <Route path="contact-form" element={<AdminContactPanel />} />
        </Route>

        {/* Public Website Routes */}
        <Route
          path="*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contactus" element={<Contact />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
