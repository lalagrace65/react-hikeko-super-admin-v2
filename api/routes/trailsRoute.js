const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

const Trails = require('../models/Trails');

//POST
router.post('/trails', async (req, res) => {
    const { token } = req.cookies;
    const {
        title,category, 
        description, features, trailLocation, 
        trailClass, difficultyLevel, elevation, 
        trailImages, coordinates
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const trailDoc = await Trails.create({
            trail: userData.id,
            title, category, description, 
            features, trailLocation,
            trailClass, difficultyLevel, 
            elevation, trailImages, coordinates

        });
        res.json(trailDoc);
    });
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



module.exports = router;