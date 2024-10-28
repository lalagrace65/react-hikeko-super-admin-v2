const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const jwtSecret ="qwertyuiop"

router.post('/login', async (req, res) => {
    const{ email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
        return res.status(400).json(
            { error: "Email and password are required" }
        );
    }

    // Proceed with finding the user if email and password are present
    const userDoc = await User.findOne({ email });

        if (userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password);
            // found password
            if (passOk) {
                jwt.sign({email:userDoc.email, _id:userDoc._id}, jwtSecret, {}, (err, token) => {
                    if(err) throw err;
                    res.cookie('token', token).json(userDoc);
                });          
            } else {
                res.status(422).json('Password not ok');
            }
        } else {
            res.json('User not found');
        }
});

module.exports = router;