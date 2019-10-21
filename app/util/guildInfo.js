module.exports = {
  update:async (bot, c, guild, type) => {
    let guildState = type ? "New Guild Joined" : "Guild Left";
      bot.createMessage(c.guildStatChannel, { embed: {
        color: 0x36393E, description: `${guildState}, now at ${bot.guilds.size} guilds!`,
        fields: [
          { name: 'GuildID', value: `${guild.id}` },
          { name: 'Owner', value: `${guild.ownerID}` },
          { name: 'Region', value: `${guild.region}` },
          { name: 'Member Count', value: `${guild.memberCount}` },
          { name: 'Shard', value: `${guild.shard.id}` }
        ],
        footer: { text: `${guild.name}`, },
        thumbnail: { url: guild.iconURL ? guild.iconURL : `http://is2.mzstatic.com/image/thumb/Purple128/v4/b1/9b/6c/b19b6c17-4e81-d800-3d1e-c0935f5ec5ba/source/300x300bb.jpg` }
      }});
  }
}
