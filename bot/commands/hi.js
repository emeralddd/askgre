const run = async ({sendMessage,senderId}) => {
    sendMessage(senderId, `Helloooo!`)
}

module.exports.run = run

module.exports.name = 'hi'