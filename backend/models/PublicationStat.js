const mongoose = require('mongoose');

const PublicationStatSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
        unique: true
    },
    rate: {
        type: String, // e.g. "11%"
    },
    totalSubmissions: {
        type: Number,
        required: true,
        default: 0
    },
    acceptedCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('PublicationStat', PublicationStatSchema);
