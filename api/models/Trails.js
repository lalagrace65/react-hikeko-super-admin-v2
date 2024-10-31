const mongoose = require('mongoose');

const TrailSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    features: { type: String, required: true },
    trailLocation: { type: String, required: true },
    trailClass: { type: Number, required: true },
    difficultyLevel: { type: Number, required: true },
    elevation: { type: Number, required: true },
    trailImages: [{ type: String }],
    status: { type: String, default: 'Posted' },
}, {
    timestamps: true,
});

// Create the model
const TrailsModel = mongoose.model('Trails', TrailSchema);

// Export the model
module.exports = TrailsModel;