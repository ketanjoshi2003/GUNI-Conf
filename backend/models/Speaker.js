const mongoose = require('mongoose');

const speakerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: { type: String, required: true },
    organization: { type: String, required: true },
    bio: { type: String },
    image: { type: String },
    year: { type: Number, required: true },
    keynote: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Speaker', speakerSchema);
