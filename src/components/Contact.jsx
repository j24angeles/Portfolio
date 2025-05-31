import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  MessageCircle, 
  Send, 
  MapPin, 
  Phone,
  User,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  ExternalLink
} from 'lucide-react';
import api from '../../api/send-email.js'; // Using the imported API

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');

    // Trim whitespace from form data
    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim()
    };

    // Basic validation - check if required fields are not empty after trimming
    if (!trimmedData.name || !trimmedData.email || !trimmedData.message) {
      console.log('Validation failed - missing required fields:', {
        name: !!trimmedData.name,
        email: !!trimmedData.email,
        message: !!trimmedData.message
      });
      setFormStatus('error');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedData.email)) {
      console.log('Email validation failed:', trimmedData.email);
      setFormStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Sending data to server:', trimmedData);
      
      // Using the imported API instead of direct fetch
      const result = await api.sendEmail(trimmedData);
      
      console.log('Server response:', result);

      if (result.success) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setFormStatus('error');
        console.error('Server error:', result.message);
      }
    } catch (error) {
      console.error('API error:', error);
      setFormStatus('error');
      
      // More specific error handling
      if (error.message.includes('403')) {
        console.error('Server returned 403 - Check if server is running and CORS is configured');
      } else if (error.message.includes('Failed to fetch')) {
        console.error('Could not connect to server - Make sure server is running on port 5000');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 lg:py-20"
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
            <MessageCircle className="w-12 h-12 mr-4" style={{ color: '#011936' }} />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold" style={{ color: '#011936' }}>
              Get In Touch
            </h2>
          </div>
          <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ backgroundColor: '#011936' }}></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Have a project in mind or just want to connect? I'd love to hear from you. 
            Let's build something amazing together!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Contact Form */}
          <div 
            className={`transform transition-all duration-1000 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 h-full">
              <div className="flex items-center mb-6">
                <Send className="w-6 h-6 mr-3" style={{ color: '#465775' }} />
                <h3 className="text-2xl font-bold text-gray-800">
                  Send Message
                </h3>
              </div>

              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" style={{ color: '#465775' }} />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
                    style={{ '--tw-ring-color': '#465775' }}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" style={{ color: '#465775' }} />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
                    style={{ '--tw-ring-color': '#465775' }}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" style={{ color: '#465775' }} />
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
                    style={{ '--tw-ring-color': '#465775' }}
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageCircle className="w-4 h-4 inline mr-2" style={{ color: '#465775' }} />
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors resize-none text-gray-900 placeholder-gray-500"
                    style={{ '--tw-ring-color': '#465775' }}
                    placeholder="Tell me about your project or just say hello!"
                    required
                  ></textarea>
                </div>

                {/* Status Messages */}
                {formStatus === 'success' && (
                  <div className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-700">Message sent successfully! I'll get back to you soon.</span>
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-700">Please fill in all required fields with valid information.</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-white shadow-lg ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'hover:opacity-90'
                  }`}
                  style={{ backgroundColor: isSubmitting ? undefined : '#011936' }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Contact Info & Social */}
          <div 
            className={`transform transition-all duration-1000 delay-400 flex flex-col space-y-6 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 flex-1">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#465775' }}>
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-gray-600">joaquinmiguel.ja@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#465775' }}>
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Phone</p>
                    <p className="text-gray-600">+63 915 756 0659</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#465775' }}>
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Location</p>
                    <p className="text-gray-600">Antipolo City, Rizal, Philippines</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 flex-1">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Connect With Me
              </h3>
              
              {/* Improved responsive grid - single column on mobile, 2 columns on larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 ${social.color}`}
                    >
                      {/* Icon container with more breathing room */}
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-colors flex-shrink-0" style={{ backgroundColor: '#465775' }}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 group-hover:text-gray-900 truncate">
                          {social.name}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>Connect</span>
                          <ExternalLink className="w-3 h-3 ml-1 flex-shrink-0" />
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  Follow me on social media for updates on my latest projects and tech insights!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div 
          className={`text-center transform transition-all duration-1000 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Ready to Start a Project?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Whether you have a clear vision or just an idea, I'm here to help bring your project to life. 
              Let's discuss your requirements and create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:joaquinmiguel.ja@gmail.com"
                className="inline-flex items-center space-x-2 px-6 py-3 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:opacity-90"
                style={{ backgroundColor: '#011936' }}
              >
                <Mail className="w-4 h-4" />
                <span>Email Me</span>
              </a>
              <a 
                href="#"
                className="inline-flex items-center space-x-2 px-6 py-3 border-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:text-white"
                style={{ 
                  borderColor: '#011936', 
                  color: '#011936'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#011936';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#011936';
                }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Let's Chat</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;