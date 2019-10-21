module.exports = {
  command: "invite",
  description: "Get an invite for the bot",
  syntax: ")>invite",
  category: "Utility",
  permission: "sendMessages",
  botPermission: "sendMessages",
  execute: async (meteor, bot, msg, args) => {
      msg.channel.createMessage("https://meteorbot.space/invite")
  }
}