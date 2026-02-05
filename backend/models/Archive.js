const mongoose = require('mongoose');

const archiveSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: String },
    type: { type: String, enum: ['media-coverage', 'glimpses'], required: true },
    image: { type: String },
    link: { type: String },
    order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Archive', archiveSchema);
