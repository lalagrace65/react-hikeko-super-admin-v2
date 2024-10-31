// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtSecret = 'wsdfghjkqisoaklfksld'; // Replace with your actual secret

function requireRole(roles) {
    return async (req, res, next) => {
        const { token } = req.cookies;

        // Check for token presence
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - No token provided' });
        }

        // Verify the token
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                return res.status(403).json({ message: 'Access denied - Invalid token' });
            }

            // Check if user role is one of the allowed roles
            if (!roles.includes(userData.role)) {
                return res.status(403).json({ message: 'Access denied - Insufficient permissions' });
            }

            // Attach user data to request for further use
            req.user = userData; // Attach user data to the request
            next(); // Proceed to the next middleware or route handler
        });
    };
}

module.exports = { requireRole, jwtSecret };
