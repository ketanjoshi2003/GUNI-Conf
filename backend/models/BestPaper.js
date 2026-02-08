const mongoose = require('mongoose');

const BestPaperSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    paperId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    authors: {
        type: String,
        required: true
    },
    institution: {
        type: String,
        default: ''
    },
    awardName: {
        type: String, // e.g., "Best Paper", "Best Student Paper"
        default: 'Best Paper'
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('BestPaper', BestPaperSchema);
