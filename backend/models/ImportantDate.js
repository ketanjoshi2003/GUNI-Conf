const mongoose = require('mongoose');

const importantDateSchema = new mongoose.Schema({
    event: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    order: { type: Number, default: 0 },
    isPinned: { type: Boolean, default: false },
    year: { type: Number, default: 2026 }
}, { timestamps: true });

module.exports = mongoose.model('ImportantDate', importantDateSchema);
