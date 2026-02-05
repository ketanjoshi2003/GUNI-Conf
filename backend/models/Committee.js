const mongoose = require('mongoose');

const committeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: { type: String, required: true },
    organization: { type: String },
    email: { type: String },
    type: {
        type: String,
        enum: ['advisory', 'conference-chairs', 'technical-program', 'organizing'],
        required: true
    },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Committee', committeeSchema);
