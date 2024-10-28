const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const jwtSecret ="qwertyuiop"

// Get profile
router.get('/dashboard', (req, res) => {
    const { token } = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;

            const { username, email, _id } = await User.findById(userData._id);
            res.json({ username, email, _id });
        });
    }else {
     res.json(null);
    }

});

module.exports = router;