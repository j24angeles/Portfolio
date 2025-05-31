import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

console.log('🚀 Starting server...');

const app = express();
const PORT = process.env.PORT || 5000;

// Error handling
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
});

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'], 
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  credentials: true
}));

// Handle preflight requests for all routes
app.options('*', cors());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', req.body);
  }
  next();
});

// Test route to verify server is working
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio server is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running!', 
    timestamp: new Date().toISOString(),
    port: PORT,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Create a transporter object using SMTP transport
const createTransporter = () => {
  console.log('📧 Creating email transporter...');
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️ EMAIL_USER and EMAIL_PASS environment variables not set - email functionality will be limited');
    return null;
  }
  
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Email sending route
app.post('/api/send-email', async (req, res) => {
  console.log('📨 Received email request');
  console.log('Request body:', req.body);
  
  try {
    const { name, email, subject, message } = req.body;
    
    console.log('Form data received:', { 
      name: name ? `"${name}" (${name.length} chars)` : 'missing', 
      email: email ? `"${email}" (${email.length} chars)` : 'missing', 
      subject: subject ? `"${subject}" (${subject.length} chars)` : 'empty', 
      message: message ? `"${message.substring(0, 50)}..." (${message.length} chars)` : 'missing'
    });

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      console.log('❌ Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, and message are required.',
        received: {
          name: !!name?.trim(),
          email: !!email?.trim(),
          message: !!message?.trim()
        }
      });
    }

    // Validate email format
    if (!isValidEmail(email.trim())) {
      console.log('❌ Invalid email format:', email);
      return res.status(400).json({
        success: false,
        message: 'Invalid email format.',
        email: email
      });
    }

    // Validate field lengths
    if (name.length > 100 || subject?.length > 200 || message.length > 2000) {
      console.log('❌ Field length exceeded');
      return res.status(400).json({
        success: false,
        message: 'Field length exceeded. Please check your input.',
        lengths: {
          name: name.length,
          subject: subject?.length || 0,
          message: message.length
        }
      });
    }

    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('⚠️ Email not configured - returning success for testing');
      return res.status(200).json({
        success: true,
        message: 'Message received successfully! (Email not configured in development)',
        data: { name, email, subject: subject || 'No subject', message }
      });
    }

    // Create transporter
    let transporter;
    try {
      transporter = createTransporter();
      if (!transporter) {
        throw new Error('Failed to create email transporter');
      }
      console.log('✅ Email transporter created');
    } catch (error) {
      console.error('❌ Failed to create transporter:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Email service configuration error. Please contact the administrator.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('✅ Email transporter verified');
    } catch (verifyError) {
      console.error('❌ Email transporter verification failed:', verifyError.message);
      return res.status(500).json({
        success: false,
        message: 'Unable to connect to email service. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? verifyError.message : undefined
      });
    }

    // Email options for notification to you
    const notificationMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Form Message${subject ? ': ' + subject : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #011936; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #011936; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'No subject provided'}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="color: #011936; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e3f2fd; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              This message was sent from your portfolio contact form at ${new Date().toLocaleString()}.
            </p>
          </div>
        </div>
      `
    };

    // Email options for auto-reply to sender
    const autoReplyMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for your message!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #011936; border-bottom: 2px solid #011936; padding-bottom: 10px;">
            Thank You for Getting in Touch!
          </h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for reaching out through my portfolio contact form. I've received your message and will get back to you as soon as possible.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #011936; margin-top: 0;">Your Message Summary</h3>
            <p><strong>Subject:</strong> ${subject || 'No subject provided'}</p>
            <p><strong>Message:</strong></p>
            <p style="font-style: italic; color: #666;">"${message.substring(0, 150)}${message.length > 150 ? '...' : ''}"</p>
          </div>
          
          <p>I typically respond within 24-48 hours. In the meantime, feel free to connect with me on my social media platforms!</p>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #011936; color: white; border-radius: 8px; text-align: center;">
            <p style="margin: 0;">Looking forward to connecting with you!</p>
            <p style="margin: 5px 0 0 0; font-weight: bold;">Joaquin Miguel Angeles</p>
          </div>
        </div>
      `
    };

    // Send both emails
    console.log('📤 Sending emails...');
    await Promise.all([
      transporter.sendMail(notificationMailOptions),
      transporter.sendMail(autoReplyMailOptions)
    ]);

    console.log('✅ Emails sent successfully');

    // Success response
    res.status(200).json({
      success: true,
      message: 'Email sent successfully! Thank you for your message.',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error in send-email route:', error);
    console.error('Stack trace:', error.stack);
    
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      timestamp: new Date().toISOString()
    });
  }
});

// Catch-all error handler
app.use((error, req, res, next) => {
  console.error('❌ Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.path} not found`,
    availableEndpoints: ['/api/health', '/api/send-email']
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
  });
}

// Start server
try {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running successfully on port ${PORT}`);
    console.log(`📧 Email configured: ${process.env.EMAIL_USER ? 'YES' : 'NO'}`);
    console.log(`🌐 Server accessible at:`);
    console.log(`   - http://localhost:${PORT}`);
    console.log(`   - http://127.0.0.1:${PORT}`);
    console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📮 Email endpoint: http://localhost:${PORT}/api/send-email`);
    console.log(`🚀 Ready to accept requests!`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use. Please use a different port or stop the other process.`);
    } else {
      console.error('❌ Server error:', error);
    }
    process.exit(1);
  });

} catch (error) {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully...');
  process.exit(0);
});