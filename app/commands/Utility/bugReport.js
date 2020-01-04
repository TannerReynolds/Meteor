module.exports = {
  command:"bug",
  description: "Send a bug report to the developers",
  syntax: ")>bug",
  category: "Utility",
  permission: "sendMessages",
  botPermission: "sendMessages",
  execute: async (meteor, bot, msg, args) => {
    await msg.channel.createMessage("All bug reports are now reported in our guild. Please come to our server to report bugs in our bug-report channel. https://discord.gg/J2E8GRM")
  }
}
