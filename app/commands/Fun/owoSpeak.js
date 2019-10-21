module.exports = {
    command:"owospeak",
    description: "Speak in owo tongue",
    syntax: ")>owospeak [text]",
    category: "Fun",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute: async (meteor, bot, msg, args) => {
        let str = args.join(" ")
        let newStr = str.replace(/(l)/g, "w")
        msg.channel.createMessage(newStr)
    }
  }