import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, Car as CarIcon } from 'lucide-react';
import CarCard from '../components/CarCard';
import { mockCars } from '../data/mockData';
import { Car } from '../types';

const WishlistPage: React.FC = () => {
  const [wishlistCars, setWishlistCars] = useState<Car[]>([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const cars = mockCars.filter(car => wishlistIds.includes(car.id));
    setWishlistCars(cars);
  };

  const removeFromWishlist = (carId: string) => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const newWishlist = wishlist.filter((id: string) => id !== carId);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    loadWishlist();
  };

  const clearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      localStorage.setItem('wishlist', JSON.stringify([]));
      setWishlistCars([]);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const totalValue = wishlistCars.reduce((sum, car) => sum + car.price, 0);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">My Wishlist</h1>
              <p className="text-neutral-600">
                {wishlistCars.length} car{wishlistCars.length !== 1 ? 's' : ''} saved
                {wishlistCars.length > 0 && (
                  <span className="ml-2 text-primary-600 font-medium">
                    • Total value: {formatPrice(totalValue)}
                  </span>
                )}
              </p>
            </div>
            {wishlistCars.length > 0 && (
              <button
                onClick={clearWishlist}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Wishlist Content */}
        {wishlistCars.length > 0 ? (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 md:mb-12">
              <div className="bg-white p-4 md:p-6 rounded-lg border border-neutral-200">
                <div className="flex items-center space-x-3">
                  <Heart className="w-8 h-8 text-red-500" />
                  <div>
                    <div className="text-2xl font-bold text-neutral-900">{wishlistCars.length}</div>
                    <div className="text-sm text-neutral-600">Saved Cars</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-lg border border-neutral-200">
                <div className="flex items-center space-x-3">
                  <ShoppingCart className="w-8 h-8 text-primary-600" />
                  <div>
                    <div className="text-2xl font-bold text-neutral-900">{formatPrice(totalValue)}</div>
                    <div className="text-sm text-neutral-600">Total Value</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-lg border border-neutral-200">
                <div className="flex items-center space-x-3">
                  <CarIcon className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-neutral-900">
                      {formatPrice(Math.round(totalValue / wishlistCars.length))}
                    </div>
                    <div className="text-sm text-neutral-600">Average Price</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistCars.map(car => (
                <div key={car.id} className="relative">
                  <CarCard 
                    car={car} 
                    onToggleWishlist={removeFromWishlist}
                    isWishlisted={true}
                  />
                  {/* Remove button overlay */}
                  <button
                    onClick={() => removeFromWishlist(car.id)}
                    className="absolute top-2 left-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 md:mt-12 text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/cars"
                  className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Continue Shopping
                </Link>
                <button
                  onClick={() => alert('Compare feature coming soon!')}
                  className="px-6 py-3 border-2 border-primary-600 text-primary-600 font-medium rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
                >
                  Compare Selected
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16 md:py-24">
            <Heart className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Your wishlist is empty</h3>
            <p className="text-neutral-600 mb-6">
              Start browsing cars and save your favorites to see them here.
            </p>
            <Link
              to="/cars"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              <CarIcon className="w-5 h-5" />
              <span>Browse Cars</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;