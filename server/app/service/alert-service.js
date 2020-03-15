const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLNonNull,
    GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;

const AlertModel = require('../model/alert');
const AlertType = require('../dto/alert-type').AlertType;
const AlertPrototype = require('../dto/alert-type').AlertPrototype;


exports.alerts = {
    type: GraphQLList(AlertType),
        resolve(parent, args) {
        return AlertModel.find({});
    }
};

exports.alert = {
    type: GraphQLList(AlertType),
        args: { alert_id: { type: GraphQLString } },
    resolve(parent, args, request) {
        console.log(parent, args, request);
        return  AlertModel.find({alert_id: args.alert_id});
    }
};

exports.create = {
    type: AlertType,
    args: AlertPrototype,
    resolve: async (parent, args) => {
        const alert = new AlertModel(args);
        return await alert.save();
    }
};

exports.delete = {
    type: AlertType,
    args: {alert_id : {type: GraphQLString}},
    resolve: async (parent, args, request) => {
        return await AlertModel.findOneAndDelete(args);
    }
};

exports.update = {
    type: AlertType,
    args: AlertPrototype,
    resolve: async (parent, args, request) => {
        await AlertModel.findOneAndUpdate({alert_id: args.alert_id},args);
        return AlertModel.findOne({alert_id: args.alert_id});
    }
};
