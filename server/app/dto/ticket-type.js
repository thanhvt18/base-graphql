const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString,
    GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;

const SeverityEnumType = require('./enum/severity-enum');
const IncidentTypeEnumType = require('./enum/incident-enum');
const CaseType = require('./case-type').CaseType;

const TicketPrototype = {
    _id: { type: GraphQLString },
    ticket_id: { type: GraphQLString },
    severity: { type: SeverityEnumType },
    created: { type: GraphQLInt },
    title: { type: GraphQLString },
    status: { type: GraphQLString },
    type: { type: IncidentTypeEnumType },
    linked_case: { type: CaseType },
    assigned_group: { type: GraphQLString },
    assignee: { type: GraphQLString },
    description: { type: GraphQLString },
    last_updated: { type: GraphQLInt },
    user_update: { type: GraphQLString }
};

const TicketType = new GraphQLObjectType({
    name: 'ticket',
    fields: () => (TicketPrototype),
});

exports.TicketType = TicketType;
exports.TicketPrototype = TicketPrototype;
