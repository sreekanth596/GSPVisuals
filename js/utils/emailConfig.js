// Load environment variables
require('dotenv').config({ path: '../../.env' });

// Email configuration
const emailConfig = {
    service: process.env.EMAIL_SERVICE || 'gmail',
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true' || false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    from: process.env.EMAIL_FROM || `"${process.env.EMAIL_USER}"`
};

// Validate required email configuration
const validateEmailConfig = () => {
    const required = ['EMAIL_USER', 'EMAIL_PASSWORD'];
    const missing = required.filter(field => !process.env[field]);
    
    if (missing.length > 0) {
        console.error(`Missing required email configuration: ${missing.join(', ')}`);
        return false;
    }
    return true;
};

// Example function to send an email
const sendEmail = async (to, subject, html) => {
    if (!validateEmailConfig()) {
        throw new Error('Email configuration is incomplete');
    }

    try {
        // Using nodemailer as an example
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport(emailConfig);
        
        const info = await transporter.sendMail({
            from: emailConfig.from,
            to,
            subject,
            html
        });
        
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

// Example function to handle contact form submissions
const sendContactForm = async (formData) => {
    const { name, email, message } = formData;
    
    const emailContent = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
    `;
    
    return sendEmail(
        process.env.CONTACT_FORM_RECIPIENT || process.env.EMAIL_USER,
        process.env.CONTACT_FORM_SUBJECT || 'New Contact Form Submission',
        emailContent
    );
};

module.exports = {
    emailConfig,
    sendEmail,
    sendContactForm,
    validateEmailConfig
};
