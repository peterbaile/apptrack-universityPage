const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLID } = graphql;
const { GraphQLDateTime } = require('graphql-iso-date');
const universityProgramsType = require('./universityProgramsType');

const AdmissionsInputType = new GraphQLObjectType({
	name: 'AdmissionsInput',
	fields: () => ({
		year: { type: GraphQLString },
		numOfChoice: { type: GraphQLInt },
		rounds: {
			type: new GraphQLList(
				new GraphQLObjectType({
					name: 'UniversityRounds',
					fields: () => ({
						id: { type: GraphQLID },
						title: { type: GraphQLString },
						deadline: { type: GraphQLDateTime },
						createdBy: { type: GraphQLString },
						createdDT: { type: GraphQLDateTime },
						modifiedBy: { type: GraphQLString },
						modifiedDT: { type: GraphQLDateTime }
					})
				})
			)
		},
		programs: { type: new GraphQLList(universityProgramsType) }
	})
});

module.exports = AdmissionsInputType;
