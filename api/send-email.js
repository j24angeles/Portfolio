// api/send-email.js
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
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="background: linear-gradient(135deg, #011936 0%, #465775 100%); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Portfolio Contact</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #011936; margin-top: 0; border-bottom: 2px solid #465775; padding-bottom: 10px;">Contact Details</h2>
              <p style="margin: 10px 0;"><strong style="color: #465775;">Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong style="color: #465775;">Email:</strong> ${email}</p>
              ${subject ? `<p style="margin: 10px 0;"><strong style="color: #465775;">Subject:</strong> ${subject}</p>` : ''}
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #011936; margin-top: 0; border-bottom: 2px solid #465775; padding-bottom: 10px;">Message</h2>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #465775;">
                <p style="margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #e8f4fd; border-radius: 6px; border: 1px solid #b3d9f2;">
              <p style="margin: 0; font-size: 14px; color: #465775;">
                <strong>Reply to this email directly</strong> or contact ${name} at ${email}
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
            <p>This message was sent from your portfolio contact form</p>
          </div>
        </div>
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