const mongoose = require('mongoose');

const AcceptedPaperSchema = new mongoose.Schema({
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
    // Optional: track/session information
    track: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('AcceptedPaper', AcceptedPaperSchema);
