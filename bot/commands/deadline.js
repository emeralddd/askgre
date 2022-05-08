const task = require('../models/task')
const members = require('../models/members')

const run = async ({sendMessage,senderId}) => {
    const member = await members.findOne({psid:senderId})
    if(!member) {
        sendMessage(senderId, `Tài khoản cần phải được xác minh khi dùng lệnh này!`)
        return
    }
    
    if(!member.verify) {
        sendMessage(senderId, `Tài khoản cần phải được xác minh khi dùng lệnh này!`)
        return
    }

    const annouce = await task.findOne({psid:1})
    
    if(!annouce.active) {
        await sendMessage(senderId,`Hiện tại chưa có deadline mới!`)
    } else {
        await sendMessage(senderId,`Thông tin Deadline:\nTiêu đề: ${annouce.title}\nNội dung: ${annouce.content}\n Hạn nạp: ${annouce.deadline}`)

        await sendMessage(senderId, `Bạn ${member.finished?'đã':'chưa'} nạp deadline này.\nGhi chú: ${member.note}`)
    }
}

module.exports.run = run

module.exports.name = 'deadline'