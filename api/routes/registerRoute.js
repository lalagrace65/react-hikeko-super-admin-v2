const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const nodemailer = require('nodemailer');

const User = require('../models/User');
const VerificationToken = require('../models/verificationToken');
const { generateOTP, mailTransport, generateEmailTemplate } = require('../utils/mail');

const bcryptSalt = bcrypt.genSaltSync(10);

//POST
router.post('/register', async (req, res) => {
    const{ username, email, password } = req.body;
    try{
        // Create new user
        const userDoc = await User.create({ 
            username, 
            email, 
            password:bcrypt.hashSync(password, bcryptSalt),
        });

        //after creating user it will generate token for otp    
        const OTP = generateOTP();
        const verificationToken = new VerificationToken({ 
            owner: userDoc._id, 
            token: OTP 
        })
        await verificationToken.save();

        try {
            const mailOptions = {
                from: 'hikeko.app@gmail.com',
                to: userDoc.email,
                subject: 'Verify your email account',
                html: generateEmailTemplate(OTP),
            };
            await mailTransport().sendMail(mailOptions); // Send the email
            console.log("Email sent successfully");
        } catch (error) {
            console.error("Error sending email:", error);
        }

        // Send back created user
        res.json(userDoc);
    } catch(e) {
        res.status(422).json(e);
    }
    
});

module.exports = router;