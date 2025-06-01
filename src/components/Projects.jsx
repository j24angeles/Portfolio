import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Code, 
  Layers,
  Zap,
  Star,
  ArrowRight
} from 'lucide-react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Ligaya: Lighting the Way for Child Advocacy",
      description: "A volunteer engagement platform built with UST Volunteers for UNICEF to support SDG 3 and 4.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      techStack: ['React', 'Tailwind CSS', 'DaisyUI', 'Axios', 'Json Server'],
      category: "Frontend",
      featured: true
    },
    {
      id: 2,
      title: "Membership Management Simplified: Admin-Focused System for Mamba MNL",
      description: "Digital system for managing gym memberships, payments, and staff accounts.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      techStack: ['Angular', 'ASP.NET', 'C#', 'HeidiSQL', 'Chart.js', 'DaisyUI', 'Tailwind CSS', 'Node.js', 'Express.js'],
      category: "Full Stack",
      featured: true
    },
    {
      id: 3,
      title: "Forkfolio: Your Digital Recipe Organizer",
      description: "An Android app to organize and preserve Filipino and international recipes.",
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      techStack: ['Kotlin', 'Firebase'],
      category: "Full Stack Mobile Application",
      featured: true
    },
    {
      id: 4,
      title: "PeraMinder: Empowering Filipinos with Financial Clarity",
      description: "A financial tracking app to help students and young professionals manage finances and set goals.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      techStack: ['Angular', 'ASP.NET', 'MaterializeCSS', 'Chart.js', 'HeidiSQL'],
      category: "Full Stack",
      featured: false
    },
    {
      id: 5,
      title: "Sibol: A Product Showcase for Sibol Kakao, an Organic Fertilizer",
      description: "A simple mockup website to showcase the product and its benefits.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      techStack: ['HTML', 'CSS', 'Javascript'],
      category: "Frontend",
      featured: false
    }
  ];

  const handleGitHubClick = () => {
  window.open('https://github.com/j24angeles', '_blank', 'noopener,noreferrer');
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
      'ASP.NET': '#7B6B9D',        // Darker pastel purple
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

  return (
    <section 
      id="projects" 
      className="min-h-screen bg-gray-50 py-16 lg:py-20"
      style={{ fontFamily: 'Roboto, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        
        {/* Header */}
        <div 
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center justify-center mb-6">
            <Code className="w-12 h-12 mr-4" style={{ color: '#011936' }} />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold" style={{ color: '#011936' }}>
              Featured Projects
            </h2>
          </div>
          <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ backgroundColor: '#011936' }}></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Showcasing innovative solutions and technical expertise through carefully crafted applications
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
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
                  <div className="relative overflow-hidden group cursor-pointer" onClick={() => setPreviewImage(project.image)}>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className={`w-full object-cover transition-all duration-300 ${
                        isHovered ? 'h-80' : 'h-64'
                      }`}
                    />
                    
                    {/* Image Overlay */}
                    <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 bg-gray-800/80 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                            {project.category}
                          </span>
                          {project.featured && (
                            <div className="flex items-center space-x-1 px-3 py-1 bg-yellow-600/80 backdrop-blur-sm rounded-full">
                              <Star className="w-3 h-3 text-yellow-300 fill-current" />
                              <span className="text-yellow-300 text-xs font-medium">Featured</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Click to view indicator */}
                      <div className="absolute top-4 right-4">
                        <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                          Click to preview
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold" style={{ color: '#011936' }}>
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-3 flex items-center">
                        <Layers className="w-4 h-4 mr-2" />
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 text-xs font-medium text-white rounded-full transition-all duration-300 hover:scale-105"
                            style={{ backgroundColor: getTechStackColor(tech) }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* View GitHub Button */}
                    <div className={`transform transition-all duration-300 mt-auto ${
                      isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-75'
                    }`}>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-all duration-300 group">
                        <Github className="w-4 h-4" />
                        <span>View on GitHub</span>
                        <ArrowRight className="w-3 h-3 transform transition-transform group-hover:translate-x-1" />
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#011936' }}>
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold" style={{ color: '#011936' }}>4+</h4>
                <p className="text-gray-600">Projects Completed</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#465775' }}>
                  <Layers className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold" style={{ color: '#011936' }}>10+</h4>
                <p className="text-gray-600">Technologies Used</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#6B8CAE' }}>
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold" style={{ color: '#011936' }}>3+</h4>
                <p className="text-gray-600">Years Learning</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#8BADCE' }}>
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold" style={{ color: '#011936' }}>2</h4>
                <p className="text-gray-600">Featured Projects</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div 
          className={`mt-12 text-center transform transition-all duration-1000 delay-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
         <button 
  className="inline-flex items-center space-x-3 px-8 py-4 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
  onClick={handleGitHubClick}
>
  <Github className="w-5 h-5" />
  <span>View All Projects on GitHub</span>
  <ArrowRight className="w-4 h-4" />
</button>
        </div>

        {/* Image Preview Modal */}
        {previewImage && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setPreviewImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img 
                src={previewImage} 
                alt="Project preview"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <button 
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-white/80 text-sm">Click outside to close</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;