const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const Trails = require('../models/Trails');
const jwtSecret ="qwertyuiop"

// Helper function to parse coordinate input
function parseCoordinate(coordinate) {
    if (typeof coordinate === 'string') {
        const regex = /([0-9.]+)[°]?\s*([NSWE])?/i;
        const match = coordinate.match(regex);
        if (match) {
            let value = parseFloat(match[1]);
            const direction = match[2];
            // Adjust value based on direction (N/S for latitude, E/W for longitude)
            if (direction && (direction.toUpperCase() === 'S' || direction.toUpperCase() === 'W')) {
                value = -value;
            }
            return value;
        }
    } else if (typeof coordinate === 'number') {
        return coordinate;
    }
    return null;
}


// POST - Create a new trail
router.post('/trails', async (req, res) => {
    
    const {
        title, description, features, trailLocation, 
        trailClass, difficultyLevel, elevation, trailImages,
        coordinates, region, province
    } = req.body;

    try {
        // Parse latitude and longitude if they are in string format
        const lat = parseCoordinate(coordinates.lat);
        const lng = parseCoordinate(coordinates.lng);

        // Check if parsed coordinates are valid
        if (lat === null || lng === null) {
            return res.status(400).json({ message: 'Invalid coordinates format' });
        }

        // Create a new trail document with parsed coordinates
        const trailDoc = await Trails.create({
            title,
            description,
            trailImages,
            features,
            trailLocation,
            trailClass,
            difficultyLevel,
            elevation,
            coordinates: { lat, lng },
            region,
            province
        });
        res.json(trailDoc);
    } catch (error) {
        console.error('Error creating trail:', error.message);
        res.status(422).json({ message: error.message });
    }
});



// GET /trails - Get all trails or a specific trails by ID
router.get('/trails', async (req, res) => {
    console.log('GET /trails called');
    try {
        if (req.query.id) {
            const trail = await Trails.findOne({ _id: req.query.id });
            res.json(trail);
        } else {
            const trails = await Trails.find();
            res.json(trails);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT
router.put('/trails', async (req, res) => {
    const { token } = req.cookies;
    const {
        id,title,category, 
        description, features, trailLocation, 
        trailClass, difficultyLevel, elevation, 
        trailImages, coordinates
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const trailDoc = await Trails.findById(id);
        if (userData.id === trailDoc.trail.toString()) {
            trailDoc.set({
                title, category, description, 
                features, trailLocation,
                trailClass, difficultyLevel, 
                elevation, trailImages, coordinates,
            });
            await trailDoc.save();
            res.json('Updated successfully');
        }
    });    
});


module.exports = router;