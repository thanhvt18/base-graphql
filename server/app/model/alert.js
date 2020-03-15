const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alertModel = new Schema({
    alert_id: {
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
    object: String,
    type: {
        type: String,
        enum : ['malware', 'virus', 'baseline', 'phishing', 'ddos', 'xxs']
    },
    status: {
        type: String,
        enum : ['open', 'close'],
        default: 'open'
    },
    message: String,
    linked_case: {
        type: Schema.Types.ObjectId,
        ref: 'case'
    },
    source_log:  String,
    category: String,
    source: String,
    owner: String,
    organization_group: String,
    reason_false_positive: String,
    last_updated: Number,
    user_update: String,
    dst: String,
    dpt: String,
    rule_id: String,
    spt: String,
    src: String,
    description: String,
    attacker: String,
    sub_category: String,
    timestamp: String,
    incident_id: String,
    device_vendor: String,
    device_version: String,
});

alertModel.index({alert_id: 1});

module.exports = mongoose.model('alert', alertModel);
