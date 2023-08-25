const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require('nodemailer')

const app = express()
const PORT = process.env.PORT || 5000
const PASS = process.env.PASS
const EMAIL = process.env.EMAIL

require('dotenv').config()

// Middleware
app.use(bodyParser.json())
app.use(cors())

// API endpoint for sending emails
app.post('/api/send-email', async (req, res) => {
    try{
        const { name, email, message } = req.body

        // Create a nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: EMAIL,
                pass: PASS,
            }
        })
    // Email content
    const mailOptions = {
      from: EMAIL,
      to: `${email}`, // Recipient's email
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});