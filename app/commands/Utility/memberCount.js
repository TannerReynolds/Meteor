module.exports = {
    command:"membercount",
    description: "Get the amount of members that are in the server",
    syntax: ")>membercount",
    category: "Utility",
    permission: "sendMessages",
    botPermission: "embedLinks",
    execute: async (meteor, bot, msg, args) => {
        if(!msg.channel.guild) return;
        let guild = msg.channel.guild;
        let icon
        guild.icon ? icon = guild.iconURL : icon = "https://i.imgur.com/RHagTDg.png"
        msg.channel.createMessage({ embed: {
            color:0x36393E,
            author: {
                icon_url: msg.author.avatarURL,
                name: `${msg.author.username}#${msg.author.discriminator}`
            },
            fields: [
                {name: guild.name, value: `${guild.memberCount} members`}
            ],
            thumbnail: {
                url: icon
            }
        }})
    }
  }