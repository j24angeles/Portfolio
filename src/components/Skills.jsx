import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Server, 
  Database, 
  MessageCircle, 
  Users, 
  Shield, 
  Zap,
  Monitor,
  Globe,
  FileText,
  Layers,
  Terminal,
  HardDrive,
  Heart,
  Lightbulb,
  Clock,
  Target,
  BookOpen,
  Puzzle,
  TrendingUp,
  Eye,
  CheckCircle,
  Compass
} from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      icon: Code,
      color: '#011936',
      skills: [
        { name: 'React', icon: Code, level: 'Advanced', description: 'Component-based UI development' },
        { name: 'Angular', icon: Layers, level: 'Intermediate', description: 'Enterprise-grade applications' },
        { name: 'Next.js', icon: Globe, level: 'Beginner', description: 'Full-stack React framework' },
        { name: 'JavaScript', icon: FileText, level: 'Advanced', description: 'Modern ES6+ development' },
        { name: 'HTML/CSS', icon: Monitor, level: 'Advanced', description: 'Semantic markup & styling' }
      ]
    },
    backend: {
      title: 'Backend Development',
      icon: Server,
      color: '#465775',
      skills: [
        { name: 'ASP.NET', icon: Server, level: 'Advanced', description: 'Microsoft web framework' },
        { name: 'Node.js', icon: Terminal, level: 'Intermediate', description: 'JavaScript server runtime' },
        { name: 'Express.js', icon: Zap, level: 'Beginner', description: 'Fast web framework' },
        { name: 'JSON Server', icon: Database, level: 'Advanced', description: 'REST API prototyping' }
      ]
    },
    database: {
      title: 'Database Management',
      icon: Database,
      color: '#6B8CAE',
      skills: [
        { name: 'MySQL/HeidiSQL', icon: Database, level: 'Advanced', description: 'Relational database management' },
        { name: 'MongoDB', icon: HardDrive, level: 'Beginner', description: 'NoSQL document database' },
        { name: 'Firebase', icon: Zap, level: 'Intermediate', description: 'Real-time cloud database' },
        { name: 'Supabase', icon: Globe, level: 'Beginner', description: 'Open-source Firebase alternative' }
      ]
    },
    soft: {
      title: 'Soft Skills',
      icon: Heart,
      color: '#8BADCE',
      skills: [
        { name: 'Communication', icon: MessageCircle, level: 'Expert', description: 'Clear and effective dialogue' },
        { name: 'Team Collaboration', icon: Users, level: 'Expert', description: 'Seamless team integration' },
        { name: 'Integrity & Honesty', icon: Shield, level: 'Expert', description: 'Ethical and transparent approach' },
        { name: 'Problem Solving', icon: Puzzle, level: 'Advanced', description: 'Creative solution development' },
        { name: 'Time Management', icon: Clock, level: 'Advanced', description: 'Efficient task prioritization' },
        { name: 'Adaptability', icon: TrendingUp, level: 'Advanced', description: 'Flexible to changing requirements' },
        { name: 'Continuous Learning', icon: BookOpen, level: 'Expert', description: 'Always seeking growth opportunities' },
        { name: 'Attention to Detail', icon: Target, level: 'Advanced', description: 'Meticulous code quality focus' },
        { name: 'Leadership', icon: Compass, level: 'Intermediate', description: 'Guiding team initiatives' },
      ]
    }
  };

  const categories = Object.keys(skillCategories);

  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert': return '#059669';
      case 'Advanced': return '#0284C7';
      case 'Intermediate': return '#D97706';
      case 'Beginner': return '#DC2626';
      default: return '#6B7280';
    }
  };

  return (
    <section 
      id="skills" 
      className="min-h-screen bg-white py-16 lg:py-20"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        
        {/* Header */}
        <div 
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#011936' }}>
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ backgroundColor: '#011936' }}></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit built through hands-on experience and continuous learning
          </p>
        </div>

        {/* Category Navigation */}
        <div 
          className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {categories.map((category) => {
            const categoryData = skillCategories[category];
            const IconComponent = categoryData.icon;
            const isActive = activeCategory === category;
            
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                    className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 border-2 ${
                  isActive 
                    ? 'text-white shadow-lg transform scale-105' 
                    : 'text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100 hover:scale-102 hover:text-gray-700'
                }`}
                style={isActive ? { 
                  backgroundColor: '#011936',
                  borderColor: '#011936'
                } : {}}
              >
                <IconComponent className="w-5 h-5" />
                <span>{categoryData.title}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Display */}
        <div 
          className={`transform transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <div className="flex items-center justify-center mb-8">
              <div 
                className="p-4 rounded-xl mr-4"
                style={{ backgroundColor: skillCategories[activeCategory].color }}
              >
                {React.createElement(skillCategories[activeCategory].icon, {
                  className: "w-8 h-8 text-white"
                })}
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold" style={{ color: '#011936' }}>
                {skillCategories[activeCategory].title}
              </h3>
            </div>

            <div className={`grid gap-6 ${activeCategory === 'soft' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
              {skillCategories[activeCategory].skills.map((skill, index) => {
                const isHovered = hoveredSkill === `${activeCategory}-${index}`;
                const SkillIcon = skill.icon;
                
                return (
                  <div
                    key={index}
                    className={`bg-white rounded-xl p-5 shadow-md border-2 border-gray-100 cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg ${
                      isHovered ? 'scale-105' : 'scale-100'
                    } ${activeCategory === 'soft' ? 'min-h-[160px]' : 'min-h-[140px]'}`}
                    style={isHovered ? { 
                      borderColor: skillCategories[activeCategory].color 
                    } : {}}
                    onMouseEnter={() => setHoveredSkill(`${activeCategory}-${index}`)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex flex-col space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div 
                          className="p-2 rounded-lg flex-shrink-0"
                          style={{ backgroundColor: `${skillCategories[activeCategory].color}20` }}
                        >
                          <SkillIcon 
                            className="w-5 h-5" 
                            style={{ color: skillCategories[activeCategory].color }}
                          />
                        </div>
                        <div 
                          className="px-3 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: getLevelColor(skill.level) }}
                        >
                          {skill.level}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1" style={{ color: '#011936' }}>
                          {skill.name}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{skill.description}</p>
                      </div>
                    </div>

                    {/* Skill Level Indicator */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Proficiency Level</span>
                        <span className="font-medium" style={{ color: getLevelColor(skill.level) }}>
                          {skill.level}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            backgroundColor: getLevelColor(skill.level),
                            width: isVisible ? (
                              skill.level === 'Expert' ? '100%' :
                              skill.level === 'Advanced' ? '80%' :
                              skill.level === 'Intermediate' ? '60%' : '40%'
                            ) : '0%',
                            transitionDelay: `${index * 150}ms`
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    {isHovered && (
                      <div className="mt-4 flex items-center text-xs font-medium animate-fadeIn" 
                           style={{ color: skillCategories[activeCategory].color }}>
                        <Zap className="w-3 h-3 mr-1" />
                        <span>Actively using in projects</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Skills Summary */}
        <div 
          className={`mt-16 transform transition-all duration-1000 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#011936' }}>
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold" style={{ color: '#011936' }}>Frontend Focus</h4>
                <p className="text-gray-600">Modern JavaScript frameworks and responsive design</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#465775' }}>
                  <Server className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold" style={{ color: '#011936' }}>Full-Stack Ready</h4>
                <p className="text-gray-600">Backend APIs and database management</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#8BADCE' }}>
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold" style={{ color: '#011936' }}>Team Player</h4>
                <p className="text-gray-600">Strong communication and collaborative mindset</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#6B8CAE' }}>
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold" style={{ color: '#011936' }}>Problem Solver</h4>
                <p className="text-gray-600">Creative thinking and innovative solutions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div 
          className={`mt-12 text-center transform transition-all duration-1000 delay-800 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
            <span className="text-sm font-medium">Always learning and growing</span>
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

export default Skills;