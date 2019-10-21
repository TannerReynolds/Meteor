module.exports = {
    command: "nuke",
    description: "Purge the channel of all messages",
    syntax: ")>nuke",
    category: "Moderation",
    permission: "manageChannels",
    botPermission: "manageChannels",
    execute: async (meteor, bot, msg, args) => {
        if(!msg.channel.guild) return
        let channel = msg.channel;
        let guild = msg.channel.guild;
        let nsfw = channel.nsfw;
        let position = msg.channel.position;
        let name;
        let parent;
        let topic;
        let perms;
        msg.channel.name ? name = msg.channel.name : name = "unkown";
        msg.channel.parentID ? parent = msg.channel.parentID : parent = null;
        msg.channel.topic ? topic = msg.channel.topic : topic = "No Topic";
        msg.channel.permissionOverwrites ? perms = msg.channel.permissionOverwrites : null;
        msg.channel.delete(`Moderator: ${msg.author.username}#${msg.author.discriminator} | Reason: Channel Nuke`).then(deleted => {
            guild.createChannel(name, 0, "Channel Nuking", parent).then(c => {
                c.edit({
                    topic: topic
                }).then(() => {
                    c.editPosition(position).then(() => {
                        let interval = 500;
                        let promise = Promise.resolve();
                        perms.map(p => {
                            promise = promise.then(function () {
                                let allow;
                                let deny;
                                p.allow ? allow = p.allow : allow = 0;
                                p.deny ? deny = p.deny : 0;
                                c.editPermission(p.id, allow, deny, p.type)
                                return new Promise(function (resolve) {
                                    setTimeout(resolve, interval);
                                });
                            });
                        });
                        promise.then(function () {
                            bot.createMessage(c.id, `Finished Nuking! <@${msg.author.id}>`)
                        });
                    })
                })
            })
        })
    }
}