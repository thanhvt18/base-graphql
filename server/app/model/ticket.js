const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketModel = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ticket_id: {
        type: String,
        unique: true,
        required: true
    },
    severity: {
        type: String,
        enum : ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    created: Number,
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'improcessing', 'suspend',' close']
    },
    type: {
        type: String,
        enum : ['malware', 'virus', 'baseline', 'phishing', 'ddos']
    },
    linked_case: {
        type: Schema.Types.ObjectId,
        ref: 'case'
    },
    assigned_group: String,
    assignee: String,
    description: String,
    last_updated: Number,
    user_update: String
});

module.exports = mongoose.model('ticket', ticketModel);
