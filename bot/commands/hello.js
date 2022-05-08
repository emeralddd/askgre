const run = async ({sendMessage,senderId}) => {
    sendMessage(senderId, `Hiii!`)
}

module.exports.run = run

module.exports.name = 'hello'