module.exports = {
    command:"robot2",
    description: "generate a unique robot!",
    syntax: ")>robot2 [text]",
    category: "Fun",
    permission: "sendMessages",
    botPermission: "embedLinks",
    execute: async (meteor, bot, msg, args) => {
        let robohash = `https://robohash.org/${args[0]}?set=set3`
        if(!args[0]) robohash = `https://robohash.org/${msg.author.id}?set=set3`
        await msg.channel.createMessage({ embed: {color: 0x36393E, author: {name: 'A Unique Robot!', icon_url: msg.author.avatarURL}, image: {url: robohash}}});
    }
  }