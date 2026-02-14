const mongoose = require('mongoose');

const homeSectionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: [
            'hero',
            'welcome',
            'about-university',
            'speakers',
            'committees',
            'important-dates',
            'topics',
            'previous-editions',
            'registration-fees',
            'archives',
            'accepted-papers',
            'best-papers',
            'publication-stats',
            'news'
        ]
    },
    title: { type: String }, // Optional custom title
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('HomeSection', homeSectionSchema);
