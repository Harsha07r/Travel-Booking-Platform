import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

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

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Swiperimage />
              <Swipercard />
              <div id="packages"><Tourpackages /></div>
              <div id="destinations"><Destinations /></div>
              <div id="reviews"><Reviewcard /></div>
              <div id="enquiry"><Contactform /></div>
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

        {/* Fallback Route */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
