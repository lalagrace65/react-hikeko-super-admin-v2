const express = require('express');
const router = express.Router();

// Logout route
router.post('/logout', (req, res) => {
    res.cookie('token', '', { expires: new Date(0) }); // Clear the token cookie
    res.json('Logged out successfully'); // Send response
});

module.exports = router;