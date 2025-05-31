import React, { useState, useEffect } from 'react';
import { GraduationCap, Code, Heart, Zap, Trophy, Coffee, Gamepad2, Users, MapPin, Calendar, Award, BookOpen, Briefcase } from 'lucide-react';

const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedTab, setSelectedTab] = useState('journey');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimeline((prev) => (prev + 1) % timelineItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const timelineItems = [
    {
      year: "2020-2022",
      title: "Our Lady of Peace School",
      subtitle: "Senior High School - STEM Strand",
      achievement: "Graduated With Honors",
      icon: Award,
      color: "#011936",
      description: "Focused on Science, Technology, Engineering, and Mathematics. Built a strong foundation in analytical thinking and problem-solving.",
      location: "Manila, Philippines"
    },
    {
      year: "2022-Present",
      title: "University of Santo Tomas",
      subtitle: "BS Information Technology",
      achievement: "3rd Year Student",
      icon: GraduationCap,
      color: "#465775",
      description: "Specializing in Web and Mobile App Development. Currently maintaining excellent academic standing while building real-world projects.",
      location: "Manila, Philippines"
    }
  ];

  const projectShowcase = [
    {
      title: "Gym Management System",
      description: "Admin dashboard for seamless gym membership management with intuitive user experience",
      icon: Users,
      color: "#465775"
    },
    {
      title: "Financial Tracker App",
      description: "Smart personal finance companion with powerful analytics and budget insights",
      icon: Coffee,
      color: "#465775"
    },
    {
      title: "Product Showcase App",
      description: "Modern e-commerce experience with elegant design and smooth interactions",
      icon: Zap,
      color: "#465775"
    }
  ];

  const tabs = [
    { id: 'journey', label: 'My Journey', icon: Heart },
    { id: 'skills', label: 'What I Do', icon: Code },
    { id: 'passion', label: 'My Passion', icon: Zap }
  ];

  const skills = [
    { name: 'Frontend Development', level: 90, color: '#011936' },
    { name: 'Backend Development', level: 85, color: '#465775' },
    { name: 'UI/UX Design', level: 80, color: '#6B8CAE' },
    { name: 'Mobile Development', level: 75, color: '#8BADCE' }
  ];

  const renderTabContent = () => {
    switch(selectedTab) {
      case 'journey':
        return (
          <div className="space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              I'm a passionate <span className="font-semibold" style={{ color: '#011936' }}>Full-Stack Developer</span> who 
              thrives on creating digital experiences that truly connect with people. There's something magical about 
              building products that not only function beautifully but also make a real difference in users' lives.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              My fascination with technology stems from its incredible pace of evolution. Every day brings new 
              possibilities, and I love being at the forefront of innovation, turning complex problems into 
              elegant, user-friendly solutions.
            </p>
            <div className="mt-8 p-6 bg-gray-50 rounded-xl border-l-4" style={{ borderColor: '#011936' }}>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#011936' }}>
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Currently Building</h4>
                  <p className="text-gray-600 text-sm">Innovative web solutions that make an impact</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              The satisfaction of seeing a function come to life and watching a website transform from concept to 
              reality drives my passion for development.
            </p>
            {skills.map((skill, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{skill.name}</span>
                  <span className="text-sm font-semibold px-3 py-1 rounded-full text-white" style={{ backgroundColor: skill.color }}>
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      backgroundColor: skill.color,
                      width: isVisible ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 200}ms`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'passion':
        return (
          <div className="space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              I'm currently available for <span className="font-semibold" style={{ color: '#011936' }}>freelance web development</span> projects 
              and always excited to collaborate on meaningful work that makes an impact.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              When I'm not immersed in development, you'll find me staying active through sports, 
              unwinding with friends, or diving into the latest games. Balance is key to creativity!
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
              {[
                { icon: Trophy, text: "Sports" },
                { icon: Gamepad2, text: "Gaming" },
                { icon: Coffee, text: "Chilling" },
                { icon: BookOpen, text: "Learning" },
                { icon: Users, text: "Collaborating" },
                { icon: Briefcase, text: "Freelancing" }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white rounded-xl p-5 border-2 border-gray-100 hover:border-opacity-50 transition-all duration-300 hover:-translate-y-2 cursor-pointer group hover:shadow-lg"
                    onMouseEnter={(e) => e.target.style.borderColor = '#011936'}
                    onMouseLeave={(e) => e.target.style.borderColor = ''}
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: '#011936' }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{item.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section 
      id="about" 
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
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#011936' }}>
            About Me
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#011936' }}></div>
        </div>

        {/* Clean Timeline */}
        <div 
          className={`mb-16 transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h3 className="text-3xl font-bold text-center mb-12" style={{ color: '#011936' }}>Educational Journey</h3>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Simple Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-300 rounded-full"></div>
            
            {timelineItems.map((item, index) => {
              const IconComponent = item.icon;
              const isLeft = index % 2 === 0;
              const isActive = activeTimeline === index;
              
              return (
                <div
                  key={index}
                  className={`relative flex items-center mb-12 cursor-pointer transition-all duration-500 ${
                    isLeft ? 'flex-row-reverse' : 'flex-row'
                  }`}
                  onClick={() => setActiveTimeline(index)}
                  onMouseEnter={() => setActiveTimeline(index)}
                >
                  {/* Timeline Node */}
                  <div 
                    className={`absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-10 transition-all duration-500 ${
                      isActive ? 'scale-125 shadow-2xl' : 'scale-100 hover:scale-110'
                    }`}
                    style={{ backgroundColor: item.color }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content Card */}
                  <div className={`w-5/12 ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className={`bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 transition-all duration-500 transform ${
                      isActive ? 'scale-105 shadow-2xl border-opacity-50' : 'scale-100 hover:shadow-xl hover:scale-102'
                    }`}
                    style={isActive ? { borderColor: item.color } : {}}
                    >
                      <div className={`flex items-center mb-3 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                        <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-500">{item.year}</span>
                      </div>
                      
                      <h4 className="text-xl font-bold mb-2" style={{ color: '#011936' }}>{item.title}</h4>
                      <p className="text-gray-700 font-semibold mb-2">{item.subtitle}</p>
                      <div className="flex items-center mb-3">
                        <Award className="w-4 h-4 mr-2" style={{ color: item.color }} />
                        <span className="text-sm font-medium" style={{ color: item.color }}>{item.achievement}</span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="w-3 h-3 mr-1" />
                        {item.location}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column - Tabbed Content */}
          <div 
            className={`transform transition-all duration-1000 delay-400 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
            }`}
          >
            {/* Tab Navigation */}
            <div className="flex space-x-2 mb-8 bg-white rounded-xl p-2 shadow-md">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 flex-1 justify-center ${
                      selectedTab === tab.id 
                        ? 'text-white shadow-md transform scale-105' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                    style={selectedTab === tab.id ? { backgroundColor: '#011936' } : {}}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 min-h-96">
              {renderTabContent()}
            </div>
          </div>

          {/* Right Column - Simplified Project Preview */}
          <div 
            className={`transform transition-all duration-1000 delay-600 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold" style={{ color: '#011936' }}>Project Highlights</h3>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                View More →
              </span>
            </div>
            
            <div className="space-y-4">
              {projectShowcase.map((project, index) => {
                const IconComponent = project.icon;
                const isHovered = hoveredProject === index;
                
                return (
                  <div
                    key={index}
                    className={`bg-white rounded-xl p-6 shadow-md border-2 border-gray-100 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
                      isHovered ? 'scale-102' : 'scale-100'
                    }`}
                    style={isHovered ? { borderColor: project.color } : {}}
                    onMouseEnter={() => setHoveredProject(index)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="flex items-start space-x-4">
                      <div 
                        className={`p-3 rounded-xl transition-all duration-300 ${
                          isHovered ? 'scale-110' : 'scale-100'
                        }`}
                        style={{ backgroundColor: project.color }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-lg font-bold mb-2" style={{ color: '#011936' }}>{project.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
                        
                        {isHovered && (
                          <div className="mt-4 flex items-center text-xs font-medium animate-fadeIn" style={{ color: project.color }}>
                            <span>Learn More</span>
                            <svg className="w-4 h-4 ml-1 transition-transform duration-300 transform translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Call to Action */}
            <div className="mt-8 p-6 bg-white rounded-xl border-2 border-dashed border-gray-300 text-center hover:border-solid transition-all duration-300 cursor-pointer"
                 style={{'--hover-border-color': '#011936'}}
                 onMouseEnter={(e) => e.target.style.borderColor = '#011936'}
                 onMouseLeave={(e) => e.target.style.borderColor = ''}>
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100">
                  <Briefcase className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Ready to Collaborate?</h4>
                  <p className="text-gray-600 text-sm">Let's build something amazing together</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default AboutMe;