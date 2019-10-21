async function messageUpdate(msg) {
    let channelDB = this.db.get('channels').find({ id: msg.channel.id }).value();
    let guildDB = this.db.get('guilds').find({ id: msg.channel.guild.id }).value();
    
    if(channelDB !== undefined) {
        if(channelDB.linkBlock === true) {
            if(msg.content.match(/\bhttps?:\/\/\S+/i)) {
                let manageMessages = msg.channel.permissionsOf(bot.user.id).has("manageMessages");
                let moderator = msg.channel.permissionsOf(msg.author.id).has("banMembers")
                if(moderator) return;
                if(!manageMessages) return;
                msg.delete().then(m => {
                  msg.channel.createMessage(`Sorry <@${msg.author.id}>, all links have been blocked in this channel by an administrator`)
                })
            }
        }
    }

    if(guildDB !== undefined) {
        if(guildDB.adblock === true) {
            if(msg.content.match(/\b(?:https?:\/\/)?discord(?:app)?\.(?:com\/invite\/|gg)+\/*([A-Za-z_0-9]+)/g)) {
                let mod = msg.channel.permissionsOf(msg.author.id).has("banMembers");
                let canDelete = msg.channel.permissionsOf(bot.user.id).has("manageMessages");
                if(mod) return;
                if(!canDelete) return;
                msg.delete().then(m => {
                  msg.channel.createMessage(`<@${msg.author.id}> Please do not post invite links again.`)
                })
            }
        }
    }
}
module.exports = messageUpdate;