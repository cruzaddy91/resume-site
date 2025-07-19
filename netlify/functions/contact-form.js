const nodemailer = require('nodemailer');

// Rate limiting storage (in production, use Redis or similar)
const submissions = new Map();

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { name, email, subject, message, 'g-recaptcha-response': recaptchaToken } = body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'All fields are required' })
      };
    }

    // Rate limiting - 20 submissions per hour per IP
    const clientIP = event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown';
    const now = Date.now();
    const hourAgo = now - (60 * 60 * 1000);
    
    if (submissions.has(clientIP)) {
      const userSubmissions = submissions.get(clientIP).filter(time => time > hourAgo);
      if (userSubmissions.length >= 20) {
        return {
          statusCode: 429,
          body: JSON.stringify({ error: 'Too many submissions. Please try again later.' })
        };
      }
      userSubmissions.push(now);
      submissions.set(clientIP, userSubmissions);
    } else {
      submissions.set(clientIP, [now]);
    }

    // Verify reCAPTCHA
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret) {
      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`
      });
      
      const recaptchaResult = await recaptchaResponse.json();
      if (!recaptchaResult.success) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'reCAPTCHA verification failed' })
        };
      }
    }

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: 'cruzadam91@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    // Email content
    const mailOptions = {
      from: 'cruzadam91@gmail.com',
      to: 'cruzadam91@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Sent from your website contact form</small></p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully!',
        name: name
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 