const members = require('./models/members')
const redis = require('redis')
require('dotenv').config()

const run = async ({sendMessage,senderId,attachments}) => {
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

    let image=[],video=[]

    for(const att of attachments) {
        if(att.type==='image') {
            image.push(att.payload.url)
        } else {
            video.push(att.payload.url)
        }
    }

    if(image.length+video.length>30) {
        await sendMessage(senderId, `Tổng số ảnh (video) bạn mới gửi đã quá số lượng tệp cho phép (30)!`)
        return
    }

    if(image.length+video.length+member.sentMedia.length>30) {
        await sendMessage(senderId, `Tổng số ảnh (video) bạn mới gửi và số ảnh (video) đã được lưu trữ đã quá số lượng tệp cho phép (30)! Nhập lệnh naplai để xóa các ảnh (video) đã lưu trữ rồi thử lại!`)
        return
    }

    const db = redis.createClient({
        url: `redis://${process.env.REDISHOST}`,
        password: process.env.REDISPASS
    })

    await db.connect()

    await db.set(senderId, JSON.stringify({
        cmd:"upload",
        date:((new Date()).getTime()),
        image:image,
        video:video
    }))
    
    await db.quit()

    sendMessage(senderId, `Bạn xác nhận nạp (thêm) ${image.length} ảnh và ${video.length} video? Nhập Yes để xác nhận! Yêu cầu có giới hạn 30 giây!`)
}

module.exports = run