import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  ArrowRight, 
  Shield, 
  Award, 
  Users, 
  CheckCircle,
  Car,
  Clock,
  Zap,
  Globe,
  Calendar
} from 'lucide-react';
import CarCard from '../components/CarCard';
import TestDriveBooking from '../components/TestDriveBooking';
import SkeletonLoader from '../components/SkeletonLoader';
import OfflineIndicator from '../components/OfflineIndicator';
import { mockCars, testimonials } from '../data/mockData';

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);

  const featuredCars = mockCars.filter(car => car.featured).slice(0, 6);
  const latestCars = mockCars.slice(0, 8);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleTestDrive = (car: any) => {
    setSelectedCar(car);
    setIsTestDriveOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-grey">
        <SkeletonLoader type="search-results" />
      </div>
    );
  }

  return (
    <>
      <OfflineIndicator />
      
      <div className="min-h-screen bg-light-grey">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-charcoal-700 via-charcoal-600 to-charcoal-800 text-white py-20 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/40"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1920)'
            }}
          ></div>
          
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #FF3B30 2px, transparent 2px)`,
              backgroundSize: '50px 50px',
              animation: 'float 20s ease-in-out infinite'
            }}></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="animate-slide-up">
                <div className="mb-8 md:mb-12">
                  <div className="flex items-center space-x-3 mb-6 md:mb-8">
                    <Zap className="w-8 h-8 md:w-10 md:h-10 text-neon-red-500" />
                    <span className="inline-block bg-gradient-to-r from-neon-red-500 to-neon-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-base font-bold tracking-wider uppercase shadow-lg">
                      Modern Car Buying
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-8 md:mb-12 leading-tight">
                    <span className="block text-white">Find Your</span>
                    <span className="block bg-gradient-to-r from-neon-red-400 to-neon-red-300 bg-clip-text text-transparent">
                      Perfect Car
                    </span>
                    <span className="block text-white">Today</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300 mb-10 md:mb-12 leading-relaxed max-w-lg">
                    Experience the future of car buying with our mobile-first platform. 
                    Smart search, instant booking, and seamless transactions.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 md:gap-8 mb-12 md:mb-16">
                  <Link
                    to="/cars"
                    className="group inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-neon-red-500 to-neon-red-600 text-white font-bold rounded-xl hover:from-neon-red-600 hover:to-neon-red-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                  >
                    <Globe className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                    Explore Cars
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button
                    onClick={() => handleTestDrive(featuredCars[0])}
                    className="inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-5 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-charcoal-700 transition-all duration-300 backdrop-blur-sm"
                  >
                    <Car className="w-6 h-6 mr-3" />
                    Book Test Drive
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-sm">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                    <span className="font-medium">Verified Dealers</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Award className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                    <span className="font-medium">Best Prices</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-neon-red-400" />
                    <span className="font-medium">Instant Booking</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Zap className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                    <span className="font-medium">Mobile First</span>
                  </div>
                </div>
              </div>

              {/* Stats Panel */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-fade-in">
                <div className="text-center mb-8 md:mb-10">
                  <Globe className="w-12 h-12 md:w-16 md:h-16 text-neon-red-400 mx-auto mb-6" />
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">Why Choose AutoDealer</h3>
                  <p className="text-gray-300 text-lg">Innovation meets excellence</p>
                </div>
                <div className="grid grid-cols-2 gap-8 md:gap-10">
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-neon-red-400 mb-3">50K+</div>
                    <div className="text-gray-300 text-sm font-medium">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-neon-red-400 mb-3">4.9/5</div>
                    <div className="text-gray-300 text-sm font-medium">User Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-neon-red-400 mb-3">24/7</div>
                    <div className="text-gray-300 text-sm font-medium">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-neon-red-400 mb-3">15+</div>
                    <div className="text-gray-300 text-sm font-medium">Years Experience</div>
                  </div>
                </div>
                <div className="mt-8 md:mt-10 p-6 bg-gradient-to-r from-neon-red-500/20 to-neon-red-600/20 rounded-xl border border-neon-red-400/30">
                  <div className="flex items-center justify-center space-x-2 text-neon-red-300">
                    <Award className="w-6 h-6" />
                    <span className="font-semibold text-base md:text-lg">Award-Winning Mobile Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Cars */}
        <section className="py-20 md:py-24 bg-pure-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="flex items-center justify-between mb-16 md:mb-20">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <Star className="w-8 h-8 md:w-10 md:h-10 text-neon-red-500" />
                  <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal-700">Featured Cars</h2>
                </div>
                <p className="text-xl md:text-2xl text-gray-600">
                  Hand-picked vehicles with exceptional value and verified quality.
                </p>
              </div>
              <Link
                to="/cars?featured=true"
                className="hidden md:inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-charcoal-700 to-charcoal-600 text-white font-bold rounded-xl hover:from-charcoal-800 hover:to-charcoal-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span>View All Featured</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {featuredCars.map(car => (
                <CarCard 
                  key={car.id}
                  car={car} 
                  requireLogin={false}
                  onBookTestDrive={handleTestDrive}
                />
              ))}
            </div>

            <div className="text-center mt-12 md:mt-16 md:hidden">
              <Link
                to="/cars?featured=true"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-charcoal-700 to-charcoal-600 text-white font-bold rounded-xl hover:from-charcoal-800 hover:to-charcoal-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span>View All Featured</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 md:py-24 bg-light-grey">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="text-center mb-16 md:mb-20">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Zap className="w-8 h-8 md:w-10 md:h-10 text-neon-red-500" />
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal-700">Modern Car Buying</h2>
              </div>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
                Experience the future of automotive retail with our cutting-edge platform designed for the mobile generation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              <div className="group text-center p-8 md:p-10 bg-pure-white rounded-3xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-neon-red-100 to-neon-red-200 rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Car className="w-10 h-10 md:w-12 md:h-12 text-neon-red-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-heading font-bold mb-4 md:mb-6 text-charcoal-700">Smart Search</h3>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  AI-powered search with progressive filters and real-time results. Find your perfect car in seconds.
                </p>
              </div>

              <div className="group text-center p-8 md:p-10 bg-pure-white rounded-3xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-neon-red-100 to-neon-red-200 rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-10 h-10 md:w-12 md:h-12 text-neon-red-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-heading font-bold mb-4 md:mb-6 text-charcoal-700">Instant Booking</h3>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  Book test drives in 3 simple steps with real-time availability and automated confirmations.
                </p>
              </div>

              <div className="group text-center p-8 md:p-10 bg-pure-white rounded-3xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-neon-red-100 to-neon-red-200 rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 md:w-12 md:h-12 text-neon-red-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-heading font-bold mb-4 md:mb-6 text-charcoal-700">Verified Quality</h3>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  Every vehicle undergoes comprehensive inspection with digital verification and transparent history.
                </p>
              </div>

              <div className="group text-center p-8 md:p-10 bg-pure-white rounded-3xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-neon-red-100 to-neon-red-200 rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-10 h-10 md:w-12 md:h-12 text-neon-red-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-heading font-bold mb-4 md:mb-6 text-charcoal-700">Mobile First</h3>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  Optimized for mobile with offline support, push notifications, and seamless performance on any device.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Cars */}
        <section className="py-20 md:py-24 bg-pure-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="flex items-center justify-between mb-16 md:mb-20">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <Clock className="w-8 h-8 md:w-10 md:h-10 text-neon-red-500" />
                  <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal-700">Latest Arrivals</h2>
                </div>
                <p className="text-xl md:text-2xl text-gray-600">
                  Fresh inventory added weekly. Discover our newest premium vehicles.
                </p>
              </div>
              <Link
                to="/cars"
                className="hidden md:inline-flex items-center space-x-3 px-8 py-4 border-2 border-charcoal-700 text-charcoal-700 font-bold rounded-xl hover:bg-charcoal-700 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                <span>View All Cars</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {latestCars.map(car => (
                <CarCard 
                  key={car.id} 
                  car={car} 
                  requireLogin={false}
                  onBookTestDrive={handleTestDrive}
                />
              ))}
            </div>

            <div className="text-center mt-12 md:mt-16 md:hidden">
              <Link
                to="/cars"
                className="inline-flex items-center space-x-3 px-8 py-4 border-2 border-charcoal-700 text-charcoal-700 font-bold rounded-xl hover:bg-charcoal-700 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                <span>View All Cars</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-20 md:py-24 bg-light-grey">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="text-center mb-16 md:mb-20">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Users className="w-8 h-8 md:w-10 md:h-10 text-neon-red-500" />
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal-700">Customer Stories</h2>
              </div>
              <p className="text-xl md:text-2xl text-gray-600">
                Real experiences from customers who found their perfect car with us.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {testimonials.slice(0, 3).map(testimonial => (
                <div key={testimonial.id} className="bg-pure-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6 md:mb-8">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mr-4 border-4 border-neon-red-200"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-heading font-bold text-charcoal-700 text-lg md:text-xl">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500 font-medium">{testimonial.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 md:w-6 md:h-6 ${
                          i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-3 text-sm font-semibold text-gray-600">Verified Purchase</span>
                  </div>
                  
                  <p className="text-gray-700 mb-6 md:mb-8 leading-relaxed italic text-base md:text-lg">"{testimonial.comment}"</p>
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-sm text-neon-red-600 font-bold">
                      Purchased: {testimonial.purchasedCar}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-24 bg-gradient-to-br from-charcoal-700 via-charcoal-600 to-charcoal-800">
          <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12 text-center text-white">
            <div className="mb-12 md:mb-16">
              <div className="flex items-center justify-center space-x-4 mb-6 md:mb-8">
                <Zap className="w-12 h-12 md:w-16 md:h-16 text-neon-red-400" />
                <h2 className="text-3xl md:text-5xl font-heading font-bold">Ready to Get Started?</h2>
              </div>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Join thousands of satisfied customers who have found their perfect car with our modern platform.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center mb-8 md:mb-12">
              <Link
                to="/cars"
                className="px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-neon-red-500 to-neon-red-600 text-white font-bold rounded-xl hover:from-neon-red-600 hover:to-neon-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Browse Cars
              </Link>
            </div>
            
            <div className="flex items-center justify-center space-x-6 md:space-x-10 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-neon-red-400" />
                <span>Secure & Trusted</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-neon-red-400" />
                <span>Mobile Optimized</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-neon-red-400" />
                <span>Award Winning</span>
              </div>
            </div>
          </div>
        </section>

        {/* Test Drive Booking Modal */}
        <TestDriveBooking
          carId={selectedCar?.id}
          carTitle={selectedCar?.title}
          carImage={selectedCar?.images?.[0]}
          isOpen={isTestDriveOpen}
          onClose={() => setIsTestDriveOpen(false)}
        />
      </div>
    </>
  );
};

export default HomePage;