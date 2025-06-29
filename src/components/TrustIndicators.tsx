import React from 'react';
import { Shield, Award, Users, CheckCircle, Star, Clock, Phone, MapPin } from 'lucide-react';

const TrustIndicators: React.FC = () => {
  const trustBadges = [
    {
      icon: Shield,
      title: 'AA Approved Dealer',
      description: 'Certified by the Automobile Association'
    },
    {
      icon: Award,
      title: 'Trading Standards Approved',
      description: 'Government approved business'
    },
    {
      icon: Users,
      title: '50,000+ Happy Customers',
      description: 'Trusted by thousands since 2008'
    },
    {
      icon: CheckCircle,
      title: 'Money Back Guarantee',
      description: '14-day return policy'
    }
  ];

  const certifications = [
    'FCA Regulated',
    'VOSA Approved',
    'RAC Warranty',
    'HPI Clear Guarantee',
    'GDPR Compliant',
    'Secure Payment Processing'
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {trustBadges.map((badge, index) => (
            <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-deep-red-100 to-coral-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <badge.icon className="w-6 h-6 text-deep-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{badge.title}</h3>
              <p className="text-xs text-gray-600">{badge.description}</p>
            </div>
          ))}
        </div>

        {/* Customer Reviews Summary */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-deep-red-600">4.9</div>
                <div className="flex items-center justify-center space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="text-sm text-gray-600">2,847 reviews</div>
              </div>
              <div className="border-l border-gray-200 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">What customers say:</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>"Exceptional service and quality cars"</div>
                  <div>"Transparent pricing, no hidden fees"</div>
                  <div>"Professional and trustworthy team"</div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-2">Verified by</div>
              <div className="flex items-center space-x-2">
                <img src="/api/placeholder/80/30" alt="Trustpilot" className="h-6" />
                <img src="/api/placeholder/80/30" alt="Google Reviews" className="h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Certified & Regulated</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 font-medium"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Trust Elements */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100">
            <Phone className="w-5 h-5 text-coral-orange-500" />
            <div>
              <div className="font-medium text-gray-900">Speak to an Expert</div>
              <div className="text-sm text-gray-600">+44 20 1234 5678</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100">
            <MapPin className="w-5 h-5 text-coral-orange-500" />
            <div>
              <div className="font-medium text-gray-900">Visit Our Showroom</div>
              <div className="text-sm text-gray-600">London, Manchester, Birmingham</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100">
            <Clock className="w-5 h-5 text-coral-orange-500" />
            <div>
              <div className="font-medium text-gray-900">Open 7 Days</div>
              <div className="text-sm text-gray-600">Mon-Sat 9AM-7PM, Sun 10AM-6PM</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;