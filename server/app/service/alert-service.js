const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLNonNull,
    GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;

const mongoose = require('mongoose');

const AlertModel = require('../model/alert');
const AlertType = require('../dto/alert-type').AlertType;
const AlertParam = require('../dto/alert-type').AlertParam;


exports.alerts = {
    type: GraphQLList(AlertType),
    resolve(parent, args) {
        delete mongoose.models.alert;
        delete mongoose.modelSchemas.alert;
        return AlertModel.find({}).populate('linked_case');
    }
};

exports.alert = {
    type: GraphQLList(AlertType),
    args: { alert_id: { type: GraphQLString } },
    resolve(parent, args, request) {
        return AlertModel.find({alert_id: args.alert_id}).populate('linked_case');
    }
};

exports.create = {
    type: AlertType,
    args: AlertParam,
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
    args: AlertParam,
    resolve: async (parent, args, request) => {
        await AlertModel.findOneAndUpdate({alert_id: args.alert_id},args);
        return AlertModel.findOne({alert_id: args.alert_id});
    }
};

exports.update_many = {
    type: GraphQLList(AlertType),
    args: AlertParam,
    resolve: async (parent, args, request) => {
        const alert_ids = args.alert_ids;
        delete args.alert_ids;
        const alert_id_arr = alert_ids.split(',').map(alert_id => alert_id.toString().trim());
        await AlertModel.update({alert_id: {$in: alert_id_arr }},args,{multi: true});
        return await AlertModel.find({alert_id: {$in: alert_id_arr }});
    }
};

exports.delete_many = {
    type: GraphQLList(AlertType),
    args: AlertParam,
    resolve: async (parent, args, request) => {
        const alert_ids = args.alert_ids;
        delete args.alert_ids;
        const alert_id_arr = alert_ids.split(',').map(alert_id => alert_id.toString().trim());
        await AlertModel.delete({alert_id: {$in: alert_id_arr }},args,{multi: true});
        return 'sucess';
    }
};
