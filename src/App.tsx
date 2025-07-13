import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';
import CarDetailsPage from './pages/CarDetailsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import WishlistPage from './pages/WishlistPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <ErrorBoundary>
      
      <Router>
      <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-light-grey">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cars" element={<CarsPage />} />
              <Route path="/cars/:id" element={<CarDetailsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              {/* Placeholder routes for other pages */}
              <Route path="/sell" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Sell Your Car - Coming Soon</h1></div>} />
              <Route path="/financing" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Financing - Coming Soon</h1></div>} />
              <Route path="/insurance" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Insurance - Coming Soon</h1></div>} />
              <Route path="/services" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Services - Coming Soon</h1></div>} />
              <Route path="/blog" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Blog - Coming Soon</h1></div>} />
              <Route path="/faq" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">FAQ - Coming Soon</h1></div>} />
              <Route path="/support" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Support - Coming Soon</h1></div>} />
              <Route path="/warranty" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Warranty - Coming Soon</h1></div>} />
              <Route path="/privacy" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Privacy Policy - Coming Soon</h1></div>} />
              <Route path="/terms" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Terms & Conditions - Coming Soon</h1></div>} />
              <Route path="/compare" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Compare Cars - Coming Soon</h1></div>} />
              <Route path="/login" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Login - Coming Soon</h1></div>} />
              <Route path="/register" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Register - Coming Soon</h1></div>} />
              <Route path="/dashboard" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Dashboard - Coming Soon</h1></div>} />
              <Route path="/profile" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Profile - Coming Soon</h1></div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;