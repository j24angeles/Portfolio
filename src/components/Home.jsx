import React from 'react';
import { Facebook, Instagram, Github, Linkedin } from 'lucide-react';
import icon from '../assets/icon.png'; 

const Home = () => {
  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: Facebook, 
      href: 'https://facebook.com/j24angeles',
      color: 'hover:text-blue-600'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      href: 'https://instagram.com/j24a_',
      color: 'hover:text-pink-600'
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      href: 'https://linkedin.com/in/joaquin-miguel-angeles-050606328',
      color: 'hover:text-blue-700'
    },
    { 
      name: 'GitHub', 
      icon: Github, 
      href: 'https://github.com/j24angeles',
      color: 'hover:text-gray-800'
    }
  ];

  // Function to scroll to projects section
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // CORRECTED function - use direct path to public folder
  const handleDownloadResume = async () => {
    try {
      // Direct path to file in public folder
      const resumeUrl = '/ANGELES_CV.pdf';
      
      // Test if file exists first
      const response = await fetch(resumeUrl);
      if (!response.ok) {
        throw new Error('Resume file not found');
      }
      
      // Create download
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'Joaquin-Angeles_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup
      window.URL.revokeObjectURL(downloadUrl);
      
    } catch (error) {
      console.error('Failed to download resume:', error);
      // Fallback - open in new tab
      window.open('/ANGELES_CV.pdf', '_blank');
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 flex items-center justify-center py-8 sm:py-10 lg:py-4"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center w-full">
          
          {/* Mobile: Image First */}
          <div className="flex justify-center lg:hidden order-1">
            <div className="relative">
              <img 
                src={icon}
                alt="Joaquin" 
                className="w-64 h-80 sm:w-72 sm:h-88 object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
                style={{ objectPosition: 'center top' }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-5 sm:space-y-7 lg:space-y-5 lg:pr-2 order-2 lg:order-1 px-2 sm:px-4 lg:px-0">
            
            {/* Greeting */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-bold leading-tight text-center lg:text-left" style={{ color: '#011936' }}>
                Hello there!
              </h1>
              <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light text-gray-700 text-center lg:text-left">
                <span>I'm </span>
                <span className="font-bold text-black">Joaquin</span>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-4 sm:space-y-5">
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed text-center lg:text-left">
                A <span className="font-semibold" style={{ color: '#011936' }}>student developer</span> passionate about 
turning coffee into code and ideas into digital experiences. I'm constantly learning to craft elegant solutions 
to complex problems and excited to bring creative visions to life.
              </p>
              
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed text-center lg:text-left">
                When I'm not coding, you'll usually find me staying active with sports, experimenting in the kitchen with delicious recipes, 
                playing video games, or just enjoying the little things in life.
              </p>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start pt-2">
              <button 
                onClick={scrollToProjects}
                className="px-6 py-3 sm:px-8 sm:py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                style={{ backgroundColor: '#011936' }}
              >
                View My Work
              </button>
              <button 
                className="px-6 py-3 sm:px-8 sm:py-4 border-2 font-semibold rounded-xl transition-all duration-300 hover:text-white hover:bg-[#011936] hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#011936]/40 text-[#011936] border-[#011936] bg-transparent"
                onClick={handleDownloadResume}
              >
                Download my CV
              </button>
            </div>

            {/* Social Links */}
            <div className="pt-4 sm:pt-6">
              <div className="flex justify-center lg:justify-start space-x-5 sm:space-x-6">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 sm:p-4 rounded-full bg-white hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-gray-600 ${social.color}`}
                      aria-label={social.name}
                      style={{ border: '1px solid #e5e7eb' }}
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Desktop: Image Second - UPDATED SIZES */}
          <div className="hidden lg:flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              <img 
                src={icon}
                alt="Joaquin" 
                className="w-80 h-96 lg:w-96 lg:h-112 xl:w-112 xl:h-128 2xl:w-120 2xl:h-136 object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
                style={{ objectPosition: 'center top' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;