import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
          <title>Portfolio Contact</title>
          <style>
            /* Reset and base styles */
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            /* Dark mode styles */
            @media (prefers-color-scheme: dark) {
              .email-container { 
                background-color: #1a1a1a !important; 
                color: #ffffff !important;
                border-color: #333333 !important;
              }
              .email-header { 
                background-color: #2a2a2a !important; 
                color: #ffffff !important;
                border-color: #444444 !important;
              }
              .email-body { 
                background-color: #1a1a1a !important; 
                border-color: #333333 !important;
              }
              .content-card { 
                background-color: #2a2a2a !important; 
                border-color: #444444 !important;
                color: #ffffff !important;
              }
              .section-title { 
                color: #ffffff !important; 
                border-color: #4a9eff !important;
              }
              .label { 
                color: #cccccc !important; 
              }
              .message-box { 
                background-color: #333333 !important; 
                border-color: #4a9eff !important;
                color: #ffffff !important;
              }
              .info-box { 
                background-color: #2a2a2a !important; 
                border-color: #4a9eff !important;
                color: #cccccc !important;
              }
              .footer-text { 
                color: #888888 !important; 
              }
              .email-link {
                color: #4a9eff !important;
                border-color: #4a9eff !important;
              }
              .header-subtitle {
                color: #cccccc !important;
              }
            }
            
            /* Light mode styles */
            @media (prefers-color-scheme: light) {
              .email-container { 
                background-color: #ffffff !important; 
                color: #000000 !important;
                border-color: #e0e0e0 !important;
              }
              .email-header { 
                background-color: #f8f9fa !important; 
                color: #000000 !important;
                border-color: #e0e0e0 !important;
              }
              .email-body { 
                background-color: #ffffff !important; 
                border-color: #e0e0e0 !important;
              }
              .content-card { 
                background-color: #f8f9fa !important; 
                border-color: #e0e0e0 !important;
                color: #000000 !important;
              }
              .section-title { 
                color: #011936 !important; 
                border-color: #011936 !important;
              }
              .label { 
                color: #011936 !important; 
              }
              .message-box { 
                background-color: #ffffff !important; 
                border-color: #011936 !important;
                color: #000000 !important;
              }
              .info-box { 
                background-color: #e8f4fd !important; 
                border-color: #b3d9f2 !important;
                color: #011936 !important;
              }
              .footer-text { 
                color: #666666 !important; 
              }
              .email-link {
                color: #011936 !important;
                border-color: #011936 !important;
              }
              .header-subtitle {
                color: #666666 !important;
              }
            }
            
            /* Fallback for clients that don't support prefers-color-scheme */
            .email-container { 
              background-color: #ffffff; 
              color: #000000;
              border-color: #e0e0e0;
            }
            .email-header { 
              background-color: #f8f9fa; 
              color: #000000;
              border-color: #e0e0e0;
            }
            .email-body { 
              background-color: #ffffff; 
              border-color: #e0e0e0;
            }
            .content-card { 
              background-color: #f8f9fa; 
              border-color: #e0e0e0;
              color: #000000;
            }
            .section-title { 
              color: #011936; 
              border-color: #011936;
            }
            .label { 
              color: #011936; 
            }
            .message-box { 
              background-color: #ffffff; 
              border-color: #011936;
              color: #000000;
            }
            .info-box { 
              background-color: #e8f4fd; 
              border-color: #b3d9f2;
              color: #011936;
            }
            .footer-text { 
              color: #666666; 
            }
            .email-link {
              color: #011936;
              border-color: #011936;
            }
            .header-subtitle {
              color: #666666;
            }
          </style>
        </head>
        <body style="margin: 0; padding: 20px; font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6;">
          <div class="email-container" style="max-width: 650px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.1); border: 1px solid;">
            
            <!-- Header -->
            <div class="email-header" style="padding: 40px 30px; text-align: center; border-bottom: 1px solid;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.5px;">
                📬 New Portfolio Contact
              </h1>
              <p class="header-subtitle" style="margin: 8px 0 0 0; font-size: 16px; font-weight: 300;">
                Someone reached out through your website
              </p>
            </div>
            
            <!-- Body -->
            <div class="email-body" style="padding: 40px 30px; border-radius: 0 0 12px 12px;">
              
              <!-- Contact Details Card -->
              <div class="content-card" style="padding: 30px; border-radius: 12px; margin-bottom: 24px; border: 1px solid; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h2 class="section-title" style="margin: 0 0 20px 0; font-size: 20px; font-weight: 500; border-bottom: 2px solid; padding-bottom: 12px; display: flex; align-items: center;">
                  👤 Contact Information
                </h2>
                <div style="space-y: 16px;">
                  <div style="margin-bottom: 16px;">
                    <span class="label" style="font-weight: 500; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Name</span>
                    <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 400;">${name}</p>
                  </div>
                  <div style="margin-bottom: 16px;">
                    <span class="label" style="font-weight: 500; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                    <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 400;">
                      <a href="mailto:${email}" class="email-link" style="text-decoration: none; border-bottom: 1px dotted;">${email}</a>
                    </p>
                  </div>
                  ${subject ? `
                  <div style="margin-bottom: 16px;">
                    <span class="label" style="font-weight: 500; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Subject</span>
                    <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 400;">${subject}</p>
                  </div>
                  ` : ''}
                </div>
              </div>
              
              <!-- Message Card -->
              <div class="content-card" style="padding: 30px; border-radius: 12px; margin-bottom: 24px; border: 1px solid; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h2 class="section-title" style="margin: 0 0 20px 0; font-size: 20px; font-weight: 500; border-bottom: 2px solid; padding-bottom: 12px; display: flex; align-items: center;">
                  💬 Message
                </h2>
                <div class="message-box" style="padding: 24px; border-radius: 8px; border-left: 4px solid; font-size: 16px; line-height: 1.7;">
                  <p style="margin: 0; white-space: pre-wrap; font-weight: 300;">${message}</p>
                </div>
              </div>
              
              <!-- Action Box -->
              <div class="info-box" style="padding: 24px; border-radius: 12px; border: 1px solid; text-align: center;">
                <p style="margin: 0 0 12px 0; font-size: 16px; font-weight: 500;">
                  ⚡ Quick Actions
                </p>
                <p style="margin: 0; font-size: 14px; font-weight: 300; line-height: 1.5;">
                  Reply directly to this email or contact <strong>${name}</strong> at 
                  <a href="mailto:${email}" class="email-link" style="text-decoration: none; font-weight: 500;">${email}</a>
                </p>
              </div>
              
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; margin-top: 32px; padding: 0 30px;">
              <p class="footer-text" style="margin: 0; font-size: 12px; font-weight: 300; opacity: 0.7;">
                🔒 This message was securely sent from your portfolio contact form
              </p>
              <p class="footer-text" style="margin: 8px 0 0 0; font-size: 11px; font-weight: 300; opacity: 0.5;">
                ${new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
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