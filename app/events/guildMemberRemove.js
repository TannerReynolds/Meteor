async function guildMemberAdd(guild, member) {
    let guildDB = this.db.get('guilds').find({ id: msg.channel.guild.id }).value();
    if(guildDB !== undefined) {
        if(guildDB.modlogs.enabled === true) {
            this.utils.modlogs.memberLeave(this.bot, guild, member, guildDB.modlogs.channelID)
        }
    }
}
module.exports = guildMemberAdd;