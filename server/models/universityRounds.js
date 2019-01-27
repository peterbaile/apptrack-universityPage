const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const ObjectIdSchema = Schema.ObjectId;

const universityRoundsSchema = new Schema({
    // generate new ID
	// _id: { type: ObjectIdSchema, default: function() {return new ObjectId()}, unique: true },
	_id: {type: mongoose.Schema.Types.ObjectId},
	title: { type: String},
	deadline: { type: Date},
	createdBy: { type: String},
	createdDT: { type: Date},
	modifiedBy: { type: String},
	modifiedDT: { type: Date}
});

module.exports = universityRoundsSchema;