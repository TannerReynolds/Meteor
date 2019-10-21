module.exports = {
    command:"kitty",
    description: "generate a unique kitty!",
    syntax: ")>kitty [text]",
    category: "Fun",
    permission: "sendMessages",
    botPermission: "embedLinks",
    execute: async (meteor, bot, msg, args) => {
        let kittyhash = `https://robohash.org/${args[0]}?set=set4`
        if(!args[0]) kittyhash = `https://robohash.org/${msg.author.id}?set=set4`
        await msg.channel.createMessage({ embed: {color: 0x36393E, author: {name: 'A Unique Kitty!', icon_url: msg.author.avatarURL}, image: {url: kittyhash}}});
    }
  }