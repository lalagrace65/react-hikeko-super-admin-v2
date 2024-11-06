const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();
const Booking = require('../models/Booking');
const Package = require('../models/Packages');

// GET /bookings - Get all bookings or a specific booking by ID
router.get('/bookings', async (req, res) => {
    console.log('get bookings called');
    try {
        if (req.query.id) {
            const booking = await Booking.findOne({ _id: req.query.id })
                .populate({
                    path: 'packageId',
                    populate: [
                        {
                            path: 'trailId',
                            model: 'Trails'
                        },
                        {
                            path: 'travelAgency',
                            model: 'User'
                        }
                    ]
                });
            res.json(booking);
        } else {
            const bookings = await Booking.find()
                .populate({
                    path: 'packageId',
                    populate: [
                        {
                            path: 'trailId',
                            model: 'Trails'
                        },
                        {
                            path: 'travelAgency',
                            model: 'User'
                        }
                    ]
                });
            res.json(bookings);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;