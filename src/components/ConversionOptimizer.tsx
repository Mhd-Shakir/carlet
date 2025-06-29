import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Calendar, Calculator, Heart, Share2, Bell, Gift } from 'lucide-react';

interface ConversionOptimizerProps {
  carId?: string;
  carTitle?: string;
  carPrice?: number;
}

const ConversionOptimizer: React.FC<ConversionOptimizerProps> = ({ carId, carTitle, carPrice }) => {
  const [showUrgency, setShowUrgency] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    // Simulate urgency after 30 seconds
    const urgencyTimer = setTimeout(() => setShowUrgency(true), 30000);
    
    // Simulate special offer after 60 seconds
    const offerTimer = setTimeout(() => setShowOffer(true), 60000);
    
    // Simulate view count
    setViewCount(Math.floor(Math.random() * 50) + 20);

    return () => {
      clearTimeout(urgencyTimer);
      clearTimeout(offerTimer);
    };
  }, []);

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed right-6 bottom-6 z-50 space-y-3">
        {/* Call Now Button */}
        <button className="group w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center animate-pulse">
          <Phone className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="absolute right-16 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Call Now: +44 20 1234 5678
          </span>
        </button>

        {/* WhatsApp Button */}
        <button className="group w-14 h-14 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="absolute right-16 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            WhatsApp Chat
          </span>
        </button>

        {/* Book Viewing Button */}
        <button className="group w-14 h-14 bg-gradient-to-r from-deep-red-600 to-coral-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
          <Calendar className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="absolute right-16 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Book Viewing
          </span>
        </button>
      </div>

      {/* Urgency Banner */}
      {showUrgency && carId && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-full shadow-lg animate-slide-up">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-semibold">
              {viewCount} people viewed this car today • 3 inquiries in the last hour
            </span>
          </div>
        </div>
      )}

      {/* Special Offer Modal */}
      {showOffer && carPrice && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-coral-orange-500 to-deep-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Limited Time Offer!</h3>
              <p className="text-gray-600 mb-6">
                Get £500 off this vehicle when you book a test drive today.
              </p>
              <div className="space-y-3">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-deep-red-600 to-coral-orange-500 text-white font-semibold rounded-xl hover:from-deep-red-700 hover:to-coral-orange-600 transition-all duration-200">
                  Claim Offer Now
                </button>
                <button 
                  onClick={() => setShowOffer(false)}
                  className="w-full px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Social Proof Bar */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>47 people viewing cars right now</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span>234 cars added to wishlists today</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>18 test drives booked today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Exit Intent Modal (would be triggered by mouse movement) */}
      {/* This would typically be implemented with a library like react-exit-intent */}
    </>
  );
};

export default ConversionOptimizer;