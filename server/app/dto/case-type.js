const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLNonNull,
    GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;

const SeverityEnumType = require('./enum/severity-enum');
const IncidentTypeEnumType = require('./enum/incident-enum');

const AlertType = require('./alert-type').AlertType;
const TicketType = require('./ticket-type').TicketType;

const CasePrototype = {
    _id: { type: GraphQLString },
    case_id: { type: GraphQLString },
    title: { type: GraphQLString },
    created: { type: GraphQLInt },
    creator: { type: GraphQLString },
    last_updated: { type: GraphQLInt },
    user_update: { type: GraphQLString },
    type: { type: IncidentTypeEnumType },
    status: { type: GraphQLString },
    severity: { type: SeverityEnumType },
    description: { type: GraphQLString },
    sla: { type: GraphQLInt },
    owner: { type: GraphQLString }
};

const CaseParam = Object.assign(CasePrototype);

const CaseType = new GraphQLObjectType({
    name: 'case',
    fields: () => (CasePrototype),
});

exports.CasePrototype = CasePrototype;
exports.CaseParam = CaseParam;
exports.CaseType = CaseType;
