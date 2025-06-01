// api/test-email.js
import { Resend } from 'resend';

export default async function handler(req, res) {
  // Allow GET requests for easy testing
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed. Use GET.' });
  }

  try {
    console.log('=== RESEND TEST START ===');
    
    // Check environment variables
    console.log('Environment check:');
    console.log('- RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('- API key length:', process.env.RESEND_API_KEY?.length || 0);
    console.log('- API key starts with re_:', process.env.RESEND_API_KEY?.startsWith('re_') || false);
    
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'RESEND_API_KEY environment variable not found',
        debug: 'Check your Vercel environment variables'
      });
    }

    if (!process.env.RESEND_API_KEY.startsWith('re_')) {
      return res.status(500).json({
        success: false,
        message: 'Invalid RESEND_API_KEY format',
        debug: 'API key should start with re_'
      });
    }

    console.log('Initializing Resend...');
    const resend = new Resend(process.env.RESEND_API_KEY);

    console.log('Sending test email...');
    
    const testEmailData = {
      from: 'onboarding@resend.dev',
      to: ['joaquinmiguel.ja@gmail.com'],
      subject: 'Test Email - Portfolio Contact Form',
      html: `
        <h1>Test Email</h1>
        <p>This is a test email to verify your Resend configuration.</p>
        <p>Sent at: ${new Date().toISOString()}</p>
      `,
      text: `Test Email - This is a test email to verify your Resend configuration. Sent at: ${new Date().toISOString()}`
    };

    console.log('Test email data:', {
      from: testEmailData.from,
      to: testEmailData.to,
      subject: testEmailData.subject
    });

    const { data, error } = await resend.emails.send(testEmailData);

    if (error) {
      console.error('❌ Resend test failed:', error);
      return res.status(400).json({
        success: false,
        message: 'Resend API test failed',
        error: error,
        debug: {
          apiKeyExists: !!process.env.RESEND_API_KEY,
          apiKeyFormat: process.env.RESEND_API_KEY?.startsWith('re_') || false
        }
      });
    }

    console.log('✅ Test email sent successfully:', data);
    console.log('=== RESEND TEST END ===');
    
    res.status(200).json({
      success: true,
      message: 'Test email sent successfully!',
      data: data,
      debug: {
        emailId: data?.id,
        apiKeyValid: true
      }
    });

  } catch (error) {
    console.error('❌ Test error:', error);
    console.log('=== RESEND TEST END (ERROR) ===');
    
    res.status(500).json({
      success: false,
      message: 'Test failed with error',
      error: error.message,
      debug: {
        stack: error.stack
      }
    });
  }
}