module.exports = {
    respond: async(msg, color, response, {author}) => {
        msg.channel.createMessage({ embed: {
            description: response,
            color: color
        }})
    }
}