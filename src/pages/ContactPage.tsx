import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Car,
  Users,
  Shield,
  Award,
} from "lucide-react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      inquiryType: "general",
    });
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our expert team",
      contact: "+44 20 1234 5678",
      action: "tel:+442012345678",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us a detailed message",
      contact: "info@autodealer.co.uk",
      action: "mailto:info@autodealer.co.uk",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with us in real-time",
      contact: "Available 9 AM - 7 PM",
      action: "#",
    },
  ];

  const departments = [
    {
      icon: Car,
      title: "Sales Department",
      description: "Questions about our vehicles and pricing",
      email: "sales@autodealer.co.uk",
      phone: "+44 20 1234 5679",
    },
    {
      icon: Users,
      title: "Customer Service",
      description: "General inquiries and support",
      email: "support@autodealer.co.uk",
      phone: "+44 20 1234 5680",
    },
    {
      icon: Shield,
      title: "After Sales",
      description: "Warranty and post-purchase support",
      email: "aftersales@autodealer.co.uk",
      phone: "+44 20 1234 5681",
    },
    {
      icon: Award,
      title: "Finance Department",
      description: "Financing options and applications",
      email: "finance@autodealer.co.uk",
      phone: "+44 20 1234 5682",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-neutral-900 to-neutral-800 text-white py-20 md:py-24">
        <div className="absolute inset-0 bg-black/40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1920)",
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8">
            Contact AutoDealer
          </h1>
          <p className="text-xl md:text-2xl mb-8 md:mb-12 max-w-3xl mx-auto text-neutral-200">
            Get in touch with our expert team. We're here to help you find your
            perfect car or answer any questions you may have.
          </p>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 md:mb-6">
              Get In Touch
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Choose the contact method that works best for you. Our team is
              ready to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                className="group bg-neutral-50 p-6 md:p-8 rounded-xl text-center hover:bg-primary-50 hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <method.icon className="w-8 h-8 md:w-10 md:h-10 text-primary-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                  {method.title}
                </h3>
                <p className="text-neutral-600 mb-4">{method.description}</p>
                <p className="text-primary-600 font-medium">{method.contact}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6 md:mb-8">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="+44 20 1234 5678"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="inquiryType"
                      className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="sales">Sales Question</option>
                      <option value="financing">Financing</option>
                      <option value="service">After Sales Service</option>
                      <option value="complaint">Complaint</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Departments */}
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6 md:mb-8">
                  Contact Departments
                </h2>
                <div className="space-y-6">
                  {departments.map((dept, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <dept.icon className="w-6 h-6 md:w-8 md:h-8 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-2">
                          {dept.title}
                        </h3>
                        <p className="text-neutral-600 text-sm mb-3">
                          {dept.description}
                        </p>
                        <div className="space-y-1 text-sm">
                          <a
                            href={`mailto:${dept.email}`}
                            className="text-primary-600 hover:underline block"
                          >
                            {dept.email}
                          </a>
                          <a
                            href={`tel:${dept.phone.replace(/\s/g, "")}`}
                            className="text-primary-600 hover:underline block"
                          >
                            {dept.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6 md:mb-8">
                  Business Hours
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-neutral-100">
                    <span className="text-neutral-600">Monday - Friday</span>
                    <span className="font-medium text-neutral-900">
                      9:00 AM - 7:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-neutral-100">
                    <span className="text-neutral-600">Saturday</span>
                    <span className="font-medium text-neutral-900">
                      9:00 AM - 7:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-neutral-600">Sunday</span>
                    <span className="font-medium text-neutral-900">
                      10:00 AM - 6:00 PM
                    </span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-primary-50 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-primary-600" />
                    <span className="text-sm font-medium text-primary-800">
                      Extended Hours Available
                    </span>
                  </div>
                  <p className="text-sm text-primary-700 mt-2">
                    We offer extended hours by appointment for your convenience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 md:mb-6">
              Visit Our Showroom
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Come see our quality vehicles in person at our convenient London
              location.
            </p>
          </div>

          <div className="bg-neutral-50 rounded-xl p-6 md:p-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <MapPin className="w-6 h-6 md:w-8 md:h-8 text-primary-600" />
              <h3 className="text-xl md:text-2xl font-semibold text-neutral-900">
                AutoDealer Showroom
              </h3>
            </div>
            <div className="space-y-3 text-neutral-600">
              <p>123 Auto Street, London, SW1A 1AA</p>
              <p>United Kingdom</p>
              <div className="flex items-center justify-center space-x-6 mt-6">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-neutral-400" />
                  <span>+44 20 1234 5678</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-neutral-400" />
                  <span>info@autodealer.co.uk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
