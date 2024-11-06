const mongoose = require('mongoose');

const TravelAgencySignUpSchema = new mongoose.Schema({
  ownerFirstName: { type: String, required: true },
  ownerLastName: { type: String, required: true },
  businessEmail: { type: String, required: true },
  ownerMobileNum: { type: String, required: true },
  birCertificate: { type: String, required: true },
  businessName: { type: String, required: true },
  businessAddress: { type: String, required: true },
  businessType: { type: String, required: true },
  businessBranch: { type: Number, required: true },
  contactNumber: { type: String, required: true },
  termsAccepted: { type: Boolean, required: true },
  birCertificatePhoto: { type: String, required: true },
  dtiPermitPhoto: { type: String, required: true },
  businessPermitPhoto: { type: String, required: true },
  mayorsPermitPhoto: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending Verification', 'Approved', 'Rejected'], 
    default: 'Pending Verification' 
  },
  emailVerified: { type: Boolean, default: false },
  verificationToken: { type: String },

}, { timestamps: true });


// Create the model
const TravelAgencySignUpModel = mongoose.model('TravelAgencySignUp', TravelAgencySignUpSchema);

// Export the model
module.exports = TravelAgencySignUpModel;
