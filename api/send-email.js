// api/send-email.js - Vercel serverless function
import nodemailer from 'nodemailer';

// Email transporter configuration
const createTransporter = () => {
  // Gmail configuration
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Use App Password for Gmail
      }
    });
  }
  
  // Generic SMTP configuration
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Add request logging
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed' 
    });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Verify transporter configuration
    await transporter.verify();

    // Email content
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      subject: subject || `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #011936; border-bottom: 3px solid #465775; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #465775; margin-bottom: 5px;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'No subject provided'}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #465775; margin-bottom: 5px;">Message:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #465775; border-radius: 4px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #e8f4f8; border-radius: 4px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              This message was sent from your portfolio contact form on ${new Date().toLocaleString()}.
            </p>
          </div>
          
          <div style="margin: 20px 0;">
            <p style="color: #666; font-size: 14px;">
              You can reply directly to this email to respond to ${name}.
            </p>
          </div>
        </div>
      `,
      replyTo: email // This allows you to reply directly to the sender
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Message sent: %s', info.messageId);
    
    // Optional: Send confirmation email to the sender
    if (process.env.SEND_CONFIRMATION === 'true') {
      const confirmationOptions = {
        from: `"${process.env.YOUR_NAME || 'Portfolio'}" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Thank you for your message!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #011936;">Thank You, ${name}!</h2>
            <p>I've received your message and will get back to you as soon as possible.</p>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin: 20px 0;">
              <h3 style="color: #465775; margin-top: 0;">Your Message:</h3>
              <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p>Best regards,<br>${process.env.YOUR_NAME || 'Joaquin Miguel Angeles'}</p>
          </div>
        `
      };
      
      await transporter.sendMail(confirmationOptions);
    }

    res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}