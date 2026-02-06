const mongoose = require('mongoose');

const committeeSchema = new mongoose.Schema({
    name: { type: String },
    designation: { type: String },
    organization: { type: String },
    email: { type: String },
    type: { type: String, required: true },
    section: { type: String },
    order: { type: Number, default: 0 },
    sectionOrder: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Committee', committeeSchema);
