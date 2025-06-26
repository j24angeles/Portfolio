import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Code, 
  Layers,
  Zap,
  Star,
  ArrowRight,
  Eye,
  Camera,
  Monitor,
  Smartphone,
  X,
  ChevronLeft,
  ChevronRight,
  ImageIcon
} from 'lucide-react';
import ligayaImg from '../assets/Ligaya - Home.png';
import sibolImg from '../assets/Sibol - Home.png';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  // Simple placeholder component
  const PlaceholderImage = ({ className, alt, category }) => {
    const getIcon = () => {
      if (category?.includes('Mobile')) return <Smartphone className="w-12 h-12" />;
      if (category?.includes('Frontend')) return <Monitor className="w-12 h-12" />;
      if (category?.includes('Full Stack')) return <Code className="w-12 h-12" />;
      return <ImageIcon className="w-12 h-12" />;
    };

    return (
      <div className={`${className} bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center text-gray-400`}>
        {getIcon()}
        <span className="text-sm mt-2 font-medium text-center">{alt || 'Project Image'}</span>
      </div>
    );
  };

  const projects = [
    {
      id: 1,
      title: "Ligaya: Lighting the Way for Child Advocacy",
      description: "A volunteer engagement platform built with UST Volunteers for UNICEF to support SDG 3 and 4.",
      image: ligayaImg,
      techStack: ['React', 'Tailwind CSS', 'DaisyUI', 'Axios', 'Json Server'],
      category: "Frontend",
      featured: true,
      screenshots: [null, null, null], // Will use placeholders
      features: [
        "Volunteer registration and profile management",
        "Event creation and participation tracking",
        "Real-time notifications for new opportunities",
        "Admin dashboard for managing activities"
      ],
      challenges: "Integrating multiple APIs while maintaining responsive design across devices",
      github: "https://github.com/j24angeles/ligaya-project"
    },
    {
      id: 2,
      title: "Membership Management Simplified: Admin-Focused System for Mamba MNL",
      description: "Digital system for managing gym memberships, payments, and staff accounts.",
      image: null, // Will use placeholder
      techStack: ['Angular', 'ASP.NET MVC', 'C#', 'HeidiSQL', 'Chart.js', 'DaisyUI', 'Tailwind CSS', 'Node.js', 'Express.js'],
      category: "Full Stack",
      featured: true,
      screenshots: [null, null, null], // Will use placeholders
      features: [
        "Member registration and profile management",
        "Payment tracking and billing system",
        "Staff role management and permissions",
        "Analytics dashboard with Chart.js visualizations"
      ],
      challenges: "Implementing secure payment processing and role-based access control",
      github: "https://github.com/j24angeles/mamba-mnl-system"
    },
    {
      id: 3,
      title: "Forkfolio: Your Digital Recipe Organizer",
      description: "An Android app to organize and preserve Filipino and international recipes.",
      image: null, // Will use placeholder
      techStack: ['Kotlin', 'Firebase'],
      category: "Full Stack Mobile Application",
      featured: true,
      screenshots: [null, null, null], // Will use placeholders
      features: [
        "Recipe creation with photo upload",
        "Category-based organization system",
        "Offline access to saved recipes",
        "Share recipes with family and friends"
      ],
      challenges: "Optimizing Firebase queries for offline functionality and image storage",
      github: "https://github.com/j24angeles/forkfolio-app"
    },
    {
      id: 4,
      title: "PeraMinder: Empowering Filipinos with Financial Clarity",
      description: "A financial tracking app to help students and young professionals manage finances and set goals.",
      image: null,
      techStack: ['Angular', 'ASP.NET MVC', 'MaterializeCSS', 'Chart.js', 'HeidiSQL'],
      category: "Full Stack",
      featured: false,
      screenshots: [null, null], // Will use placeholders
      features: [
        "Expense tracking and categorization",
        "Budget planning and goal setting",
        "Financial insights with visual charts",
        "Bill reminders and notifications"
      ],
      challenges: "Creating intuitive data visualization for complex financial data",
      github: "https://github.com/j24angeles/peraminder"
    },
    {
      id: 5,
      title: "Sibol: A Product Showcase for Sibol Kakao, an Organic Fertilizer",
      description: "A simple mockup website to showcase the product and its benefits.",
      image: sibolImg,
      techStack: ['HTML', 'CSS', 'Javascript'],
      category: "Frontend",
      featured: false,
      screenshots: [null, null], // Will use placeholders
      features: [
        "Product information and benefits",
        "Contact form for inquiries",
        "Responsive design for all devices",
        "Clean, modern interface"
      ],
      challenges: "Creating an engaging landing page with vanilla JavaScript",
      github: "https://github.com/j24angeles/sibol-kakao"
    }
  ];

  const handleGitHubClick = () => {
    window.open('https://github.com/j24angeles', '_blank', 'noopener,noreferrer');
  };

  const handleProjectGitHub = (github) => {
    window.open(github, '_blank', 'noopener,noreferrer');
  };

  const getTechStackColor = (tech) => {
    const colors = {
      'React': '#5B7C99',          // Darker pastel blue
      'Angular': '#B85450',        // Darker pastel red
      'Next.js': '#4A4A4A',        // Darker pastel gray
      'Node.js': '#7A8471',        // Darker pastel green
      'Express.js': '#6B6B6B',     // Darker pastel gray
      'MongoDB': '#6B8B6B',        // Darker pastel green
      'HeidiSQL': '#5A7099',       // Darker pastel blue
      'Firebase': '#CC8F66',       // Darker pastel orange
      'ASP.NET MVC': '#7B6B9D',        // Darker pastel purple
      'Chart.js': '#B8728A',       // Darker pastel pink
      'Tailwind CSS': '#5B9B8F',   // Darker pastel teal
      'Axios': '#6B7FCC',          // Darker pastel purple
      'JSON Server': '#7A7A7A',    // Darker pastel gray
      'DaisyUI': '#CC8F66',        // Darker pastel orange
      'Kotlin': '#9B7AB8',         // Darker pastel purple
      'C#': '#8B6B9B',             // Darker pastel purple
      'MaterializeCSS': '#B8728A', // Darker pastel pink
      'HTML': '#B8725A',
      'CSS': '#5A8FB8',
      'JavaScript': '#B8A55A'
    };
    return colors[tech] || '#8A8A8A';
  };

 const ProjectModal = ({ project, onClose }) => {
    const [currentScreenshot, setCurrentScreenshot] = useState(0);
    const [zoomed, setZoomed] = useState(false);

    const nextImage = () => {
      setCurrentScreenshot((prev) => 
        prev === project.screenshots.length - 1 ? 0 : prev + 1
      );
    };

    const prevImage = () => {
      setCurrentScreenshot((prev) => 
        prev === 0 ? project.screenshots.length - 1 : prev - 1
      );
    };

    // Responsive: Use bottom sheet on mobile
    // Use window.innerWidth to determine if mobile
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 640);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Helper to check if current screenshot is a real image
    const isCurrentScreenshotImage = Boolean(project.screenshots[currentScreenshot]);

    return (
      <div className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm transition-all duration-300`}>
        {/* Modal Container */}
        <div
          ref={modalRef}
          className={`bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-3xl md:max-w-4xl lg:max-w-6xl max-h-[95vh] overflow-y-auto flex flex-col relative transition-all duration-300
            ${isMobile ? 'h-[90vh] animate-slideUp' : 'h-auto animate-fadeInModal'}`}
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-1.5 rounded-full bg-white/80 shadow-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none z-20"
            aria-label="Close modal"
            style={{ color: '#011936', fontSize: 20 }}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Modal Header */}
          <div className="sticky top-0 bg-white/95 border-b border-gray-200 px-6 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row sm:justify-between sm:items-start rounded-t-3xl sm:rounded-t-2xl z-10">
            <div className="space-y-2">
              <h2 className="text-lg sm:text-2xl font-bold pr-4 sm:pr-8" style={{ color: '#011936' }}>{project.title}</h2>
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs sm:text-sm font-medium" style={{ color: '#011936' }}>
                  {project.category}
                </span>
                {project.featured && (
                  <div className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 rounded-full">
                    <Star className="w-3 h-3 text-yellow-600 fill-current" />
                    <span className="text-yellow-600 text-xs sm:text-sm font-medium">Featured</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Modal Content */}
          <div className="px-4 sm:px-8 lg:px-14 py-5 sm:py-8 space-y-6 sm:space-y-8 flex-1 overflow-y-auto">
            {/* Screenshot Gallery */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center" style={{ color: '#011936' }}>
                <Camera className="w-5 h-5 mr-2" />
                Screenshots
              </h3>
              <div className="relative">
                {isCurrentScreenshotImage ? (
                  <img 
                    src={project.screenshots[currentScreenshot]} 
                    alt={`${project.title} screenshot ${currentScreenshot + 1}`}
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-xl shadow-md cursor-zoom-in"
                    onClick={() => setZoomed(true)}
                  />
                ) : (
                  <div className="cursor-not-allowed">
                    <PlaceholderImage 
                      className="w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl shadow-md"
                      alt={`${project.title} Screenshot ${currentScreenshot + 1}`}
                      category={project.category}
                    />
                  </div>
                )}
                {/* Navigation Buttons (larger on mobile) */}
                {project.screenshots.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 p-2 sm:p-2.5 rounded-full shadow-lg text-neutral-700/60 hover:text-black/80 bg-white/60 hover:bg-white/80 transition-all duration-200 hover:scale-110 border border-gray-200"
                      style={{ fontSize: isMobile ? 22 : 16, backdropFilter: 'blur(2px)' }}
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 p-2 sm:p-2.5 rounded-full shadow-lg text-neutral-700/60 hover:text-black/80 bg-white/60 hover:bg-white/80 transition-all duration-200 hover:scale-110 border border-gray-200"
                      style={{ fontSize: isMobile ? 22 : 16, backdropFilter: 'blur(2px)' }}
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </>
                )}
                {/* Image Indicators */}
                {project.screenshots.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {project.screenshots.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentScreenshot(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                          currentScreenshot === index 
                            ? 'scale-125' 
                            : 'scale-100 hover:scale-110'
                        }`}
                        style={{ 
                          backgroundColor: currentScreenshot === index ? '#011936' : 'rgba(255,255,255,0.8)'
                        }}
                      />
                    ))}
                  </div>
                )}
                {/* Image Counter */}
                {project.screenshots.length > 1 && (
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-medium text-neutral-700/60 bg-white/60 border border-gray-200" style={{backdropFilter: 'blur(2px)'}}>
                    {currentScreenshot + 1} / {project.screenshots.length}
                  </div>
                )}
                {/* Zoomed Image Modal */}
                {zoomed && isCurrentScreenshotImage && (
                  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeInModal" onClick={() => setZoomed(false)}>
                    <img 
                      src={project.screenshots[currentScreenshot]}
                      alt="Zoomed screenshot"
                      className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl border-4 border-white"
                      onClick={e => e.stopPropagation()}
                    />
                    <button
                      onClick={() => setZoomed(false)}
                      className="absolute top-6 right-6 p-3 rounded-full bg-white/80 shadow-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none"
                      aria-label="Close zoomed image"
                      style={{ color: '#011936', fontSize: 28 }}
                    >
                      <X className="w-7 h-7" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Project Details Grid (stacked on mobile) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {/* Left Column */}
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2" style={{ color: '#011936' }}>Description</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{project.description}</p>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-3" style={{ color: '#011936' }}>Key Features</h3>
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div 
                          className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0"
                          style={{ backgroundColor: '#011936' }}
                        ></div>
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Right Column */}
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center" style={{ color: '#011936' }}>
                    <Layers className="w-4 h-4 mr-2" />
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs font-medium text-white rounded-full"
                        style={{ backgroundColor: getTechStackColor(tech) }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2" style={{ color: '#011936' }}>Challenges</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{project.challenges}</p>
                </div>
                <div className="pt-2">
                  <button 
                    onClick={() => handleProjectGitHub(project.github)}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:opacity-90 shadow-md text-white text-sm sm:text-base bg-[#011936]"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <Github className="w-4 h-4" />
                    <span>View Source Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Animations for modal */}
          <style>{`
            .animate-slideUp {
              animation: slideUpModal 0.35s cubic-bezier(0.4,0,0.2,1);
            }
            @keyframes slideUpModal {
              from { transform: translateY(100%); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            .animate-fadeInModal {
              animation: fadeInModal 0.3s cubic-bezier(0.4,0,0.2,1);
            }
            @keyframes fadeInModal {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="projects" 
      className="min-h-screen bg-gray-50 py-20 lg:py-24"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        
        {/* Header */}
        <div 
          className={`text-center mb-20 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
            <Code className="w-12 h-12" style={{ color: '#011936' }} />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center" style={{ color: '#011936' }}>
              Featured Projects
            </h2>
          </div>
          <div className="w-24 h-1 mx-auto rounded-full mb-8" style={{ backgroundColor: '#011936' }}></div>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Explore my projects through interactive previews, detailed breakdowns, and source code access
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {projects.map((project, index) => {
            const isHovered = hoveredProject === project.id;
            
            return (
              <div
                key={project.id}
                className={`transform transition-all duration-1000 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className={`bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl h-full flex flex-col ${
                  isHovered ? 'scale-102 border-gray-300' : 'scale-100'
                }`}>
                  
                  {/* Project Image */}
                  <div className="relative overflow-hidden group">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className={`w-full h-44 sm:h-80 transition-all duration-300 ${project.title.includes('PeraMinder') ? 'object-contain scale-90' : 'object-cover sm:object-cover object-contain'}`}
                        style={project.title.includes('PeraMinder') ? { transform: 'scale(0.9)', objectFit: 'contain' } : {}}
                      />
                    ) : (
                      <PlaceholderImage 
                        className="w-full h-44 sm:h-80 transition-all duration-300 object-contain"
                        alt={project.title}
                        category={project.category}
                      />
                    )}
                    
                    {/* Image Overlay */}
                    <div className={`absolute inset-0 transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`} style={{ backgroundColor: 'rgba(1, 25, 54, 0.8)' }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button 
                          onClick={() => setSelectedProject(project)}
                          className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="px-3 py-1 bg-gray-800/80 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                              {project.category}
                            </span>
                            {project.featured && (
                              <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-600/80 backdrop-blur-sm rounded-full">
                                <Star className="w-3 h-3 text-yellow-300 fill-current" />
                                <span className="text-yellow-300 text-xs font-medium">Featured</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            {project.category.includes('Mobile') ? (
                              <Smartphone className="w-4 h-4 text-white" />
                            ) : (
                              <Monitor className="w-4 h-4 text-white" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-4 line-clamp-2" style={{ color: '#011936' }}>
                      {project.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-6 flex-1 text-sm line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack Preview */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Layers className="w-5 h-5 text-gray-600" />
                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Tech Stack</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 text-xs font-medium text-white rounded-full transition-all duration-300 hover:scale-105"
                            style={{ backgroundColor: getTechStackColor(tech) }}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-200 rounded-full">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3 mt-auto">
                      <button 
                        onClick={() => setSelectedProject(project)}
                        className="flex items-center justify-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-2 text-white relative overflow-hidden group h-9"
                        style={{ 
                          backgroundColor: '#011936',
                          borderColor: '#011936'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <Eye className="w-4 h-4 relative z-10" />
                        <span className="relative z-10 text-sm">View Details</span>
                      </button>
                      
                      <button 
                        onClick={() => handleProjectGitHub(project.github)}
                        className="flex items-center justify-center rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-2 bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50 group h-9 w-9"
                      >
                        <Github className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors duration-300" />
                      </button>
                    </div>                   
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Stats */}
        <div 
          className={`transform transition-all duration-1000 delay-800 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#011936' }}>
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold" style={{ color: '#011936' }}>5</h4>
                <p className="text-gray-600 text-sm">Projects Completed</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#465775' }}>
                  <Layers className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold" style={{ color: '#011936' }}>12+</h4>
                <p className="text-gray-600 text-sm">Technologies Used</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#6B8CAE' }}>
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold" style={{ color: '#011936' }}>3+</h4>
                <p className="text-gray-600 text-sm">Years Learning</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#8BADCE' }}>
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold" style={{ color: '#011936' }}>5+</h4>
                <p className="text-gray-600 text-sm">Frameworks Known</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div 
          className={`mt-16 text-center transform transition-all duration-1000 delay-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <button 
            className="inline-flex items-center space-x-4 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform bg-[#011936] text-white border-2 border-[#011936] hover:bg-[#011936]/90 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#011936]/40 relative overflow-hidden group"
            onClick={handleGitHubClick}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <Github className="w-5 h-5 relative z-10" />
            <span className="relative z-10">View All Projects on GitHub</span>
            <ArrowRight className="w-4 h-4 relative z-10" />
          </button>
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </div>
    </section>
  );
};

export default Projects;