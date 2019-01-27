const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const { GraphQLDateTime } = require('graphql-iso-date');

const UniversityProgramType = new GraphQLObjectType({
	name: 'UniversityPrograms',
	fields: () => ({
		id: { type: GraphQLID },
		code: { type: GraphQLString },
		faculty: { type: GraphQLString },
		course: { type: GraphQLString },
		createdBy: { type: GraphQLString },
		createdDT: { type: GraphQLDateTime },
		modifiedBy: { type: GraphQLString },
		modifiedDT: { type: GraphQLDateTime }
	})
});

module.exports = UniversityProgramType;
