const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const universityRoundsSchema = require('./universityRounds');

const admissionsSchema = new Schema({
    year: {type: String},
    numOfChoice: {type: Number},
    rounds: {type: [universityRoundsSchema]},
    programs: {type: [Schema.Types.ObjectId]}
});

module.exports = admissionsSchema;