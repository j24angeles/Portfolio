import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import LOGO from '../assets/LOGO - JM.png'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = React.useRef();
  const menuRef = React.useRef();

  // Trap focus inside menu when open
  React.useEffect(() => {
    if (!isMenuOpen) return;
    const focusableSelectors = 'a, button';
    const menu = menuRef.current;
    if (!menu) return;
    const focusableEls = menu.querySelectorAll(focusableSelectors);
    if (focusableEls.length) focusableEls[0].focus();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
      if (e.key === 'Tab') {
        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    menu.addEventListener('keydown', handleKeyDown);
    return () => menu.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

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

  // Download CV logic (copied from Home)
  const handleDownloadResume = async () => {
    try {
      const resumeUrl = '/ANGELES_CV.pdf';
      const response = await fetch(resumeUrl);
      if (!response.ok) throw new Error('Resume file not found');
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'Joaquin-Angeles_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Failed to download resume:', error);
      window.open('/ANGELES_CV.pdf', '_blank');
    }
  };

  const navItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About Me', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
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
            <button
              onClick={handleDownloadResume}
              className="ml-4 px-5 py-2 border-2 font-semibold rounded-xl transition-all duration-300 hover:text-white hover:bg-[#011936] hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#011936]/40 text-[#011936] border-[#011936] bg-transparent text-base"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Download CV
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              ref={menuButtonRef}
              onClick={toggleMenu}
              className="p-2 rounded-md transition-colors duration-200 hover:bg-gray-100"
              style={{ color: '#011936' }}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu-overlay"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Fullscreen Overlay */}
        {isMenuOpen && (
          <div
            id="mobile-menu-overlay"
            ref={menuRef}
            tabIndex={-1}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-lg transition-all duration-300 animate-fadeIn"
            style={{ fontFamily: 'Poppins, sans-serif' }}
            aria-modal="true"
            role="dialog"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/80 shadow-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none"
              aria-label="Close menu"
              style={{ color: '#011936', fontSize: 28, zIndex: 1001 }}
              autoFocus
            >
              <X className="w-8 h-8" />
            </button>
            {/* Nav Links */}
            <nav className="flex flex-col items-center space-y-8 mt-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="text-2xl sm:text-3xl font-medium text-[#011936] transition-colors duration-200 hover:text-[#1e335c] focus:outline-none focus:underline"
                  tabIndex={0}
                  style={{ letterSpacing: 1 }}
                >
                  {item.name}
                </a>
              ))}
            </nav>
            {/* Download CV Button at Bottom */}
            <div className="absolute bottom-10 left-0 w-full flex justify-center">
              <button
                onClick={handleDownloadResume}
                className="px-8 py-4 border-2 font-medium rounded-xl transition-all duration-300 hover:text-white hover:bg-[#011936] hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#011936]/40 text-[#011936] border-[#011936] bg-transparent text-lg shadow-md"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Download CV
              </button>
            </div>
            {/* Overlay Animation */}
            <style>{`
              .animate-fadeIn {
                animation: fadeInMenu 0.3s cubic-bezier(0.4,0,0.2,1);
              }
              @keyframes fadeInMenu {
                from { opacity: 0; transform: translateY(-30px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;