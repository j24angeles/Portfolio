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
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('');

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

  const validateForm = (data) => {
    const newErrors = {};
    
    // Name validation
    if (!data.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (data.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    } else if (data.name.trim().length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }

    // Email validation
    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Subject validation (optional but with length limit)
    if (data.subject.trim().length > 200) {
      newErrors.subject = 'Subject must be less than 200 characters';
    }

    // Message validation - removed minimum character requirement
    if (!data.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (data.message.trim().length > 2000) {
      newErrors.message = 'Message must be less than 2000 characters';
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear general status when user makes changes
    if (formStatus) {
      setFormStatus('');
      setStatusMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset previous states
    setIsSubmitting(true);
    setFormStatus('');
    setStatusMessage('');
    setErrors({});

    // Trim whitespace from form data
    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim()
    };

    // Validate form
    const validationErrors = validateForm(trimmedData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormStatus('error');
      setStatusMessage('Please fix the errors above and try again.');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Submitting form data:', trimmedData);
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trimmedData)
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      let result;
      try {
        result = await response.json();
        console.log('Response data:', result);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error('Invalid response from server');
      }

      if (response.ok && result.success) {
        setFormStatus('success');
        setStatusMessage(result.message || 'Message sent successfully! I\'ll get back to you soon.');
        
        // Clear form on success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Auto-clear success message after 5 seconds
        setTimeout(() => {
          setFormStatus('');
          setStatusMessage('');
        }, 5000);
        
      } else {
        // Handle server errors
        setFormStatus('error');
        
        if (result.message) {
          setStatusMessage(result.message);
        } else if (response.status === 400) {
          setStatusMessage('Please check your input and try again.');
        } else if (response.status === 500) {
          setStatusMessage('Server error. Please try again later.');
        } else {
          setStatusMessage('Failed to send message. Please try again.');
        }
        
        // Log detailed error for debugging
        console.error('Server error:', {
          status: response.status,
          result: result,
          debug: result.debug
        });
      }
    } catch (error) {
      console.error('Network/fetch error:', error);
      setFormStatus('error');
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setStatusMessage('Network error. Please check your connection and try again.');
      } else {
        setStatusMessage('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="min-h-screen bg-white py-20 lg:py-24"
      style={{ fontFamily: 'Poppins, sans-serif' }}
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

              <form onSubmit={handleSubmit} className="space-y-6">
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500 ${
                      errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500 ${
                      errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500 ${
                      errors.subject ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="What's this about?"
                    disabled={isSubmitting}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.subject}
                    </p>
                  )}
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors resize-none text-gray-900 placeholder-gray-500 ${
                      errors.message ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Tell me about your project or just say hello!"
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.message.length}/2000 characters
                  </p>
                </div>

                {/* Status Messages */}
                {formStatus === 'success' && statusMessage && (
                  <div className="flex items-start space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-green-700">{statusMessage}</span>
                  </div>
                )}

                {formStatus === 'error' && statusMessage && (
                  <div className="flex items-start space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-red-700">{statusMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 transform flex items-center justify-center space-x-2 text-white border-2 border-[#011936] bg-[#011936] hover:bg-[#011936]/90 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#011936]/40 relative overflow-hidden group ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed transform-none border-gray-400' 
                      : ''
                  }`}
                  style={isSubmitting ? {} : undefined}
                >
                  {!isSubmitting && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>}
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & Social */}
          <div 
            className={`transform transition-all duration-1000 delay-400 flex flex-col space-y-6 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 flex-1">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
                Contact Information
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#465775' }}>
                    <Mail className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-800 text-sm sm:text-base">Email</p>
                    <p className="text-gray-600 text-xs sm:text-sm break-all">joaquinmiguel.ja@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#465775' }}>
                    <Phone className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-800 text-sm sm:text-base">Phone</p>
                    <p className="text-gray-600 text-xs sm:text-sm">+63 915 756 0659</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#465775' }}>
                    <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-800 text-sm sm:text-base">Location</p>
                    <p className="text-gray-600 text-xs sm:text-sm">Antipolo City, Rizal, Philippines</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 flex-1">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
                Connect With Me
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center space-x-3 p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 ${social.color}`}
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-white transition-colors flex-shrink-0" style={{ backgroundColor: '#465775' }}>
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 group-hover:text-gray-900 truncate text-sm sm:text-base">
                          {social.name}
                        </p>
                        <div className="flex items-center text-xs sm:text-sm text-gray-500">
                          <span>Connect</span>
                          <ExternalLink className="w-3 h-3 ml-1 flex-shrink-0" />
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-600 text-center">
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
                className="inline-flex items-center space-x-2 px-6 py-3 text-white rounded-lg font-medium transition-all duration-300 transform bg-[#011936] border-2 border-[#011936] hover:bg-[#011936]/90 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#011936]/40 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Mail className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Email Me</span>
              </a>
              <a 
                href="https://m.me/j24angeles"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-[#011936] text-[#011936] bg-transparent rounded-lg font-medium transition-all duration-300 transform hover:bg-[#011936] hover:text-white hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#011936]/40"
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