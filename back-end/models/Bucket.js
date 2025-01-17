const mongoose = require('mongoose');

const bucketSchema = mongoose.Schema({
    city: { type: String, required: true },
    country: { type: String, required: true },
    year: { type: Number, required: true },
    duration: { type: Number, required: true },
    unit: { type: String, required: true }
});

module.exports = mongoose.model('Bucket', bucketSchema);