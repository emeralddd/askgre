const mongo = require('mongoose')
const Schema = mongo.Schema

const Task = new Schema({
        id: {
            type: Number
        },
        active: {
            type: Boolean
        },
        title: {
            type: String
        },
        deadline: {
            type: String
        },
        content: {
            type: String
        }
    }
)
module.exports = mongo.model('task',Task)