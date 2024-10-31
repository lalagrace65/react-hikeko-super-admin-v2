const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();


const User = require('../models/User');

const bcryptSalt = bcrypt.genSaltSync(10);

//POST
router.post('/register', async (req, res) => {
    const{ username, email, password } = req.body;
    try{
        // Create new user
        const userDoc = await User.create({ 
            username, 
            email, 
            password:bcrypt.hashSync(password, bcryptSalt),
        });

        
        // Send back created user
        res.json(userDoc);
    } catch(e) {
        res.status(422).json(e);
    }
    
});

module.exports = router;