module.exports = {
  command:"suggest",
  description: "Send the developers a suggestion",
  syntax: ")>suggest",
  category: "Utility",
  permission: "sendMessages",
  botPermission: "sendMessages",
  execute: async (meteor, bot, msg, args) => {
    await msg.channel.createMessage("All suggestions are now reported in our guild. Please come to our server to send suggestions in our suggestions channel. https://discord.gg/J2E8GRM")
  }
}
