import React from 'react';
import { 
  Users, 
  Target, 
  Award, 
  Clock, 
  Shield, 
  Star,
  MapPin,
  Car,
  TrendingUp
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const stats = [
    { icon: Car, label: 'Cars Sold', value: '50,000+' },
    { icon: Users, label: 'Happy Customers', value: '45,000+' },
    { icon: Clock, label: 'Years of Experience', value: '15+' },
    { icon: Star, label: 'Customer Rating', value: '4.8/5' }
  ];

  const team = [
    {
      name: 'James Wilson',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'With over 20 years in the automotive industry, James founded AutoDealer to revolutionize the used car buying experience.'
    },
    {
      name: 'Sarah Thompson',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Sarah ensures every car meets our quality standards and that our operations run smoothly.'
    },
    {
      name: 'Michael Brown',
      role: 'Sales Director',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Michael leads our sales team and ensures every customer receives exceptional service.'
    },
    {
      name: 'Emma Davis',
      role: 'Customer Experience Manager',
      image: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Emma is passionate about ensuring every customer has an exceptional experience.'
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'We believe in complete transparency with detailed vehicle histories and honest communication.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Every vehicle undergoes rigorous inspection to ensure it meets our high standards.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Our customers are at the heart of everything we do. We strive to exceed expectations.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We continuously innovate to make car buying easier and more convenient.'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-neutral-900 to-neutral-800 text-white py-20 md:py-24">
        <div className="absolute inset-0 bg-black/40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8">
            About AutoDealer
          </h1>
          <p className="text-xl md:text-2xl mb-8 md:mb-12 max-w-3xl mx-auto text-neutral-200">
            Your trusted partner for quality used cars since 2008. We're committed to providing 
            exceptional vehicles and outstanding customer service.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-primary-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">{stat.value}</div>
                <div className="text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 md:mb-8">Our Story</h2>
              <div className="space-y-6 text-neutral-600 leading-relaxed">
                <p>
                  AutoDealer was founded in 2008 with a simple mission: to make buying used cars 
                  as transparent, trustworthy, and enjoyable as possible. We recognized that the 
                  traditional used car buying experience was often frustrating and filled with uncertainty.
                </p>
                <p>
                  Starting with a single location in London, we've grown to become one of the UK's 
                  most trusted used car retailers. Our success comes from our unwavering commitment 
                  to quality, transparency, and putting our customers first.
                </p>
                <p>
                  Today, we've helped over 50,000 customers find their perfect car, and we continue 
                  to innovate and improve the car buying experience with new technology and expanded services.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <img
                src="https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Car showroom"
                className="rounded-xl shadow-lg"
              />
              <img
                src="https://images.pexels.com/photos/2434627/pexels-photo-2434627.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Happy customers"
                className="rounded-xl shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 md:mb-6">Mission & Vision</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Our mission and vision guide everything we do, from the cars we select to the service we provide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-neutral-50 p-6 md:p-8 rounded-xl">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 md:w-10 md:h-10 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 md:mb-6">Our Mission</h3>
              <p className="text-neutral-600 leading-relaxed">
                To revolutionize the used car buying experience by providing exceptional quality vehicles, 
                transparent pricing, and outstanding customer service that builds lasting relationships and trust.
              </p>
            </div>
            
            <div className="bg-neutral-50 p-6 md:p-8 rounded-xl">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <Star className="w-8 h-8 md:w-10 md:h-10 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 md:mb-6">Our Vision</h3>
              <p className="text-neutral-600 leading-relaxed">
                To be the UK's most trusted and innovative used car retailer, setting new standards for 
                quality, transparency, and customer satisfaction in the automotive industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 md:mb-6">Our Values</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              These core values shape our culture and guide our decisions every day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center bg-white p-6 md:p-8 rounded-xl shadow-sm border border-neutral-200">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 md:w-10 md:h-10 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">{value.title}</h3>
                <p className="text-neutral-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 md:mb-6">Meet Our Team</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Our experienced leadership team is dedicated to delivering exceptional service and 
              driving innovation in the automotive industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-neutral-50 rounded-xl overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-4">{member.role}</p>
                  <p className="text-neutral-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Ready to Find Your Perfect Car?</h2>
          <p className="text-xl mb-8 md:mb-12 opacity-90">
            Join thousands of satisfied customers who have found their ideal vehicle with AutoDealer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <a
              href="/cars"
              className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-neutral-100 transition-colors"
            >
              Browse Cars
            </a>
            <a
              href="/contact"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;