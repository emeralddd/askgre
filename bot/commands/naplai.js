const members = require('../models/members')
const redis = require('redis')
require('dotenv').config()

const run = async ({sendMessage,senderId}) => {
    const member = await members.findOne({psid:senderId})
    if(!member) {
        sendMessage(senderId, `Tài khoản của bạn chưa được xác minh!`)
        return
    }
    
    if(!member.verify) {
        sendMessage(senderId, `Tài khoản của bạn đang trong quá trình xác minh!`)
        return
    }
    
    if(member.sentMedia.length===0) {
        await sendMessage(senderId, `Không có ảnh gửi từ bạn trong hệ thống!`)
        return
    }

    await sendMessage(senderId, `Bạn có chắc chắn muốn xóa ${member.sentMedia.length} ảnh (video) được lưu trong hệ thống! Nhập Yes để đồng ý! - Yêu cầu có thời hạn trong 30s`)

    const db = redis.createClient({
        url: `redis://${process.env.REDISHOST}`,
        password: process.env.REDISPASS
    })

    await db.connect()

    await db.set(senderId, JSON.stringify({
        "cmd":"naplai",
        "date":((new Date()).getTime())
    }))

    await db.quit()
}

module.exports.run = run

module.exports.name = 'naplai'