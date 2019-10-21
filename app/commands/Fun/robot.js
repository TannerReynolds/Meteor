module.exports = {
    command:"robot",
    description: "generate a unique robot!",
    syntax: ")>robot [text]",
    category: "Fun",
    permission: "sendMessages",
    botPermission: "embedLinks",
    execute: async (meteor, bot, msg, args) => {
        let robohash = `https://robohash.org/${args[0]}`
        if(!args[0]) robohash = `https://robohash.org/${msg.author.id}`
        await msg.channel.createMessage({ embed: {color: 0x36393E, author: {name: 'A Unique Robot!', icon_url: msg.author.avatarURL}, image: {url: robohash}}});
    }
  }