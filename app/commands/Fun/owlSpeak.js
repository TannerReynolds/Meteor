module.exports = {
    command:"owlspeak",
    description: "Speak in owl tongue",
    syntax: ")>owlspeak [text]",
    category: "Fun",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute: async (meteor, bot, msg, args) => {
        let str = args.join(" ")
        let newStr = str.replace(/\b[^\d\W]+\b/g, "hoot")
        msg.channel.createMessage(newStr)
    }
  }