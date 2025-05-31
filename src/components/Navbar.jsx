import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About Me', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-15 h-15 flex items-center justify-center">
              <img 
                src="/src/assets/LOGO - JM.png" 
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
                className="relative px-3 py-2 text-base font-medium transition-all duration-300 ease-in-out group"
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
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:bg-gray-50 relative group"
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