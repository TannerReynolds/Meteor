async function guildDelete(guild) {
    this.log.verbose(`Guild Left! Now at ${this.bot.guilds.size}`);
    this.util.guildInfo.update(this.bot, this.c, guild, false); // Sends guild join log to monitor channel
}
module.exports = guildDelete;