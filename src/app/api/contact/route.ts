import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, organization, services, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Option 1: Using Resend (Recommended)
    // First install: npm install resend
    // Then uncomment the code below and add RESEND_API_KEY to your .env.local
    
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        await resend.emails.send({
          from: 'Contact Form <onboarding@resend.dev>', // Use your verified domain
          to: process.env.CONTACT_EMAIL || 'austinndoro03@gmail.com',
          replyTo: email,
          subject: `New Contact Form: ${name} - ${services || 'General Inquiry'}`,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: #334BD3; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                  .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
                  .field { margin-bottom: 15px; }
                  .label { font-weight: bold; color: #334BD3; }
                  .value { margin-top: 5px; }
                  .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #eee; color: #666; font-size: 12px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h2>New Contact Form Submission</h2>
                  </div>
                  <div class="content">
                    <div class="field">
                      <div class="label">Name:</div>
                      <div class="value">${name}</div>
                    </div>
                    <div class="field">
                      <div class="label">Email:</div>
                      <div class="value"><a href="mailto:${email}">${email}</a></div>
                    </div>
                    ${organization ? `
                    <div class="field">
                      <div class="label">Organization:</div>
                      <div class="value">${organization}</div>
                    </div>
                    ` : ''}
                    ${services ? `
                    <div class="field">
                      <div class="label">Services Requested:</div>
                      <div class="value">${services}</div>
                    </div>
                    ` : ''}
                    <div class="field">
                      <div class="label">Message:</div>
                      <div class="value">${message.replace(/\n/g, '<br>')}</div>
                    </div>
                    <div class="footer">
                      <p>Received: ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })} EAT</p>
                      <p>Reply directly to this email to respond to ${name}</p>
                    </div>
                  </div>
                </div>
              </body>
            </html>
          `,
        });

        console.log('Email sent successfully via Resend');
        return NextResponse.json(
          { 
            success: true, 
            message: 'Message sent successfully! I will get back to you soon.' 
          },
          { status: 200 }
        );
      } catch (emailError) {
        console.error('Resend error:', emailError);
        // Fall through to logging if email fails
      }
    }

    // Fallback: Log the submission (for testing without email service)
    console.log('═══════════════════════════════════════');
    console.log('📧 NEW CONTACT FORM SUBMISSION');
    console.log('═══════════════════════════════════════');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Organization:', organization || 'Not provided');
    console.log('Services:', services || 'Not provided');
    console.log('Message:', message);
    console.log('Timestamp:', new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' }), 'EAT');
    console.log('═══════════════════════════════════════\n');

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message received! I will get back to you soon.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
