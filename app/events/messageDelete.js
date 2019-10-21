async function messageDelete(msg) {
    let guildDB = this.db.get('guilds').find({ id: msg.channel.guild.id }).value();
    if(guildDB !== undefined) {
        if(guildDB.modlogs.enabled === true) {
            this.utils.modlogs.messageDeleteLog(this.bot, msg, guildDB.modlogs.channelID)
        }
    }
}
module.exports = messageDelete;