// routes/dashboard.js
const express = require('express');
const router = express.Router();
const { requireRole } = require('../middleware/auth');
const User = require('../models/User');

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

module.exports = router;
