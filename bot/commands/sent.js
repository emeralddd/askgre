const members = require('../models/members')
require('dotenv').config()

const run = async ({sendMessage,sendMessageAttachments,senderId}) => {
    // console.log(senderId)

    const member = await members.findOne({psid:senderId})
    if(!member) {
        sendMessage(senderId, `Tài khoản của bạn chưa được xác minh!`)
        return
    }
    
    if(!member.verify) {
        sendMessage(senderId, `Tài khoản của bạn đang trong quá trình xác minh!`)
        return
    }

    if(member.sentMedia.length === 0) {
        await sendMessage(senderId, `Chưa gửi ảnh!`)
        return
    }

    await sendMessage(senderId, `Đã gửi ${member.sentMedia.length} ảnh.\nURL: ${process.env.clientURL}/single/${member._id}`)
}

module.exports.run = run

module.exports.name = 'sent'