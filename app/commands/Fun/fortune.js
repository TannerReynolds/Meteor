module.exports = {
    command: "fortune",
    description: "Open a fortune cookie!",
    syntax: ")>fortune",
    category: "Fun",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute: async (meteor, bot, msg, args) => {
            const rand = require('fortune-cookies')
            rand.fetchCookie()
                .then((cookie) => {
    return client.embed(`${meteor.emojis.cookie} **${cookie}**`, message.channel);})
    }};
