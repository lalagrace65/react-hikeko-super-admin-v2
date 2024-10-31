const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

const Booking = require('../models/Booking');

// GET /bookings; - Get all bookings or a specific bookings); by ID
router.get('/bookings', async (req, res) => {
    console.log('get bookings called');
    try {
        if (req.query.id) {
            const booking = await Booking.findOne({ _id: req.query.id });
            res.json(booking);
        } else {
            const bookings = await Booking.find();
            res.json(bookings);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;