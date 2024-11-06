// routes/dashboard.js
const express = require('express');
const router = express.Router();
const { requireRole } = require('../middleware/auth');
const User = require('../models/User');
const TravelAgencySignUp = require('../models/TravelAgencySignUp');
const Trails = require('../models/Trails');
const Booking = require('../models/Booking');



// Get profile
router.get('/dashboard', requireRole(['super admin']), async (req, res) => {
    // At this point, the token has already been verified by the middleware
    const { user } = req; // Get user data from the middleware
    try {
        const userDoc = await User.findById(user._id);
        if (!userDoc) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { username, email, _id } = userDoc;
        res.json({ username, email, _id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get user counts
router.get('/userCounts',  async (req, res) => {
    console.log("User counts endpoint hit"); // Check if the route is hit
    try {
        const userCount = await User.countDocuments();
        res.status(200).json({ totalUsers: userCount });
    } catch (error) {
        console.error('Error counting users:', error);
        res.status(500).json({ error: 'Failed to count users' });
    }
});

//Get new sign up counts
router.get('/newSignups',  async (req, res) => {
    console.log("new signup endpoint hit"); // Check if the route is hit
    try {
        const newSignup = await TravelAgencySignUp.countDocuments({
            status: 'Pending Verification'
        });
        res.status(200).json({ totalNewSignups: newSignup });
    } catch (error) {
        console.error('Error counting total signups:', error);
        res.status(500).json({ error: 'Failed to count total signups' });
    }
});

//Get count of trails
router.get('/totalTrails',  async (req, res) => {
    console.log("total trails hit"); // Check if the route is hit
    try {
        const trailsCount = await Trails.countDocuments();
        res.status(200).json({ totalTrails: trailsCount });
    } catch (error) {
        console.error('Error counting total trails:', error);
        res.status(500).json({ error: 'Failed to count total trails' });
    }
});

//Get count of booking
router.get('/totalBookings',  async (req, res) => {
    try {
        const bookingsCount = await Booking.countDocuments();
        res.status(200).json({ totalBookings: bookingsCount });
    } catch (error) {
        console.error('Error counting total bookings:', error);
        res.status(500).json({ error: 'Failed to count total bookings' });
    }
});

//Get User partners -TA
router.get('/totalTravelAgencyAccounts',  async (req, res) => {
    try {
        const travelAgencyCount = await User.countDocuments({
            role: 'admin'
        });
        res.status(200).json({ totalTravelAgencyAccounts: travelAgencyCount });
    } catch (error) {
        console.error('Error counting users:', error);
        res.status(500).json({ error: 'Failed to count users' });
    }
});


module.exports = router;
