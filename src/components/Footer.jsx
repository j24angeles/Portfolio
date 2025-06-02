import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Facebook,
  Instagram,
  Heart,
  ArrowUp,
  Code,
  Coffee
} from 'lucide-react';

const Footer = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const socialLinks = [
    { 
      icon: Github, 
      href: 'https://github.com/j24angeles', 
      label: 'GitHub',
      color: '#333333',
      hoverColor: '#24292e'
    },
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com/in/joaquin-miguel-angeles-050606328', 
      label: 'LinkedIn',
      color: '#0077B5',
      hoverColor: '#005885'
    },
    { 
      icon: Facebook, 
      href: 'https://facebook.com/j24angeles', 
      label: 'Facebook',
      color: '#1877F2',
      hoverColor: '#166fe5'
    },
    { 
      icon: Instagram, 
      href: 'https://instagram.com/j24a_', 
      label: 'Instagram',
      color: '#E4405F',
      hoverColor: '#d62d4a'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-200" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Main Footer Content */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="text-center">
          {/* Brand */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2" style={{ color: '#011936' }}>
              Joaquin Miguel Angeles
            </h3>
            <div className="w-12 h-0.5 mx-auto mb-3 rounded-full" style={{ backgroundColor: '#011936' }}></div>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              Student developer passionate about full-stack technologies and committed to continuous learning
            </p>
          </div>
          
          {/* Contact Info - Card Layout */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-200">
              <Mail className="w-4 h-4" style={{ color: '#011936' }} />
              <span className="text-sm text-gray-700">joaquinmiguel.ja@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-200">
              <Phone className="w-4 h-4" style={{ color: '#465775' }} />
              <span className="text-sm text-gray-700">+63 915 756 0659</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-200">
              <MapPin className="w-4 h-4" style={{ color: '#6B8CAE' }} />
              <span className="text-sm text-gray-700">Antipolo City, Rizal, Philippines</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              const isHovered = hoveredSocial === index;
              
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="group relative"
                  onMouseEnter={() => setHoveredSocial(index)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <div 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 ${
                      isHovered ? 'shadow-lg' : 'shadow-sm'
                    } border border-gray-100`}
                    style={{ 
                      backgroundColor: isHovered ? social.hoverColor : social.color 
                    }}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                      {social.label}
                    </div>
                  </div>
                </a>
              );
            })}
            
            {/* Back to Top */}
            <div className="ml-2 pl-2 border-l border-gray-200">
              <button
                onClick={scrollToTop}
                className="group"
                aria-label="Back to top"
              >
                <div className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center group-hover:border-gray-300 transition-all duration-300 group-hover:scale-110 bg-gray-50 group-hover:bg-gray-100 shadow-sm group-hover:shadow-md">
                  <ArrowUp className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1.5 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <span>© 2025 Joaquin. Made with</span>
              <Heart className="w-3.5 h-3.5 text-red-500" />
              <span>and</span>
              <Coffee className="w-3.5 h-3.5" style={{ color: '#8B4513' }} />
              <span>in the Philippines</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <Code className="w-3.5 h-3.5 text-gray-600" />
              <span>Built with React</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;