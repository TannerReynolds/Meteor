async function guildCreate(guild) {
    this.log.success(`Guild Joined! Now at ${this.bot.guilds.size}`);
    this.util.guildInfo.update(this.bot, this.c, guild, true); // Sends guild join log to monitor channel
}
module.exports = guildCreate;