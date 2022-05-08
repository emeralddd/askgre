const run = async ({sendMessage,senderId}) => {
    sendMessage(senderId, `Pong!`)
}

module.exports.run = run

module.exports.name = 'ping'