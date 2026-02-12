const mongoose = require('mongoose');

const previousEditionSchema = new mongoose.Schema({
    year: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    link: { type: String },
    coverImage: { type: String },
    indexed: { type: Boolean, default: true },
    publisher: { type: String, default: 'Springer CCIS Series' }
}, { timestamps: true });

module.exports = mongoose.model('PreviousEdition', previousEditionSchema);
