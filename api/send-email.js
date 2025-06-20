import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
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

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: name, email, and message are required.' 
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email address format.' 
      });
    }

    // Get current time in Philippine timezone (UTC+8, same as Kuala Lumpur)
    const philippineTime = new Date().toLocaleDateString('en-US', { 
      timeZone: 'Asia/Manila',
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    // Send email using Resend
    const emailData = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Replace with your verified domain
      to: ['joaquinmiguel.ja@gmail.com'],
      subject: subject ? `Portfolio Contact: ${subject}` : 'New Portfolio Contact Message',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="color-scheme" content="light dark">
          <meta name="supported-color-schemes" content="light dark">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
          <title>Portfolio Contact</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; background: #f7f8fa; }
            .email-container { max-width: 650px; margin: 0 auto; border-radius: 14px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.08); border: 1px solid #e0e0e0; background: #fff; }
            .email-header { padding: 36px 30px 18px 30px; text-align: left; border-bottom: 1px solid #e0e0e0; background: #f8f9fa; }
            .email-title { font-size: 24px; font-weight: 600; color: #011936; letter-spacing: 0.2px; margin-bottom: 6px; }
            .email-subtitle { font-size: 15px; color: #465775; font-weight: 400; margin-bottom: 0; }
            .email-body { padding: 36px 30px; border-radius: 0 0 14px 14px; }
            .section { margin-bottom: 28px; }
            .section-title { font-size: 17px; font-weight: 500; color: #011936; border-bottom: 2px solid #011936; padding-bottom: 8px; margin-bottom: 16px; letter-spacing: 0.1px; }
            .info-label { font-weight: 500; font-size: 13px; color: #465775; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
            .info-value { font-size: 16px; font-weight: 400; color: #222; margin-bottom: 12px; }
            .divider { border: none; border-top: 1px solid #e0e0e0; margin: 24px 0; }
            .message-box { background: #f7f8fa; border-left: 4px solid #011936; border-radius: 8px; padding: 18px 20px; font-size: 15px; color: #222; margin-bottom: 0; }
            .footer { text-align: center; margin-top: 32px; padding: 0 30px 24px 30px; }
            .footer-text { color: #888; font-size: 12px; font-weight: 400; opacity: 0.7; }
            @media (max-width: 600px) {
              .email-container, .email-header, .email-body { padding-left: 10px !important; padding-right: 10px !important; }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <div class="email-title">New Portfolio Contact</div>
              <div class="email-subtitle">You received a new message from your website</div>
            </div>
            <div class="email-body">
              <div class="section">
                <div class="section-title">Contact Information</div>
                <div class="info-label">Name</div>
                <div class="info-value">${name}</div>
                <div class="info-label">Email</div>
                <div class="info-value"><a href="mailto:${email}" style="color:#011936;text-decoration:none;">${email}</a></div>
                ${subject ? `<div class="info-label">Subject</div><div class="info-value">${subject}</div>` : ''}
              </div>
              <hr class="divider" />
              <div class="section">
                <div class="section-title">Message</div>
                <div class="message-box">${message}</div>
              </div>
              <hr class="divider" />
              <div class="section">
                <div class="section-title">Quick Actions</div>
                <div class="info-label">Reply directly to this email or contact <a href="mailto:${email}" style="color:#011936;text-decoration:none;">${email}</a></div>
              </div>
            </div>
            <div class="footer">
              <div class="footer-text">This message was sent from your portfolio contact form</div>
              <div class="footer-text" style="margin-top:6px;">${philippineTime} (Philippine Time)</div>
            </div>
          </div>
        </body>
        </html>
      `,
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
        debug: import.meta.env.MODE === 'development' ? error.message : undefined
      });
    }

    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error. Please try again later.',
      debug: import.meta.env.MODE === 'development' ? error.message : undefined
    });
  }
}