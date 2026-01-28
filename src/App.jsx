import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import About from "./Components/About";
import Projects from "./Components/Projects";
import Services from "./Components/Services";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import ServiceDetail from "./Components/ServiceDetail";
import ProjectDetail from "./Components/ProjectDetail";
import "aos/dist/aos.css";

// Admin Components
import AdminDashboard from "./Components/Admin/AdminDashboard"; // ✅ Updated
import AdminCorousal from "./Components/Admin/AdminCorousal";
import AdminAboutUs from "./Components/Admin/AdminAboutUs";
import AdminVisionMission from "./Components/Admin/AdminVisionMission";
import AdminServices from "./Components/Admin/AdminServices";
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
              <AdminDashboard /> {/* ✅ Use AdminDashboard */}
            </ProtectedRoute>
          }
        >
          <Route path="carousel" element={<AdminCorousal />} />
          <Route path="aboutus" element={<AdminAboutUs />} />
          <Route path="vision-mission" element={<AdminVisionMission />} />
          <Route path="services" element={<AdminServices />} />
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
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contactus" element={<Contact />} />
                <Route path="/services/:id" element={<ServiceDetail />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
