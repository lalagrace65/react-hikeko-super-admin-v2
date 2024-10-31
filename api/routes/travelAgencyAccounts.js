const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /users - Get all users or a specific user by ID
router.get('/travelAgencyAccounts', async (req, res) => {
    console.log('GET travelAgency Accounts');
    try {
        if (req.query.id) {
            const user = await User.findOne({ _id: req.query.id });
            res.json(user);
        } else {
            const users = await User.find();
            res.json(users);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
