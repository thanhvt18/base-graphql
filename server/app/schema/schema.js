const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLNonNull,
    GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;

const alertService = require('../service/alert-service');
const caseService = require('../service/case-service');

//RootQuery describe how users can use the graph and grab data.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        alerts: alertService.alerts,
        alert: alertService.alert,
        cases: caseService.cases,
        case: caseService.case,
    }
});

const RootMutation = new GraphQLObjectType({
    name: 'RootMuationType',
    fields: {
        create_alert: alertService.create,
        update_alert: alertService.update,
        update_alerts: alertService.update_many,
        delete_alert: alertService.delete,
        create_case: caseService.create,
        update_case: caseService.update,
        delete_case: caseService.delete
    }
});

//Creating a new GraphQL Schema, with options query which defines query
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});
