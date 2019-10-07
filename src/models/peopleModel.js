let mongoose = require('mongoose');

// Setup schema
let peopleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    create_date: {
        type: Date,
        default: Date.now
    },
    groups: Array
});

// Export People model
let People = module.exports = mongoose.model('People', peopleSchema);
module.exports.get = function (callback, limit) {
    People.find(callback).limit(limit);
}