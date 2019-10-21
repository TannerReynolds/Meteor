module.exports = {
    command:"delchannel",
    description: "Deletes the channel that this command was typed in",
    syntax: ")>deletechannel",
    category: "Moderation",
    permission: "manageChannels",
    botPermission: "manageChannels",
    execute:async (bot, msg, args) => msg.channel.delete() }