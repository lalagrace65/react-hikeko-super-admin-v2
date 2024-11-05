const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    joinerName:{type: String, required: true},
    email: {type: String, required: true},
    contactNumber: {type: String, required: true},
    pickupLocation: {type: String, required: true},
    age: {type: String, required: true},
    sex: {type: String, required: true},
    homeAddress: {type: String, required: true},
    emergencyContactPerson: {type: String, required: true},
    emergencyContactNumber: {type: String, required: true},
    medicalCondition: {type: String, required: true},
    conditionDetails: {type: String, required: false},
    proofOfPayment: {type: String},
    termsAccepted: {type: Boolean, required: true},
    trailId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trail' },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true }, 
    status: { 
        type: String, 
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'Refunded'], 
        default: 'Pending' 
    },
}, 
{timestamps: true}
);

const BookingModel = mongoose.model('Booking', BookingSchema);
module.exports = BookingModel;
