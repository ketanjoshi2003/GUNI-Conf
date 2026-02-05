const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    link: { type: String },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);
