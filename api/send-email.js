import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Validate environment variable
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(500).json({ 
      success: false, 
      message: 'Email service not configured' 
    });
  }

  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address' 
      });
    }

    // Send email using Resend
    const emailData = await resend.emails.send({
      from: 'Contact Form <noreply@yourdomain.com>', // Replace with your verified domain
      to: ['your-email@gmail.com'], // Replace with your email
      subject: `New Contact Form Message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Form Message</title>
          <style>
            /* Reset styles */
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            /* Light mode styles (default) */
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333333;
              background-color: #ffffff;
              padding: 20px;
            }
            
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border: 1px solid #e0e0e0;
              border-radius: 8px;
              overflow: hidden;
            }
            
            .header {
              background-color: #2563eb;
              color: #ffffff;
              padding: 30px 20px;
              text-align: center;
            }
            
            .header h1 {
              font-size: 24px;
              font-weight: 600;
              margin: 0;
            }
            
            .content {
              padding: 30px 20px;
              background-color: #ffffff;
            }
            
            .field {
              margin-bottom: 20px;
              padding: 15px;
              background-color: #f8f9fa;
              border: 1px solid #e9ecef;
              border-radius: 6px;
            }
            
            .field-label {
              font-weight: 600;
              color: #495057;
              margin-bottom: 8px;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .field-value {
              color: #212529;
              font-size: 16px;
              word-wrap: break-word;
            }
            
            .message-field {
              background-color: #f8f9fa;
              border: 1px solid #e9ecef;
              border-radius: 6px;
              padding: 15px;
            }
            
            .message-field .field-value {
              white-space: pre-wrap;
              line-height: 1.5;
            }
            
            .footer {
              padding: 20px;
              text-align: center;
              background-color: #f8f9fa;
              border-top: 1px solid #e9ecef;
              color: #6c757d;
              font-size: 14px;
            }
            
            .timestamp {
              color: #6c757d;
              font-size: 12px;
              margin-top: 10px;
            }
            
            /* Dark mode support using prefers-color-scheme */
            @media (prefers-color-scheme: dark) {
              body {
                color: #ffffff;
                background-color: #1a1a1a;
              }
              
              .container {
                background-color: #2d2d2d;
                border-color: #404040;
              }
              
              .header {
                background-color: #1e40af;
              }
              
              .content {
                background-color: #2d2d2d;
              }
              
              .field {
                background-color: #3a3a3a;
                border-color: #505050;
              }
              
              .field-label {
                color: #e0e0e0;
              }
              
              .field-value {
                color: #ffffff;
              }
              
              .message-field {
                background-color: #3a3a3a;
                border-color: #505050;
              }
              
              .footer {
                background-color: #3a3a3a;
                border-color: #505050;
                color: #b0b0b0;
              }
              
              .timestamp {
                color: #b0b0b0;
              }
            }
            
            /* Ensure readability in all email clients */
            .field-value a {
              color: #2563eb;
              text-decoration: none;
            }
            
            @media (prefers-color-scheme: dark) {
              .field-value a {
                color: #60a5fa;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Message</h1>
            </div>
            
            <div class="content">
              <div class="field">
                <div class="field-label">Name</div>
                <div class="field-value">${name}</div>
              </div>
              
              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value">
                  <a href="mailto:${email}">${email}</a>
                </div>
              </div>
              
              <div class="message-field">
                <div class="field-label">Message</div>
                <div class="field-value">${message}</div>
              </div>
              
              <div class="timestamp">
                Received: ${new Date().toLocaleString()}
              </div>
            </div>
            
            <div class="footer">
              This message was sent through your website's contact form.
            </div>
          </div>
        </body>
        </html>
      `
    });
    
    console.log('Email sent successfully:', emailData);
    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! I\'ll get back to you soon.',
      emailId: emailData.id
    });
  } catch (error) {
    console.error('Email sending error:', error);
    // Handle specific Resend errors
    if (error.name === 'ResendError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Email service error. Please try again later.',
        debug: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error. Please try again later.',
      debug: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}