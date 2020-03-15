const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLEnumType,
    GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;

const IncidentTypeEnumType = new GraphQLEnumType({
    name: 'incidentType',
    values: {
        MALWARE: {
            value: 'malware'
        },
        VIRUS: {
            value: 'virus'
        },
        BASELINE: {
            value: 'baseline'
        },
        PHISHING: {
            value: 'phishing'
        },
        DDOS: {
            value: 'ddos'
        },
        XXS: {
            value: 'xxs'
        }
    }
});

module.exports = IncidentTypeEnumType;
