const { default: axios } = require('axios')
const members = require('../models/members')
require('dotenv').config()

const getProfile = async (psid) => {
    const tmp = await axios.get(`https://graph.facebook.com/v13.0/${psid}`,{
        params: {
            access_token: process.env.TOKEN
        }
    })

    return tmp.data
}

const run = async ({sendMessage,senderId}) => {
    const member = await members.findOne({psid:senderId})
    const profile = await getProfile(senderId)

    if(!member) {
        const addedMember = new members({
            psid:profile.id,
            lastName:profile.last_name,
            firstName:profile.first_name,
            fullName:`${profile.first_name} ${profile.last_name}`,
            department:"null",
            verify:false
        })

        await addedMember.save()

        sendMessage(senderId, `Đã ghi nhận thành công! Vui lòng chờ đợi trong khi BTC xác minh tài khoản!`)
        return
    }

    if(!member.verify) {
        sendMessage(senderId, `Tài khoản của bạn đang trong quá trình xác minh!`)
        return
    }
    
    sendMessage(senderId, `Tài khoản đã được xác minh!`)
}

module.exports.run = run

module.exports.name = 'xacminh'