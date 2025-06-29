import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, Gauge, MapPin, Fuel, Car as CarIcon } from 'lucide-react';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
  onToggleWishlist?: (carId: string) => void;
  isWishlisted?: boolean;
  requireLogin?: boolean;
  onBookTestDrive?: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ 
  car, 
  onToggleWishlist, 
  isWishlisted: propIsWishlisted,
  requireLogin = false,
  onBookTestDrive
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Load wishlist status from localStorage
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsWishlisted(wishlist.includes(car.id));
  }, [car.id]);

  // Update when prop changes
  useEffect(() => {
    if (propIsWishlisted !== undefined) {
      setIsWishlisted(propIsWishlisted);
    }
  }, [propIsWishlisted]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking heart
    e.stopPropagation();

    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    let newWishlist;
    
    if (isWishlisted) {
      newWishlist = wishlist.filter((id: string) => id !== car.id);
    } else {
      newWishlist = [...wishlist, car.id];
    }
    
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    setIsWishlisted(!isWishlisted);
    
    // Trigger a custom event to update header wishlist count
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
    
    if (onToggleWishlist) {
      onToggleWishlist(car.id);
    }
  };

  const handleBookTestDrive = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onBookTestDrive) {
      onBookTestDrive(car);
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg border border-neutral-200 hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 h-full flex flex-col group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container - Fixed Height */}
      <div className="relative h-56">
        <Link to={`/cars/${car.id}`}>
          <img
            src={car.images[0]}
            alt={car.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4 bg-white/95 rounded-xl px-4 py-2 shadow-lg">
          <div className="text-lg font-bold text-neutral-900">
            {formatPrice(car.price)}
          </div>
        </div>

        {/* Featured Badge */}
        {car.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-neon-red-500 to-neon-red-600 text-white px-3 py-2 rounded-lg text-sm font-bold shadow-lg">
            Featured
          </div>
        )}

        {/* Hover Overlay with Book Test Drive Button */}
        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <button
            onClick={handleBookTestDrive}
            className="px-6 py-3 bg-gradient-to-r from-neon-red-500 to-neon-red-600 text-white font-semibold rounded-xl hover:from-neon-red-600 hover:to-neon-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
          >
            <Calendar className="w-5 h-5" />
            <span>Book Test Drive</span>
          </button>
          {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-4 right-4 p-3 rounded-full transition-all shadow-lg ${
            isWishlisted
              ? 'bg-red-500 text-white'
              : 'bg-white/90 text-neutral-600 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
        </div>
      </div>

      {/* Content - Flexible Height */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title and Location - Fixed Height */}
        <div className="mb-4 h-20 flex flex-col justify-between">
          <Link to={`/cars/${car.id}`}>
            <h3 className="font-bold text-lg text-neutral-900 hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
              {car.title}
            </h3>
          </Link>
          <div className="flex items-center text-sm text-neutral-500 mt-2">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{car.location}</span>
          </div>
        </div>

        {/* Key Details - Fixed Height */}
        <div className="grid grid-cols-3 gap-2 mb-4 h-20">
          <div className="text-center p-3 bg-neutral-50 rounded-xl flex flex-col justify-center">
            <Calendar className="w-5 h-5 text-primary-600 mx-auto mb-1" />
            <div className="font-bold text-neutral-900 text-sm">{car.year}</div>
            <div className="text-xs text-neutral-500">Year</div>
          </div>
          <div className="text-center p-3 bg-neutral-50 rounded-xl flex flex-col justify-center">
            <Gauge className="w-5 h-5 text-primary-600 mx-auto mb-1" />
            <div className="font-bold text-neutral-900 text-sm">
              {`${Math.round(car.mileage / 1000)}k`}
            </div>
            <div className="text-xs text-neutral-500">Miles</div>
          </div>
          <div className="text-center p-3 bg-neutral-50 rounded-xl flex flex-col justify-center">
            <Fuel className="w-5 h-5 text-primary-600 mx-auto mb-1" />
            <div className="font-bold text-neutral-900 text-xs leading-tight">{car.fuelType}</div>
            <div className="text-xs text-neutral-500">Fuel</div>
          </div>
        </div>

        {/* Features - Fixed Height */}
        <div className="mb-4 h-8 flex items-center">
          <div className="flex flex-wrap gap-1 w-full">
            {car.features.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-lg font-medium truncate max-w-20"
              >
                {feature}
              </span>
            ))}
            {car.features.length > 2 && (
              <span className="text-xs text-primary-600 px-2 py-1 font-medium">
                +{car.features.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Action Button - Fixed at Bottom */}
        <div className="mt-auto">
          <Link
            to={`/cars/${car.id}`}
            className="w-full block text-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;