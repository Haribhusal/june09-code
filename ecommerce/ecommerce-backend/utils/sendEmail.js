const nodemailer = require('nodemailer');

// send email to user
async function sendEmail(email, subject, message, html = null) {
    try {
        // Validate email parameter
        if (!email) {
            console.error('Email address is required');
            return;
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: message
        };

        if (html) {
            mailOptions.html = html;
        }

        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${email}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}


// send email to admin
async function sendEmailToAdmin(subject, message, html = null, email = process.env.ADMIN_EMAIL) {
    try {
        // Validate email parameter
        if (!email) {
            console.error('Admin email address is required. Please check ADMIN_EMAIL environment variable.');
            return;
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: message
        };

        if (html) {
            mailOptions.html = html;
        }

        await transporter.sendMail(mailOptions);
        console.log(`Admin email sent successfully to ${email}`);
    } catch (error) {
        console.error('Error sending admin email:', error);
    }
}



module.exports = { sendEmail, sendEmailToAdmin };
