const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLEnumType,
    GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;

const SeverityEnumType = new GraphQLEnumType({
   name: 'severity',
   values: {
       LOW: {
           value: 'low'
       },
       MEDIUM: {
           value: 'medium'
       },
       HIGH: {
           value: 'high'
       },
       CRITICAL: {
           value: 'critical'
       }
   }
});

module.exports = SeverityEnumType;
