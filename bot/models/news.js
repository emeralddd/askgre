const mongo = require('mongoose')
const Schema = mongo.Schema

const NEWS = new Schema({
        id: {
            type: Number
        },
        status: {
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
module.exports = mongo.model('news',NEWS)