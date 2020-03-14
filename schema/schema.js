const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString,
    GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;


const AlertType = new GraphQLObjectType({
    name: 'alert',
    fields: () => ({
        _id: { type: GraphQLID },
        alert_id: {type: GraphQLString},
        created: {type: GraphQLInt},
    }),
});

const alertModel = require('../model/alert');

//RootQuery describe how users can use the graph and grab data.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        alerts:{
            type: GraphQLList(AlertType),
            resolve(parent, args) {
                return alertModel.find({});
            }
        },
        alert: {
            type: GraphQLList(AlertType),
            args: { alert_id: { type: GraphQLString } },
            resolve(parent, args) {
                return alertModel.find({alert_id: args.alert_id});
            }
        }
    }
});

//Creating a new GraphQL Schema, with options query which defines query
module.exports = new GraphQLSchema({
    query: RootQuery
});