module.exports = {
    command: "massresetnicks",
    description: "mass reset nicknames for people on your guild",
    syntax: ")>massresetnicks",
    category: "Moderation",
    permission: "administrator",
    botPermission: "manageNicknames",
    execute: async (meteor, bot, msg, args) => {
        let interval = 1000;
        let promise = Promise.resolve();
        msg.channel.createMessage("Now mass resetting nicknames")
        msg.channel.guild.members.filter(m => m.nick).forEach(m => {
            promise = promise.then(() => {
                if(m.nick) {
                    m.edit({nick: ""});
                }
                return new Promise(resolve => {
                    setTimeout(resolve, interval);
                });
            });
        });
        promise.then(() => {
            msg.channel.createMessage(`Finished resetting nicknames! <@${msg.author.id}>`)
        });
    }
}