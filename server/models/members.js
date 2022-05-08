const mongo = require('mongoose')
const Schema = mongo.Schema

const Member = new Schema({
        psid: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
        },
        firstName: {
            type: String
        },
        fullName: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true
        },
        verify: {
            type: Boolean,
            required: true
        },
        sentMedia: {
            type: Array
        },
        finished: {
            type: Boolean
        },
        note: {
            type: String
        }
    }
)
module.exports = mongo.model('members',Member)