module.exports = {
    command:"restart",
    description: "restart the bot",
    syntax: ")>restart",
    category: "Developer",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute: async (meteor, bot, msg, args) => {
        msg.channel.createMessage('Restarting...').then(m => {
            process.exit()
        })
    }
  }