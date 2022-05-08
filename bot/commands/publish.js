// const news = require('../models/news')
// const members = require('../models/members')
require('dotenv').config()

const run = async ({ sendMessage, senderId, args, sendMessageTag }) => {
    // if (senderId !== process.env.ADMIN) {
    //     sendMessage(senderId, `Lệnh chỉ dành cho BTC`)
    //     return
    // }

    // const ddl = await news.findOne({ id: 1 })

    // if (!ddl.status) {
    //     sendMessage(senderId, `Chưa có deadline!`)
    //     return
    // }

    // const eventMember = await members.find({ verify: true })

    // if (args[1] === '!') {
    //     for (const member of eventMember) {
    //         // await sendMessageTag(member.psid, `Xin chào ${member.fullName} (thuộc ban ${member.ban}),\nBTC vừa thông báo Deadline mới:\nTiêu đề: ${ddl.title}\nNội dung: ${ddl.content}\nHạn nạp: ${ddl.deadline}`)

    //         await new Promise(resolve => setTimeout(resolve, 2000))
    //     }
    // } else {
    //     for (const member of eventMember) {
    //         if (member.ban==='LOZ') {
    //             await sendMessageTag(member.psid, `Xin chào ${member.fullName} (thuộc ban ${member.ban}),\nbạn còn một Deadline chưa nạp hoặc chưa hoàn thành xong:\nTiêu đề: ${ddl.title}\nNội dung: ${ddl.content}\nHạn nạp: ${ddl.deadline}\nGhi chú của BNS: ${member.cmt}`)

    //             await new Promise(resolve => setTimeout(resolve, 2000))
    //         }

    //     }
    // }
}

module.exports.run = run

module.exports.name = 'publish'