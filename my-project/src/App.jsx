import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';

// --- Common Components (for all pages) ---
import Navbar from './Components/Common/Navbar';
import Footer from './Components/Common/Footer';

// --- Section Components (for the Home Page) ---
import Swiperimage from './Components/Sections/Swiperimage';
import Swipercard from './Components/Sections/Swipercard';
import Tourpackages from './Components/Sections/Tourpackages';
import Destinations from './Components/Sections/Destinations';
import Reviewcard from './Components/Sections/Reviewcard';
import Contactform from './Components/Sections/Contactform';

// --- Page Components (for routing) ---
import TourDetails from "./Pages/TourDetails";
import KatraTour from "./Pages/KatraTour";
import LadakhTour from "./Pages/LadakhTour";
import HouseBoatTour from "./Pages/HouseBoatTour";
import HoneymoonTour from "./Pages/HoneymoonTour";
import HeavenlyTour from "./Pages/HeavenlyTour";
import Register from './Pages/Register';
import Login from './Pages/Login';
import ScrollToTop from './Components/Common/ScrollToTop';

// --- AOS Imports ---
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true,     // animate only once
      easing: "ease-out",
    });
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <div data-aos="fade-up"><Swiperimage /></div>
              <div data-aos="fade-up"><Swipercard /></div>
              <div id="packages" data-aos="fade-up"><Tourpackages /></div>
              <div id="destinations" data-aos="fade-up"><Destinations /></div>
              <div id="reviews" data-aos="fade-up"><Reviewcard /></div>
              <div id="enquiry" data-aos="fade-up"><Contactform /></div>
            </>
          }
        />

        {/* Tour Pages */}
        <Route path="/tour-details" element={<TourDetails />} />
        <Route path="/tour/:id" element={<TourDetails />} />
        <Route path="/katra-tour" element={<KatraTour />} />
        <Route path="/ladakh-tour" element={<LadakhTour />} />
        <Route path="/houseboat-tour" element={<HouseBoatTour />} />
        <Route path="/honeymoon-tour" element={<HoneymoonTour />} />
        <Route path="/heavenly-tour" element={<HeavenlyTour />} />

        {/* Auth Pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Fallback Route */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;