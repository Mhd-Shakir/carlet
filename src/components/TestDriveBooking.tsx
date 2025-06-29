import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Upload, CheckCircle, X, Car, User, Phone, Mail } from 'lucide-react';

interface TestDriveBookingProps {
  carId?: string;
  carTitle?: string;
  carImage?: string;
  isOpen: boolean;
  onClose: () => void;
}

const TestDriveBooking: React.FC<TestDriveBookingProps> = ({
  carId,
  carTitle = "BMW 3 Series 2023",
  carImage = "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400",
  isOpen,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [driverLicense, setDriverLicense] = useState<File | null>(null);
  const [contactDetails, setContactDetails] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Mock data
  const locations = [
    { id: '1', name: 'London Showroom', address: '123 Auto Street, London SW1A 1AA', distance: '2.3 miles' },
    { id: '2', name: 'Manchester Branch', address: '456 Car Avenue, Manchester M1 1AA', distance: '15.7 miles' },
    { id: '3', name: 'Birmingham Center', address: '789 Motor Road, Birmingham B1 1AA', distance: '8.4 miles' }
  ];

  const timeSlots = [
    '09:00', '09:15', '09:30', '09:45',
    '10:00', '10:15', '10:30', '10:45',
    '11:00', '11:15', '11:30', '11:45',
    '14:00', '14:15', '14:30', '14:45',
    '15:00', '15:15', '15:30', '15:45',
    '16:00', '16:15', '16:30', '16:45'
  ];

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-GB', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        available: Math.random() > 0.3 // 70% chance of availability
      });
    }
    return dates;
  };

  const dates = generateDates();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDriverLicense(file);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Send confirmation email (simulated)
    console.log('Booking confirmed:', {
      carId,
      date: selectedDate,
      time: selectedTime,
      location: selectedLocation,
      contact: contactDetails,
      driverLicense: driverLicense?.name
    });
    
    setIsSubmitting(false);
    setIsCompleted(true);
    
    // Schedule SMS reminders (simulated)
    console.log('SMS reminders scheduled for:', contactDetails.phone);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSelectedDate('');
    setSelectedTime('');
    setSelectedLocation('');
    setDriverLicense(null);
    setContactDetails({ name: '', email: '', phone: '', message: '' });
    setIsCompleted(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-pure-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-charcoal-700 to-charcoal-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-neon-red-500 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold">Book Test Drive</h2>
                <p className="text-gray-300">Step {currentStep} of 3</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex space-x-2 mt-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                  step <= currentStep ? 'bg-neon-red-500' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {isCompleted ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-charcoal-700 mb-4">
                Test Drive Booked Successfully!
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Your test drive has been confirmed. You'll receive an email confirmation and SMS reminders.
              </p>
              <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left max-w-md mx-auto">
                <h4 className="font-semibold text-charcoal-700 mb-3">Booking Details:</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Vehicle:</strong> {carTitle}</p>
                  <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-GB', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
                  <p><strong>Location:</strong> {locations.find(l => l.id === selectedLocation)?.name}</p>
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-neon-red-500 to-neon-red-600 text-white font-semibold rounded-xl hover:from-neon-red-600 hover:to-neon-red-700 transition-all duration-300"
                >
                  Done
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 border-2 border-charcoal-700 text-charcoal-700 font-semibold rounded-xl hover:bg-charcoal-700 hover:text-white transition-all duration-300"
                >
                  Book Another
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Step 1: Vehicle Selection */}
              {currentStep === 1 && (
                <div className="animate-slide-up">
                  <h3 className="text-xl font-heading font-bold text-charcoal-700 mb-6">
                    Vehicle Selection
                  </h3>
                  
                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <div className="flex items-center space-x-4">
                      <img
                        src={carImage}
                        alt={carTitle}
                        className="w-24 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-semibold text-charcoal-700 text-lg">{carTitle}</h4>
                        <p className="text-gray-600">Selected for test drive</p>
                      </div>
                      <div className="ml-auto">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </div>

                  {/* Location Selection */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-charcoal-700 mb-4">Choose Location</h4>
                    <div className="grid gap-4">
                      {locations.map((location) => (
                        <button
                          key={location.id}
                          onClick={() => setSelectedLocation(location.id)}
                          className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                            selectedLocation === location.id
                              ? 'border-neon-red-500 bg-neon-red-50'
                              : 'border-gray-300 hover:border-neon-red-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-semibold text-charcoal-700">{location.name}</h5>
                              <p className="text-gray-600 text-sm">{location.address}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">{location.distance}</p>
                              <MapPin className="w-4 h-4 text-neon-red-500 ml-auto mt-1" />
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setCurrentStep(2)}
                      disabled={!selectedLocation}
                      className="px-8 py-3 bg-gradient-to-r from-neon-red-500 to-neon-red-600 text-white font-semibold rounded-xl hover:from-neon-red-600 hover:to-neon-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue to Date & Time
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time Selection */}
              {currentStep === 2 && (
                <div className="animate-slide-up">
                  <h3 className="text-xl font-heading font-bold text-charcoal-700 mb-6">
                    Select Date & Time
                  </h3>

                  {/* Date Selection */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-charcoal-700 mb-4">Available Dates</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                      {dates.map((date) => (
                        <button
                          key={date.value}
                          onClick={() => date.available && setSelectedDate(date.value)}
                          disabled={!date.available}
                          className={`p-3 rounded-xl border-2 text-center transition-all duration-300 ${
                            selectedDate === date.value
                              ? 'border-neon-red-500 bg-neon-red-50 text-neon-red-700'
                              : date.available
                              ? 'border-gray-300 hover:border-neon-red-300'
                              : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <div className="text-sm font-semibold">{date.label}</div>
                          {!date.available && (
                            <div className="text-xs text-gray-400 mt-1">Unavailable</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <div className="mb-8">
                      <h4 className="font-semibold text-charcoal-700 mb-4">Available Times</h4>
                      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3">
                        {timeSlots.map((time) => {
                          const isAvailable = Math.random() > 0.3; // 70% availability
                          return (
                            <button
                              key={time}
                              onClick={() => isAvailable && setSelectedTime(time)}
                              disabled={!isAvailable}
                              className={`p-3 rounded-xl border-2 text-center transition-all duration-300 ${
                                selectedTime === time
                                  ? 'border-neon-red-500 bg-neon-red-50 text-neon-red-700'
                                  : isAvailable
                                  ? 'border-gray-300 hover:border-neon-red-300'
                                  : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              <Clock className="w-4 h-4 mx-auto mb-1" />
                              <div className="text-sm font-semibold">{time}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-3 border-2 border-charcoal-700 text-charcoal-700 font-semibold rounded-xl hover:bg-charcoal-700 hover:text-white transition-all duration-300"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(3)}
                      disabled={!selectedDate || !selectedTime}
                      className="px-8 py-3 bg-gradient-to-r from-neon-red-500 to-neon-red-600 text-white font-semibold rounded-xl hover:from-neon-red-600 hover:to-neon-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue to Details
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Driver Verification & Contact */}
              {currentStep === 3 && (
                <div className="animate-slide-up">
                  <h3 className="text-xl font-heading font-bold text-charcoal-700 mb-6">
                    Driver Verification & Contact Details
                  </h3>

                  {/* Driver License Upload */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-charcoal-700 mb-4">Upload Driver's License</h4>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-neon-red-300 transition-colors duration-300">
                      {driverLicense ? (
                        <div className="flex items-center justify-center space-x-3">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                          <span className="text-charcoal-700 font-medium">{driverLicense.name}</span>
                          <button
                            onClick={() => setDriverLicense(null)}
                            className="text-neon-red-500 hover:text-neon-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 mb-4">
                            Upload a clear photo of your valid driver's license
                          </p>
                          <label className="inline-block px-6 py-3 bg-gradient-to-r from-neon-red-500 to-neon-red-600 text-white font-semibold rounded-xl hover:from-neon-red-600 hover:to-neon-red-700 transition-all duration-300 cursor-pointer">
                            Choose File
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-charcoal-700 mb-4">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-charcoal-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={contactDetails.name}
                          onChange={(e) => setContactDetails(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-neon-red-500 focus:border-neon-red-500 outline-none transition-all duration-300"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={contactDetails.email}
                          onChange={(e) => setContactDetails(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-neon-red-500 focus:border-neon-red-500 outline-none transition-all duration-300"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={contactDetails.phone}
                          onChange={(e) => setContactDetails(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-neon-red-500 focus:border-neon-red-500 outline-none transition-all duration-300"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-700 mb-2">
                          Special Requirements
                        </label>
                        <textarea
                          value={contactDetails.message}
                          onChange={(e) => setContactDetails(prev => ({ ...prev, message: e.target.value }))}
                          className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-neon-red-500 focus:border-neon-red-500 outline-none transition-all duration-300 resize-none"
                          rows={3}
                          placeholder="Any special requirements or questions?"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SMS Reminder Consent */}
                  <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="sms-consent"
                        className="mt-1 w-4 h-4 text-neon-red-500 border-gray-300 rounded focus:ring-neon-red-500"
                        defaultChecked
                      />
                      <label htmlFor="sms-consent" className="text-sm text-charcoal-700">
                        I consent to receive SMS reminders about my test drive appointment (24 hours and 1 hour before)
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 border-2 border-charcoal-700 text-charcoal-700 font-semibold rounded-xl hover:bg-charcoal-700 hover:text-white transition-all duration-300"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!driverLicense || !contactDetails.name || !contactDetails.email || !contactDetails.phone || isSubmitting}
                      className="px-8 py-3 bg-gradient-to-r from-neon-red-500 to-neon-red-600 text-white font-semibold rounded-xl hover:from-neon-red-600 hover:to-neon-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Booking...</span>
                        </>
                      ) : (
                        <span>Confirm Booking</span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestDriveBooking;