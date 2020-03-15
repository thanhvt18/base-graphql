const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLEnumType, GraphQLNonNull,
    GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;

const SeverityEnumType = require('./enum/severity-enum');
const IncidentTypeEnumType = require('./enum/incident-enum');
const CaseType = require('./case-type').CaseType;

const AlertPrototype = {
    _id: { type: GraphQLString },
    alert_id: { type: GraphQLString },
    severity: { type: SeverityEnumType },
    created: { type: GraphQLInt },
    object: { type: GraphQLString },
    type: { type: IncidentTypeEnumType },
    status: { type: GraphQLString },
    message: { type: GraphQLString },
    linked_case: { type: CaseType },
    source_log:  { type: GraphQLString },
    category: { type: GraphQLString },
    source: { type: GraphQLString },
    owner: { type: GraphQLString },
    organization_group: { type: GraphQLString },
    reason_false_positive: { type: GraphQLString },
    last_updated: { type: GraphQLInt },
    user_update: { type: GraphQLString },
    dst: { type: GraphQLString },
    dpt: { type: GraphQLString },
    rule_id: { type: GraphQLString },
    spt: { type: GraphQLString },
    src: { type: GraphQLString },
    description: { type: GraphQLString },
    attacker: { type: GraphQLString },
    sub_category: { type: GraphQLString },
    timestamp: { type: GraphQLInt },
    incident_id: { type: GraphQLString },
    device_vendor: { type: GraphQLString },
    device_version: { type: GraphQLString },
};

const AlertType = new GraphQLObjectType({
    name: 'alert',
    fields: () => (AlertPrototype),
});

exports.AlertType = AlertType;
exports.AlertPrototype = AlertPrototype;
