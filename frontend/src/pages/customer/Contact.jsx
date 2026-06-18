import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-primary text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-serif font-bold mb-6">Contact Us</h1>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Form */}
            <div className="bg-white p-10 rounded-sm shadow-xl border border-gray-50">
              <h2 className="text-3xl font-serif font-bold mb-8">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-secondary transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-secondary transition-colors"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Subject</label>
                  <input 
                    type="text" 
                    className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-secondary transition-colors"
                    placeholder="Inquiry about..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Message</label>
                  <textarea 
                    rows="5"
                    className="w-full border border-gray-200 rounded-sm p-3 focus:outline-none focus:border-secondary transition-colors resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button type="submit" className="luxury-button w-full flex items-center justify-center py-4">
                  SEND MESSAGE <Send size={18} className="ml-2" />
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-12 py-10">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-8">Get in Touch</h2>
                <p className="text-gray-500 leading-relaxed mb-10">
                  Whether you're looking for fragrance advice or have a question about your order, our dedicated concierge team is here to assist you with every detail.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-accent p-4 rounded-sm text-secondary mr-6">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Boutique Address</h4>
                    <p className="text-gray-500">123 Mataur Road, Sector 73, Mohali, India</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-accent p-4 rounded-sm text-secondary mr-6">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Phone Number</h4>
                    <p className="text-gray-500">+91 9634420786</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-accent p-4 rounded-sm text-secondary mr-6">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Email Support</h4>
                    <p className="text-gray-500">concierge@sereniaparfums.com</p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <h4 className="font-bold uppercase tracking-widest text-sm mb-4">Follow Our Journey</h4>
                <div className="flex space-x-6 text-gray-400">
                  <a href="#" className="hover:text-secondary transition-colors font-bold uppercase tracking-widest text-xs">Instagram</a>
                  <a href="#" className="hover:text-secondary transition-colors font-bold uppercase tracking-widest text-xs">Facebook</a>
                  <a href="#" className="hover:text-secondary transition-colors font-bold uppercase tracking-widest text-xs">Pinterest</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
