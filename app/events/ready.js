async function ready() {
    this.log.success(`Online.`);
    this.log.success(`${this.bot.guilds.size} servers connected`);
    this.log.success(`${this.bot.users.size} users`);
    this.log.success(`${this.bot.shards.size} shards connected`);
    this.log.success(`${this.commands.length} commands loaded`);
    this.log.success(`_______________________________________\n\n`);
  
    // Setting bot status
    this.bot.editStatus("online", {
      name: `)>help | meteorbot.space`,
      type: 0
    });
}
module.exports = ready;