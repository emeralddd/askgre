const members = require('../models/members')
require('dotenv').config()

const run = async ({sendMessage,senderId}) => {
    const allowed = ['5793221354028013']

    if(!allowed.includes(senderId)) {
        sendMessage(senderId,`Lệnh chỉ dành cho BTC`)
        return
    }

    await members.updateMany(
        {verify:true},
        {sentMedia:[],finished:false,note:""}
    )

    await sendMessage(senderId,`Thành công!`)
}

module.exports.run = run

module.exports.name = 'reset'