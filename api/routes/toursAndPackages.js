const express = require('express');
const router = express.Router();
const Package = require('../models/Packages');

//Get all packages
router.get('/toursAndPackages', async (req, res) => {
    console.log('Tours and packages called');
    try {
        if (req.query.id) {
            const package = await Package.findOne({ _id: req.query.id });
            res.json(package);
        } else {
            const packages = await Package.find();
            res.json(packages);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
