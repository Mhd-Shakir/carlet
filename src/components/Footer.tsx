import React from "react";
import { Link } from "react-router-dom";
import Contact from "../components/Contact";
import {
  Car,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Clock,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <>
      <Contact />
      <footer className="bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                  <Car className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-bold">
                    AutoDealer
                  </span>
                  <span className="text-xs text-neutral-400 uppercase tracking-wide">
                    Quality Cars
                  </span>
                </div>
              </Link>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Your trusted partner for quality used cars. We offer exceptional
                vehicles, transparent pricing, and outstanding customer service.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <div className="space-y-3">
                <Link
                  to="/cars"
                  className="block text-neutral-300 hover:text-primary-400 transition-colors text-sm"
                >
                  Browse Cars
                </Link>
                <Link
                  to="/sell"
                  className="block text-neutral-300 hover:text-primary-400 transition-colors text-sm"
                >
                  Sell Your Car
                </Link>
                <Link
                  to="/financing"
                  className="block text-neutral-300 hover:text-primary-400 transition-colors text-sm"
                >
                  Car Financing
                </Link>
                <Link
                  to="/about"
                  className="block text-neutral-300 hover:text-primary-400 transition-colors text-sm"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="block text-neutral-300 hover:text-primary-400 transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Services</h3>
              <div className="space-y-3">
                <Link
                  to="/warranty"
                  className="block text-neutral-300 hover:text-primary-400 transition-colors text-sm"
                >
                  Extended Warranty
                </Link>
                <Link
                  to="/insurance"
                  className="block text-neutral-300 hover:text-primary-400 transition-colors text-sm"
                >
                  Car Insurance
                </Link>
                <Link
                  to="/inspection"
                  className="block text-neutral-300 hover:text-primary-400 transition-colors text-sm"
                >
                  Vehicle Inspection
                </Link>
                <Link
                  to="/trade-in"
                  className="block text-neutral-300 hover:text-primary-400 transition-colors text-sm"
                >
                  Trade-In Valuation
                </Link>
                <Link
                  to="/delivery"
                  className="block text-neutral-300 hover:text-primary-400 transition-colors text-sm"
                >
                  Home Delivery
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-neutral-300">
                    <p>123 Auto Street</p>
                    <p>London, SW1A 1AA</p>
                    <p>United Kingdom</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <span className="text-sm text-neutral-300">
                    +44 20 1234 5678
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <span className="text-sm text-neutral-300">
                    info@autodealer.co.uk
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-neutral-300">
                    <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                    <p>Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-neutral-800 mt-12 md:mt-16 pt-8 md:pt-12">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-neutral-400">
                <p>&copy; 2025 AutoDealer. All rights reserved.</p>
              </div>
              <div className="flex items-center space-x-6 text-sm text-neutral-400">
                <Link
                  to="/privacy"
                  className="hover:text-primary-400 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="hover:text-primary-400 transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/cookies"
                  className="hover:text-primary-400 transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
