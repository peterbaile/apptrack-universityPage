const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const admissionsSchema = require('./admissions');
const uniqueValidator = require('mongoose-unique-validator');

const universitiesSchema = new Schema({
    submitType: {type: String},
    email: {type: String},
    portalEmail: {type: String},
    name: {type: String},
    admissions: {type: [admissionsSchema]},
    status: {type: String},
    createdBy: {type: String},
    createdDT: {type: Date},
    modifiedBy: {type: String},
    modifiedDT: {type: Date}
});

// universitiesSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

// collection name = universities
module.exports = mongoose.model('universities', universitiesSchema);