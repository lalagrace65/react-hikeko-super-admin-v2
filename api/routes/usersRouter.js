const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /users - Get all users or a specific user by ID
router.get('/users', async (req, res) => {
    console.log('GET /users called');
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
