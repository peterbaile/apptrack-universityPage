const util = require('util');
const mongoose = require('mongoose');
const graphql = require('graphql');
const {
	getGraphQLUpdateArgs,
	getMongoDbUpdateResolver,
	getMongoDbQueryResolver,
	getGraphQLQueryArgs
} = require('graphql-to-mongodb');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLID } = graphql;
const { GraphQLDateTime } = require('graphql-iso-date');
const Universities = require('../models/universities');
const admissionsInput = require('./admissionsType');
const admissionsReturn = require('./admissionsReturnType');
const UniversityPrograms = require('../models/universityPrograms');
const universityProgramsType = require('./universityProgramsType');

const universitiesCommonFields = {
	id: { type: GraphQLID },
	submitType: { type: GraphQLString },
	email: { type: GraphQLString },
	portalEmail: { type: GraphQLString },
	name: { type: new GraphQLNonNull(GraphQLString) },
	status: { type: GraphQLString },
	createdBy: { type: GraphQLString },
	createdDT: { type: GraphQLDateTime },
	modifiedBy: { type: GraphQLString },
	modifiedDT: { type: GraphQLDateTime }
};

// typeName is a string
function indexx(typeName, value, array) {
	var index2 = -1;
	array.map((element, index) => {
		if (element[typeName] == value) {
			index2 = index;
		}
	});
	return index2;
}

// update the original JSON object with the new object
function updatee(originalObj, newObj) {
	for (element in newObj) {
		originalObj[element] = newObj[element];
	}
}

const universitiesInput = {
	...universitiesCommonFields,
	// submitType: {type: GraphQLString},
	// email: {type: GraphQLString},
	// portalEmail: {type: GraphQLString},
	// name: {type: GraphQLString},
	// status: {type: GraphQLString},
	// createdBy: {type: GraphQLString},
	// createdDT: {type: GraphQLString},
	// modifiedBy: {type: GraphQLString},
	// modifiedDT: {type: GraphQLString},
	admissions: { type: new GraphQLList(admissionsInput) }
};

const universitiesReturn = {
	...universitiesCommonFields,
	// submitType: {type: GraphQLString},
	// email: {type: GraphQLString},
	// portalEmail: {type: GraphQLString},
	// name: {type: GraphQLString},
	// status: {type: GraphQLString},
	// createdBy: {type: GraphQLString},
	// createdDT: {type: GraphQLString},
	// modifiedBy: {type: GraphQLString},
	// modifiedDT: {type: GraphQLString},
	admissions: { type: new GraphQLList(admissionsReturn) }
};

const universitiesInputType = new GraphQLObjectType({
	name: 'UniversityInput',
	fields: () => universitiesInput
});

const universitiesReturnType = new GraphQLObjectType({
	name: 'UniversityOutput', // name of the output type
	fields: () => universitiesReturn
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		// return all universities
		universities: {
			type: new GraphQLList(universitiesReturnType),
			args: getGraphQLQueryArgs(universitiesInputType),
			resolve: getMongoDbQueryResolver(universitiesInputType, async (filter, projection, options) => {
				// const id = mongoose.Types.ObjectId(filter.id['$eq']);
				if (filter.id) {
					filter['_id'] = mongoose.Types.ObjectId(filter.id['$eq']);
					delete filter.id;
				};
				const universities = await Universities.find(filter, null, options);
				return universities;
			})
		},

		universityPrograms: {
			type: new GraphQLList(universityProgramsType),
			args: getGraphQLQueryArgs(universityProgramsType),
			resolve: getMongoDbQueryResolver(universityProgramsType, async (filter, projection, options) => {
				return await UniversityPrograms.find(filter, null, options);
			})
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',

	fields: {
		// add a university
		addUniversity: {
			type: universitiesReturnType,
			args: getGraphQLUpdateArgs(universitiesInputType),
			resolve: getMongoDbUpdateResolver(universitiesInputType, async (filter, update) => {
				let unviersity = null;

				if(!update['$set']["name"]){
					throw new Error("Error: Empty Name");
				}

				try {
					update['$set'].createdDT = new Date();
					update['$set'].modifiedDT = new Date();
					unviersity = await Universities.create(update['$set']);
				} catch (err) {
					console.log(err.message);
					throw new Error("Error: Duplicate University Name");
				}

				return unviersity;
			})
		},

		// update a university
		updateUniversity: {
			type: universitiesReturnType,
			args: getGraphQLUpdateArgs(universitiesInputType),
			resolve: getMongoDbUpdateResolver(universitiesInputType, async (filter, update) => {
				
				if(!update['$set']["name"]){
					throw new Error("Error: Empty Name");
				}

				const id = mongoose.Types.ObjectId(filter.id['$eq']);
				console.log("-----Update['$set']-----");
				console.log(update['$set']);
				const inputadmissions = update['$set'].admissions;
				console.log('----InputAdmissions-----');
				console.log(inputadmissions);
				delete update['$set'].admissions;
				await Universities.findByIdAndUpdate(id, update['$set']);
				if (!inputadmissions){
					return Universities.findById(id);
				}
				
				// console.log(update['$set']);
				const obj = await Universities.findById(id, { admissions: 1 });
				const originalAdmissions = obj.admissions;
				console.log('----OriginalAdmissions----');
				console.log(originalAdmissions);

				// determine if originalAdmissions is empty or not
				const size = originalAdmissions.length;
				if (size === 0) {
					await Universities.findByIdAndUpdate(id, { admissions: inputadmissions });
				} else {
					// obtain a list that contains all the existing years
					const admissionYear = [];

					originalAdmissions.map((admission, index) => {
						admissionYear.push(admission.year);
					});
					console.log('----Admission Year----');
					console.log(admissionYear);
					inputadmissions.map((inputadmission) => {
						if (admissionYear.includes(inputadmission.year)) {
							const index = indexx('year', inputadmission.year, originalAdmissions);
							if (inputadmission.numOfChoice) {
								originalAdmissions[index].numOfChoice = inputadmission.numOfChoice;
							}

							// update rounds within originalAdmissions
							if (originalAdmissions[index].rounds.length === 0) {
								originalAdmissions[index].rounds = inputadmission.rounds;
							} else {
								if (inputadmission.rounds) {
									inputadmission.rounds.map((round) => {
										console.log(round.id);
										var index2 = indexx('id', round.id, originalAdmissions[index].rounds);
										console.log(index2);
										if (index2 != -1) {
											updatee(originalAdmissions[index].rounds[index2], round);
											console.log(originalAdmissions[index].rounds[index2]);
										} else {
											originalAdmissions[index].rounds.push(round);
										}
									});
								}
							}

							if (originalAdmissions[index].programs.length === 0) {
								console.log(inputadmission);
								if (inputadmission.programs) {
									inputadmission.programs.map(async (program) => {
										const obj = await UniversityPrograms.create(program);
										// console.log(obj);
										// console.log(obj.id);
										Promise.all([
											originalAdmissions[index].programs.push(mongoose.Types.ObjectId(obj.id))
										]).then(async () => {
											console.log('----After adding program ID----');
											console.log(originalAdmissions[index].programs);
											console.log('----new Admissions-----');
											console.log(originalAdmissions);
											await Universities.findByIdAndUpdate(id, {
												admissions: originalAdmissions
											});
											console.log('----completed----');
										});
										// console.log('----After adding program ID----');
										// console.log(originalAdmissions[index].programs);
									});
								}
							} else {
								if (inputadmission.programs) {
									console.log('----InputAdmission Programs----');
									console.log(inputadmission.programs);
									inputadmission.programs.map(async (program) => {
										await UniversityPrograms.findByIdAndUpdate(program.id, program);
									});
								}
							}
						} else {
							originalAdmissions.push(inputadmission);
						}
					});
				}
				return Universities.findById(id);
			})
		},

		// add a university program
		addUniversityProgram: {
			type: universityProgramsType,
			args: getGraphQLUpdateArgs(universityProgramsType),
			resolve: getMongoDbUpdateResolver(universityProgramsType, async (filter, update) => {
				const universityProgram = await UniversityPrograms.create(update['set']);
				return universityProgram;
			})
		},

		// update a university program
		updateUniversityProgram: {
			type: universityProgramsType,
			args: getGraphQLUpdateArgs(universityProgramsType),
			resolve: getMongoDbUpdateResolver(universitiesInputType, async (filter, update) => {
				const id = update['$set'].id;
				await Universities.findByIdUpdate(id, update['$set']);
				return Universities.findById(id);
			})
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
