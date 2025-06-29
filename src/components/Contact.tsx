import React from "react";
import {
  Phone,
  Mail,
  MessageCircle,
 
} from "lucide-react";
import Map from '../components/Map'

const ContactPage: React.FC = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our expert team",
      contact: "+91 9645846454",
      action: "tel:+919645846454",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us a detailed message",
      contact: "carletbytruechoice@gmail.com",
      action: "mailto:carletbytruechoice@gmail.com",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with us in real-time",
      contact: "Available 9 AM - 7 PM",
      action: "#",
    },
  ];

  

  return (
    <div className="min-h-screen bg-neutral-50">

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

          <Map />
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
