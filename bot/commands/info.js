const members = require('../models/members')

const run = async ({sendMessage,senderId}) => {
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

    sendMessage(senderId, `Thông tin thành viên:\nHọ tên đầy đủ: ${member.fullName}\nBan: ${member.department}\nID Thành viên: ${member._id}`)
}

module.exports.run = run

module.exports.name = 'info'