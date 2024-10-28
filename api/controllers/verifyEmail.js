const {isValidObjectId} = require('mongoose');
const VerificationToken = require('./models/verificationToken');
const { plainEmailTemplate } = require('../utils/mail');

exports.verifyEmail = async (req, res) => {
    const{userId, otp} = req.body;
    if(!userId || !otp.trim())
    return sendError(res, 'Invalid request, missing parameters')

    if(!isValidObjectId(userId))
    return sendError(res, 'Invalid user id')

    const user = await User.findById(userId);
    if(!user)
    return sendError(res, 'User not found')

    if(user.verified)
    return sendError(res, 'This account is already verified');

    const token =await VerificationToken.findOne({owner: userId})
    if(!token)
    return sendError(res, 'Sorry we could not verify your account');

    const isMatched = await token.compareToken(otp)
    if(!isMatched)
    return sendError(res, 'Please provide a valid token');

    user.verified = true;

    await VerificationToken.findByIdAndDelete(token._id);
    await user.save();

    try {
        const mailOptions = {
            from: 'hikeko.app@gmail.com',
            to: user.email,
            subject: 'Welcome email',
            html: plainEmailTemplate(
                "Email Verified Successfully",
                "Thanks for connecting with us",
            ),
        };
        await mailTransport().sendMail(mailOptions); // Send the email
        console.log("Email Verification sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
    
}