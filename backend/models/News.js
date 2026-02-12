const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    link: { type: String },
    date: { type: Date, default: Date.now },
    year: { type: Number, default: 2026 }
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);
