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
    
    const db = redis.createClient({
        url: `redis://${process.env.REDISHOST}`,
        password: process.env.REDISPASS
    })

    await db.connect()

    let last = await db.get(senderId)

    last=JSON.parse(last)

    const exetime=((new Date().getTime()))-last.date

    console.log(`${last.cmd} + ${exetime}`)

    await db.set(senderId, JSON.stringify({
        cmd:"yes",
        date:((new Date()).getTime())
    }))

    await db.quit()

    if(exetime>30000) {
        await sendMessage(senderId, `Hết thời gian yêu cầu hoặc không có yêu cầu hợp lệ!`)
        return
    }

    console.log(last.cmd)

    if(last.cmd ==='naplai') {
        await members.findOneAndUpdate(
            {psid:senderId},
            {sentMedia:[]},
            {new:true}
        )
        await sendMessage(senderId, `Xóa thành công!`)
    }
    
    if(last.cmd === 'upload') {
        console.log(`abc`)
        await members.findOneAndUpdate(
            {psid:senderId},
            {sentMedia:[...member.sentMedia,...last.video,...last.image]},
            {new:true}
        )

        await sendMessage(senderId, `Nạp thành công ${last.video.length} video và ${last.image.length} ảnh!`)
    }
}

module.exports.run = run

module.exports.name = 'yes'