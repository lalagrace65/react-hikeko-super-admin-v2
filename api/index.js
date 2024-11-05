const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret ="qwertyuiop"

//imported routes
const registerRoute = require('./routes/registerRoute');
const loginRoute = require('./routes/loginRouter');
const dashboardRoute = require('./routes/dashboardRouter');
const uploadRoute = require('./routes/uploadRoute');
const trailsRoute = require('./routes/trailsRoute');
const usersRoute = require('./routes/usersRouter');
const travelAgencySignUp = require('./routes/travelAgencySignUp');
const travelAgencyAccounts = require('./routes/travelAgencyAccounts');
const bookingsRoute = require('./routes/bookingsRoute');


//use to parse - to get the username
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],

}));

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");

        app.listen(4000, () => console.log("Server is running on http://localhost:4000"));
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

app.get("/", (req, res) => {
    res.send({ message: "Hello Super Admin" });
});


// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URL);

//Use the routes
app.use(registerRoute);
app.use(loginRoute);
app.use(dashboardRoute);
app.use(uploadRoute);
app.use(trailsRoute);
app.use(usersRoute);
app.use(travelAgencySignUp);
app.use(travelAgencyAccounts);
app.use(bookingsRoute);


// Logout route
app.get('/logout', (req, res) => {
    res.cookie('token', '', { expires: new Date(0) }); // Clear the token cookie
    res.json('Logged out successfully'); // Send response
});

startServer();

// app.listen(4000);