module.exports = {
    command: "setstatus",
    description: "Set the bot status",
    syntax: ")>setstatus [text]",
    category: "Developer",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute: async (meteor, bot, msg, args) => {
        bot.editStatus('online', {name: args.join(" "), type: 2, url: "https://meteorbot.space"});
        msg.channel.createMessage('Successfully set status!');
    }
}