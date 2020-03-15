const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLNonNull,
    GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;

const CaseModel = require('../model/case');
const CaseType = require('../dto/case-type').CaseType;
const CasePrototype = require('../dto/case-type').CasePrototype;


exports.cases = {
    type: GraphQLList(CaseType),
    resolve(parent, args) {
        return CaseModel.find({});
    }
};

exports.case = {
    type: GraphQLList(CaseType),
    args: { case_id: { type: GraphQLString } },
    resolve(parent, args, request) {
        console.log(parent, args, request);
        return  CaseModel.find({case_id: args.case_id});
    }
};

exports.create = {
    type: CaseType,
    args: CasePrototype,
    resolve: async (parent, args) => {
        const caseInstance = new CaseModel(args);
        return await caseInstance.save();
    }
};

exports.delete = {
    type: CaseModel,
    args: {case_id : {type: GraphQLString}},
    resolve: async (parent, args, request) => {
        return CaseModel.findOneAndDelete(args);
    }
};

exports.update = {
    type: CaseModel,
    args: CasePrototype,
    resolve: async (parent, args, request) => {
        await CaseModel.findOneAndUpdate({case_id: args.case_id},args);
        return CaseModel.findOne({case_id: args.case_id});
    }
};
