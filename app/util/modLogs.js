module.exports = {
    msgDeleteLog:async (bot, msg, channelID) => {
        if(!msg.author.avatarURL) msg.author.avatarURL = 'https://s3.amazonaws.com/files.enjin.com/292623/Web_Dev/images/discord-icon-7.png'
        bot.createMessage(channelID, {embed: {
            color: 0x36393E,
            author: {name: `${msg.author.username}#${msg.author.discriminator} | ID: ${msg.author.id}`, icon_url: msg.author.avatarURL},
            fields: [
                {name: 'Message Deleted', value: `\`\`\`\n${msg.content}\n\`\`\``},
                {name: "Channel", value: msg.channel.name}
            ]
        }})
    },
    memberJoin:async (bot, guild, member, channelID) => {
        if(!member.avatarURL) member.avatarURL = 'https://s3.amazonaws.com/files.enjin.com/292623/Web_Dev/images/discord-icon-7.png'
        bot.createMessage(channelID, {embed: {
            color: 0x36393E,
            title: "Member Join",
            author: {name: `${member.username}#${member.discriminator} | ID: ${member.id}`, icon_url: member.avatarURL}
        }})
    },
    memberLeave:async (bot, guild, member, channelID) => {
        if(!member.avatarURL) member.avatarURL = 'https://s3.amazonaws.com/files.enjin.com/292623/Web_Dev/images/discord-icon-7.png'
        bot.createMessage(channelID, {embed: {
            color: 0x36393E,
            title: "Member Leave",
            author: {name: `${member.username}#${member.discriminator} | ID: ${member.id}`, icon_url: member.avatarURL}
        }})
    },
    banAdd:async (bot, guild, user, channelID) => {
        await guild.getAuditLogs(1).then(l => {
            let reason;
            l.entries[0].reason ? reason = l.entries[0].reason : "No reason provided";
            let moderator = l.users.filter(u => u.id !== user.id)[0];
            moderator = bot.users.get(moderator.id);
            moderator = {
                tag: `${moderator.username}#${moderator.discriminator}`,
                avi: moderator.avatarURL
            };
            sendLog(reason, moderator)
        }).catch(e => {
            let moderator = {
                tag: "unknown moderator",
                avi: "https://d1qb2nb5cznatu.cloudfront.net/startups/i/90183-bed46f22aafe8af7dc65cdd73fff2f76-medium_jpg.jpg?buster=1481325396"
            }
            sendLog("No Reason Provided", moderator)
        })
        function sendLog(r, m) {
            bot.createMessage(channelID, {embed: {
                color: 0x36393E,
                author: {name: m.tag, icon_url: m.avi},
                fields: [
                    {name: "User Banned", value: `${user.username}#${user.discriminator} | ID: ${user.id}`},
                    {name: "Reason For Ban", value: r}
                ]
            }})
        }
    },
    banRemove:async (bot, guild, user, channelID) => {
        await guild.getAuditLogs(1).then(l => {
            let reason;
            l.entries[0].reason ? reason = l.entries[0].reason : "No reason provided";
            let moderator = l.users.filter(u => u.id !== user.id)[0];
            moderator = bot.users.get(moderator.id);
            moderator = {
                tag: `${moderator.username}#${moderator.discriminator}`,
                avi: moderator.avatarURL
            };
            sendLog(reason, moderator)
        }).catch(e => {
            let moderator = {
                tag: "unknown moderator",
                avi: "https://d1qb2nb5cznatu.cloudfront.net/startups/i/90183-bed46f22aafe8af7dc65cdd73fff2f76-medium_jpg.jpg?buster=1481325396"
            }
            sendLog("No Reason Provided", moderator)
        })
        function sendLog(r, m) {
            bot.createMessage(channelID, {embed: {
                color: 0x36393E,
                author: {name: m.tag, icon_url: m.avi},
                fields: [
                    {name: "User Unbanned", value: `${user.username}#${user.discriminator} | ID: ${user.id}`},
                    {name: "Reason For Unban", value: r}
                ]
            }})
        }
    },

}