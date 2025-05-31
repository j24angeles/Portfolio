import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import LOGO from '../assets/LOGO - JM.png'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Smooth scroll function
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      const navbarHeight = 80; // Height of the sticky navbar
      const elementPosition = element.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle navigation click
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    smoothScrollTo(targetId);
    setIsMenuOpen(false); // Close mobile menu
  };

  const navItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About Me', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div 
              className="w-15 h-15 flex items-center justify-center cursor-pointer"
              onClick={(e) => handleNavClick(e, 'home')}
            >
              <img 
                src={LOGO} 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className="relative px-3 py-2 text-base font-medium transition-all duration-300 ease-in-out group cursor-pointer"
                style={{ 
                  color: '#011936',
                  textShadow: 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.textShadow = '0 0 1px currentColor';
                }}
                onMouseLeave={(e) => {
                  e.target.style.textShadow = 'none';
                }}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md transition-colors duration-200 hover:bg-gray-100"
              style={{ color: '#011936' }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 pb-6' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="space-y-2 pt-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className="block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:bg-gray-50 relative group cursor-pointer"
                style={{ 
                  color: '#011936',
                  textShadow: 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.textShadow = '0 0 1px currentColor';
                }}
                onMouseLeave={(e) => {
                  e.target.style.textShadow = 'none';
                }}
              >
                {item.name}
                <span className="absolute bottom-1 left-4 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-8"></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;