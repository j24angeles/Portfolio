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
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center">
          {/* Brand */}
          <h3 className="text-lg font-bold mb-2" style={{ color: '#011936' }}>
            Joaquin Miguel Angeles
          </h3>
          <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
            Full-Stack Developer passionate about creating digital experiences
          </p>
          
          {/* Contact Info - Horizontal */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6 text-xs text-gray-600">
            <div className="flex items-center space-x-2">
              <Mail className="w-3 h-3" style={{ color: '#011936' }} />
              <span>joaquinmiguel.ja@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-3 h-3" style={{ color: '#465775' }} />
              <span>+63 915 756 0659</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3 h-3" style={{ color: '#6B8CAE' }} />
              <span>Antipolo City, Rizal, Philippines</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-3 mb-6">
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
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 ${
                      isHovered ? 'shadow-md' : 'shadow-sm'
                    }`}
                    style={{ 
                      backgroundColor: isHovered ? social.hoverColor : social.color 
                    }}
                  >
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {social.label}
                    </div>
                  </div>
                </a>
              );
            })}
            
            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="ml-2 group"
              aria-label="Back to top"
            >
              <div className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center group-hover:border-gray-800 transition-all duration-300 group-hover:scale-110 bg-gray-50 group-hover:bg-gray-100">
                <ArrowUp className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <span>© 2025 Joaquin. Made with</span>
              <Heart className="w-3 h-3 text-red-500" />
              <span>and</span>
              <Coffee className="w-3 h-3" style={{ color: '#8B4513' }} />
              <span>in the Philippines</span>
            </div>
            <div className="flex items-center space-x-1">
              <Code className="w-3 h-3" />
              <span>Built with React</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;