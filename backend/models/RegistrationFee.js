const mongoose = require('mongoose');

const registrationFeeSchema = new mongoose.Schema({
    type: { type: String, required: true },
    indian: { type: String, required: true },
    foreign: { type: String, required: true },
    order: { type: Number, default: 0 }
});

module.exports = mongoose.model('RegistrationFee', registrationFeeSchema);
