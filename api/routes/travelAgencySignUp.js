const express = require('express');
const router = express.Router();
const TravelAgencySignUp = require('../models/TravelAgencySignUp');
    
// GET 
router.get('/travelAgencySignUp', async (req, res) => {
    console.log('GET ta users; called');
    try {
        if (req.query.id) {
            const user = await TravelAgencySignUp.findOne({ _id: req.query.id });
            res.json(user);
        } else {
            const users = await TravelAgencySignUp.find();
            res.json(users);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
