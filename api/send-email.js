import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

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

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: `${name} <onboarding@resend.dev>`, // Use Resend's domain for 'from'
      to: [process.env.RECIPIENT_EMAIL || 'joaquinmiguel.ja@gmail.com'],
      subject: subject || `New Contact Form Message from ${name}`,
      replyTo: email, // This allows you to reply directly to the sender
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
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({
        success: false,
        message: 'Failed to send email'
      });
    }

    console.log('Email sent successfully:', data);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.'
    });
  }
}