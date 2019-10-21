async function ready() {
    this.log.success(`Online.`);
    this.log.success(`${bot.guilds.size} servers connected`);
    this.log.success(`${bot.users.size} users`);
    this.log.success(`${bot.shards.size} shards connected`);
    this.log.success(`${commands.length} commands loaded`);
    this.log.success(`${startTime} seconds to start`);
    this.log.success(`_______________________________________\n\n`);
  
    // Setting bot status
    bot.editStatus("online", {
      name: `)>help | meteorbot.space`,
      type: 0
    });
}
module.exports = ready;