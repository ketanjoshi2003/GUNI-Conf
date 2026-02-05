const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    track: {
        type: String,
        enum: ['computing', 'communication', 'security', 'general'],
        default: 'general'
    },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Topic', topicSchema);
