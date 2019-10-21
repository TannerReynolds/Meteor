async function guildMemberAdd(guild, member) {
    let guildDB = this.db.get('guilds').find({ id: msg.channel.guild.id }).value();
    if(guildDB !== undefined) {
        if(guildDB.modlogs.enabled === true) {
            this.utils.modlogs.memberJoin(this.bot, guild, member, guildDB.modlogs.channelID)
        }
        if(guildDB.autoRole.enabled === true) {
            guild.addMemberRole(member.id, guildDB.autoRole.roleID)
        }
        if(guildDB.autoNick.enabled === true) {
            member.edit({nick: guildDB.autoNick.name})
        }
    }
}
module.exports = guildMemberAdd;