const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const universityProgramsSchema = new Schema({
    code: {type: String},
    faculty: {type: String},
    course: {type: String},
    createdBy: {type: String},
    createdDT: {type: Date},
    modifiedBy: {type: String},
    modifiedDT: {type: Date}
});

module.exports = mongoose.model('universityprograms', universityProgramsSchema);