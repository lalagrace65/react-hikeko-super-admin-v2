const mongoose = require('mongoose');

const TrailSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    features: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    trailClass: { type: Number, required: true },
    difficultyLevel: { type: Number, required: true },
    elevation: { type: Number, required: true },
    trailImages: [{ type: String }],
    coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    status: { type: String, default: 'Posted' },
}, {
    timestamps: true,
});

// Create the model
const TrailsModel = mongoose.model('Trails', TrailSchema);

// Export the model
module.exports = TrailsModel;