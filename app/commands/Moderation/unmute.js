module.exports = {
    command: "unmute",
    description: "Unmute a user, letting them speak in channels they couldnt speak in before. (Only affects channels they can see)",
    syntax: ")>unmute [User Mention | User ID]",
    category: "Moderation",
    permission: "manageMessages",
    botPermission: "manageChannels",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0]) return msg.channel.createMessage('You need to give somebody to unmute');
        if(msg.mentions.length >= 1) {
            let target = msg.mentions[0].id;
            muteUser(target)
        } else if(msg.channel.guild.members.filter(m => m.id === args[0])[0]) {
            muteUser(args[0])
        } else {
            msg.channel.createMessage('No user found to unmute')
        }
        async function muteUser(id) {
            let tc = msg.channel.guild.channels.filter(c => c.permissionsOf(bot.user.id).has('manageChannels') && c.permissionsOf(id).has('readMessages') && !c.permissionsOf(id).has('sendMessages') && c.type === 0);
            if(!tc[0]) return;
            let interval = 300;
            let promise = Promise.resolve();
            tc.forEach(c => {
                promise = promise.then(() => {
                    c.deletePermission(id);
                    return new Promise(function (resolve) {
                        setTimeout(resolve, interval);
                    });
                });
            });
            promise.then(() => {
                msg.channel.createMessage(`Successfully Unmuted <@${id}>`)
            })
        }
    }
}