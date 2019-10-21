async function guildDelete(guild) {
    this.log.verbose(`Guild Left! Now at ${this.bot.guilds.size}`);
    this.util.guildStatus.update(this.bot, this.c, guild, false); // Sends guild join log to monitor channel
}
module.exports = guildDelete;