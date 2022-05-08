const mongo = require('mongoose')
const Schema = mongo.Schema

const User = new Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        departments: {
            type: Array,
            required: true
        },
        permission: {
            type: String,
            required: true
        },
        dateCreated: {
            type: Date,
            default: Date.now(),
            required: true
        }
    }
)
module.exports = mongo.model('users',User)