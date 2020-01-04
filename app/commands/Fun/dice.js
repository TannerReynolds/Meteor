module.exports = {
    command: "dice",
    description: "roll the die!",
    syntax: ")>dice",
    category: "Fun",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute: async (meteor, bot, msg, args) => {
        msg.channel.createMessage(`:game_die: You rolled a ${Math.floor(Math.random() * 6) + 1}`)
    }}
