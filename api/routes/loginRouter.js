// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const jwtSecret = 'qwertyuiop';

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const userDoc = await User.findOne({ email });

    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign(
                {
                    email: userDoc.email,
                    _id: userDoc._id,
                    username: userDoc.username,
                    role: userDoc.role,
                },
                jwtSecret,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token, { httpOnly: true }).json({
                        email: userDoc.email,
                        id: userDoc._id,
                        username: userDoc.username,
                        role: userDoc.role,
                    });
                }
            );
        } else {
            res.status(422).json('Incorrect password');
        }
    } else {
        res.status(404).json('User not found');
    }
});

module.exports = router;
