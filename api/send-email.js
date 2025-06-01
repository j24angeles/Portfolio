// api/send-email.js
import { Resend } from 'resend';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed. Only POST requests are accepted.' 
    });
  }

  try {
    console.log('=== EMAIL API DEBUG START ===');
    console.log('Request method:', req.method);
    console.log('Request headers:', JSON.stringify(req.headers, null, 2));
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    // Environment variable checking
    console.log('Environment variables check:');
    console.log('- RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('- RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length || 0);
    console.log('- API Key prefix:', process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 8) + '...' : 'not found');
    console.log('- NODE_ENV:', process.env.NODE_ENV);
    console.log('- RECIPIENT_EMAIL:', process.env.RECIPIENT_EMAIL || 'not set');
    console.log('- FROM_EMAIL:', process.env.FROM_EMAIL || 'not set');

    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY environment variable is not set');
      return res.status(500).json({
        success: false,
        message: 'Email service configuration error - API key missing',
        debug: 'RESEND_API_KEY environment variable not found'
      });
    }

    // Validate API key format
    if (!process.env.RESEND_API_KEY.startsWith('re_')) {
      console.error('❌ Invalid RESEND_API_KEY format');
      return res.status(500).json({
        success: false,
        message: 'Email service configuration error - invalid API key format',
        debug: 'API key should start with re_'
      });
    }

    // Extract and validate request body
    const { name, email, subject, message } = req.body || {};

    console.log('Form data received:');
    console.log('- name:', name ? `"${name}" (${name.length} chars)` : 'MISSING');
    console.log('- email:', email ? `"${email}" (${email.length} chars)` : 'MISSING');
    console.log('- subject:', subject ? `"${subject}" (${subject.length} chars)` : 'EMPTY');
    console.log('- message:', message ? `"${message.substring(0, 50)}..." (${message.length} chars)` : 'MISSING');

    // Validation
    if (!name || !email || !message) {
      console.error('❌ Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields',
        debug: {
          name: !!name,
          email: !!email,
          message: !!message
        }
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('❌ Invalid email format:', email);
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
        debug: `Email "${email}" failed regex validation`
      });
    }

    // Sanitize inputs
    const sanitizedName = name.trim().substring(0, 100);
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedSubject = subject ? subject.trim().substring(0, 200) : '';
    const sanitizedMessage = message.trim().substring(0, 2000);

    console.log('Sanitized data:');
    console.log('- sanitizedName:', sanitizedName);
    console.log('- sanitizedEmail:', sanitizedEmail);
    console.log('- sanitizedSubject:', sanitizedSubject);
    console.log('- sanitizedMessage length:', sanitizedMessage.length);

    // Use Resend's sandbox domain
    const fromEmail = 'onboarding@resend.dev';
    const toEmail = process.env.RECIPIENT_EMAIL || 'joaquinmiguel.ja@gmail.com';
    
    console.log('Email configuration:');
    console.log('- fromEmail:', fromEmail);
    console.log('- toEmail:', toEmail);

    // Initialize Resend
    console.log('Initializing Resend...');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Prepare email data
    const emailData = {
      from: `Portfolio Contact <${fromEmail}>`,
      to: [toEmail],
      subject: sanitizedSubject || `New Contact Form Message from ${sanitizedName}`,
      replyTo: sanitizedEmail,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #011936; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border: 1px solid #e9ecef;">
            <h2 style="color: #465775; margin-top: 0; font-size: 18px;">Contact Details:</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Name:</td>
                <td style="padding: 8px 0; color: #666;">${sanitizedName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
                <td style="padding: 8px 0; color: #666;">${sanitizedEmail}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Subject:</td>
                <td style="padding: 8px 0; color: #666;">${sanitizedSubject || 'No subject provided'}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: white; padding: 20px; border: 1px solid #e9ecef; border-top: none;">
            <h3 style="color: #465775; margin-top: 0; font-size: 16px;">Message:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #465775; border-radius: 4px; line-height: 1.6;">
              ${sanitizedMessage.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="background-color: #e8f4f8; padding: 15px; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              This message was sent from your portfolio contact form on ${new Date().toLocaleString('en-US', { 
                timeZone: 'Asia/Manila',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })} (Philippine Time).
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Contact Details:
Name: ${sanitizedName}
Email: ${sanitizedEmail}
Subject: ${sanitizedSubject || 'No subject provided'}

Message:
${sanitizedMessage}

This message was sent from your portfolio contact form on ${new Date().toLocaleString()}.
      `
    };

    console.log('Email data prepared:');
    console.log('- from:', emailData.from);
    console.log('- to:', emailData.to);
    console.log('- subject:', emailData.subject);
    console.log('- replyTo:', emailData.replyTo);
    console.log('- HTML length:', emailData.html.length);
    console.log('- Text length:', emailData.text.length);

    console.log('Attempting to send email via Resend...');

    // Send email using Resend
    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error('❌ Resend API error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      
      return res.status(400).json({
        success: false,
        message: 'Failed to send email. Please try again later.',
        debug: {
          error: error,
          apiKeyExists: !!process.env.RESEND_API_KEY,
          apiKeyFormat: process.env.RESEND_API_KEY?.startsWith('re_') || false
        }
      });
    }

    console.log('✅ Email sent successfully!');
    console.log('Response data:', data);
    console.log('Email ID:', data?.id);
    console.log('=== EMAIL API DEBUG END ===');

    // Success response
    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      emailId: data?.id
    });

  } catch (error) {
    console.error('❌ Unexpected error in send-email handler:', error);
    console.error('Error stack:', error.stack);
    console.log('=== EMAIL API DEBUG END (ERROR) ===');
    
    const errorMessage = 'An unexpected error occurred. Please try again later.';

    res.status(500).json({
      success: false,
      message: errorMessage,
      debug: {
        error: error.message,
        stack: error.stack
      }
    });
  }
}