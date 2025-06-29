import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Gauge, 
  Fuel, 
  Settings, 
  Users, 
  Shield, 
  Award,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Car,
  CheckCircle,
  Clock,
  Printer,
  Eye,
  BarChart3,
  Star
} from 'lucide-react';
import { mockCars } from '../data/mockData';
import { Car as CarType } from '../types';
import CarCard from '../components/CarCard';
import TestDriveBooking from '../components/TestDriveBooking';

const CarDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<CarType | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [similarCars, setSimilarCars] = useState<CarType[]>([]);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const foundCar = mockCars.find(c => c.id === id);
      setCar(foundCar || null);
      
      if (foundCar) {
        // Check if car is in wishlist
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setIsWishlisted(wishlist.includes(foundCar.id));
        
        // Find similar cars
        const similar = mockCars
          .filter(c => c.id !== id && (c.make === foundCar.make || c.bodyType === foundCar.bodyType))
          .slice(0, 4);
        setSimilarCars(similar);
      }
    }
  }, [id, navigate]);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Car className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-neutral-900 mb-2">Car not found</h2>
          <p className="text-neutral-600 mb-6">The car you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/cars"
            className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            Browse All Cars
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return mileage.toLocaleString() + ' miles';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: car.title,
        text: `Check out this ${car.title} on AutoDealer`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleWishlistToggle = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    let newWishlist;
    
    if (isWishlisted) {
      newWishlist = wishlist.filter((carId: string) => carId !== car.id);
    } else {
      newWishlist = [...wishlist, car.id];
    }
    
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    setIsWishlisted(!isWishlisted);
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleInquiry = () => {
    alert('Inquiry feature would be implemented here');
  };

  const handleTestDrive = () => {
    setIsTestDriveOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-neutral-600 mb-8">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link to="/cars" className="hover:text-primary-600">Cars</Link>
          <span>/</span>
          <span className="text-neutral-900">{car.make} {car.model}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={car.images[currentImageIndex]}
                  alt={car.title}
                  className="w-full h-96 object-cover cursor-zoom-in"
                  onClick={() => setIsImageModalOpen(true)}
                />
                
                {/* Navigation Arrows */}
                {car.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Zoom Icon */}
                <button
                  onClick={() => setIsImageModalOpen(true)}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {car.images.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {car.images.length > 1 && (
                <div className="p-4 flex space-x-2 overflow-x-auto">
                  {car.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-primary-500' : 'border-neutral-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${car.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Car Details */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 md:p-8 mb-8">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900 mb-4">{car.title}</h1>
                  <div className="flex items-center space-x-4 text-neutral-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{car.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>124 views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Listed 3 days ago</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleWishlistToggle}
                    className={`p-3 rounded-full transition-colors ${
                      isWishlisted ? 'bg-red-500 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-3 bg-neutral-100 text-neutral-600 rounded-full hover:bg-primary-500 hover:text-white transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handlePrint}
                    className="p-3 bg-neutral-100 text-neutral-600 rounded-full hover:bg-primary-500 hover:text-white transition-colors"
                  >
                    <Printer className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Key Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-neutral-50 rounded-lg">
                  <Calendar className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-neutral-900">{car.year}</div>
                  <div className="text-sm text-neutral-600">Year</div>
                </div>
                <div className="text-center p-4 bg-neutral-50 rounded-lg">
                  <Gauge className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-neutral-900">{formatMileage(car.mileage).split(' ')[0]}</div>
                  <div className="text-sm text-neutral-600">Miles</div>
                </div>
                <div className="text-center p-4 bg-neutral-50 rounded-lg">
                  <Fuel className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-neutral-900">{car.fuelType}</div>
                  <div className="text-sm text-neutral-600">Fuel Type</div>
                </div>
                <div className="text-center p-4 bg-neutral-50 rounded-lg">
                  <Settings className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-neutral-900">{car.transmission}</div>
                  <div className="text-sm text-neutral-600">Transmission</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">Description</h2>
                <p className="text-neutral-600 leading-relaxed">{car.description}</p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">Features & Equipment</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Price & Action Card */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 mb-8 sticky top-8">
              <div className="text-center mb-8">
                <div className="text-3xl font-bold text-neutral-900 mb-2">
                  {formatPrice(car.price)}
                </div>
                {car.originalPrice && (
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-lg text-neutral-500 line-through">
                      {formatPrice(car.originalPrice)}
                    </span>
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm font-medium">
                      Save {formatPrice(car.originalPrice - car.price)}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-8">
                <button
                  onClick={handleInquiry}
                  className="w-full px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Make Inquiry
                </button>
                <button 
                  onClick={handleTestDrive}
                  className="w-full px-6 py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-600 hover:text-white transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Schedule Test Drive</span>
                </button>
                <button className="w-full px-6 py-3 bg-neutral-100 text-neutral-700 font-medium rounded-lg hover:bg-neutral-200 transition-colors">
                  Get Financing Quote
                </button>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-neutral-900 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors">
                    Add to Compare
                  </button>
                  <button 
                    onClick={handleWishlistToggle}
                    className="w-full text-left px-3 py-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                  >
                    {isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
                  </button>
                  <button 
                    onClick={handleShare}
                    className="w-full text-left px-3 py-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                  >
                    Share with Friend
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Cars */}
        {similarCars.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-neutral-900 mb-8">Similar Cars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarCars.map(similarCar => (
                <CarCard 
                  key={similarCar.id} 
                  car={similarCar} 
                  requireLogin={false}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={car.images[currentImageIndex]}
              alt={car.title}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              ✕
            </button>
            {car.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Test Drive Booking Modal */}
      <TestDriveBooking
        carId={car.id}
        carTitle={car.title}
        carImage={car.images[0]}
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
      />
    </div>
  );
};

export default CarDetailsPage;