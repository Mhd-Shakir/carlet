import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/carlet_logo.png'
import { 
  Search, 
  Heart, 
  Menu, 
  X, 
  Phone,
  Mail,
  Home,
  Grid3X3,
  Info,
  MessageCircle
} from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load wishlist count
  useEffect(() => {
    const loadWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlistCount(wishlist.length);
    };

    loadWishlistCount();

    // Listen for wishlist updates
    const handleWishlistUpdate = () => {
      loadWishlistCount();
    };

    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      
      const query = searchQuery.toLowerCase().trim();
      
      // Check for make names
      const makes = ['bmw', 'audi', 'mercedes', 'tesla', 'volkswagen', 'toyota', 'honda', 'ford', 'nissan'];
      const foundMake = makes.find(make => query.includes(make));
      if (foundMake) {
        params.append('make', foundMake.charAt(0).toUpperCase() + foundMake.slice(1));
      }
      
      // Check for body types
      if (query.includes('suv')) params.append('bodyType', 'SUV');
      if (query.includes('sedan')) params.append('bodyType', 'Sedan');
      if (query.includes('hatchback')) params.append('bodyType', 'Hatchback');
      if (query.includes('coupe')) params.append('bodyType', 'Coupe');
      if (query.includes('convertible')) params.append('bodyType', 'Convertible');
      
      // Check for fuel types
      if (query.includes('electric')) params.append('fuelType', 'Electric');
      if (query.includes('hybrid')) params.append('fuelType', 'Hybrid');
      if (query.includes('petrol') || query.includes('gasoline')) params.append('fuelType', 'Petrol');
      if (query.includes('diesel')) params.append('fuelType', 'Diesel');
      
      // Check for transmission
      if (query.includes('automatic')) params.append('transmission', 'Automatic');
      if (query.includes('manual')) params.append('transmission', 'Manual');
      
      params.append('search', searchQuery.trim());
      
      navigate(`/cars?${params.toString()}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Top Bar - Hidden on mobile */}
      <div className="hidden md:block bg-charcoal-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-neon-red-400" />
                <a href="tel:+919645846454">+91 9645846454</a>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <Mail className="w-4 h-4 text-neon-red-400" />
                <a href="mailto:carletbytruechoice@gmail.com">carletbytruechoice@gmail.com</a>
              </div>
            </div>
            <div className="text-sm">
              Mon-Sat 9AM-7PM | Sun 10AM-6PM
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Always visible */}
      <header className={`bg-pure-white sticky top-0 z-40 transition-all duration-300 ${
        isScrolled ? 'shadow-xl' : 'shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 md:space-x-4">
              <div>
                <img src={logo} alt="" className='h-10'/>
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-heading font-bold text-charcoal-700">CarLet</span>
                <span className="text-xs text-neon-red-500 uppercase tracking-wide font-semibold">by true choice</span>
              </div>
            </Link>

            {/* Navigation - Desktop only */}
            <nav className="hidden lg:flex items-center space-x-10">
              <Link to="/" className="text-charcoal-700 hover:text-neon-red-500 font-medium transition-colors duration-300 py-2">
                Home
              </Link>
              <Link to="/cars" className="text-charcoal-700 hover:text-neon-red-500 font-medium transition-colors duration-300 py-2">
                Browse Cars
              </Link>
              <Link to="/about" className="text-charcoal-700 hover:text-neon-red-500 font-medium transition-colors duration-300 py-2">
                About
              </Link>
              <Link to="/contact" className="text-charcoal-700 hover:text-neon-red-500 font-medium transition-colors duration-300 py-2">
                Contact
              </Link>
            </nav>

            {/* Search Bar - Desktop only */}
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search cars, make, model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-neon-red-500 focus:border-neon-red-500 outline-none transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-neon-red-500 to-neon-red-600 text-white rounded-lg hover:from-neon-red-600 hover:to-neon-red-700 transition-all duration-300"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-2 md:py-3 text-charcoal-700 hover:text-neon-red-500 hover:bg-neon-red-50 rounded-xl transition-all duration-300 relative"
              >
                <Heart className="w-5 h-5" />
                <span className="hidden lg:inline text-sm font-medium">Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-neon-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 md:p-3 text-charcoal-700 hover:text-neon-red-500 hover:bg-neon-red-50 rounded-xl transition-all duration-300"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden bg-pure-white border-t border-gray-100 shadow-xl">
            <div className="px-4 md:px-6 py-6 space-y-3">
              <Link
                to="/"
                className="flex items-center space-x-3 py-3 px-4 text-charcoal-700 hover:text-neon-red-500 hover:bg-neon-red-50 rounded-xl font-medium transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <Link
                to="/cars"
                className="flex items-center space-x-3 py-3 px-4 text-charcoal-700 hover:text-neon-red-500 hover:bg-neon-red-50 rounded-xl font-medium transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Grid3X3 className="w-5 h-5" />
                <span>Browse Cars</span>
              </Link>
              <Link
                to="/about"
                className="flex items-center space-x-3 py-3 px-4 text-charcoal-700 hover:text-neon-red-500 hover:bg-neon-red-50 rounded-xl font-medium transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="w-5 h-5" />
                <span>About Us</span>
              </Link>
              <Link
                to="/contact"
                className="flex items-center space-x-3 py-3 px-4 text-charcoal-700 hover:text-neon-red-500 hover:bg-neon-red-50 rounded-xl font-medium transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Contact</span>
              </Link>
              
              {/* Mobile Contact Info */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <div className="flex items-center space-x-3 py-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-neon-red-400" />
                  <span>+44 20 1234 5678</span>
                </div>
                <div className="flex items-center space-x-3 py-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-neon-red-400" />
                  <span>info@autodealer.co.uk</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;