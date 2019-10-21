module.exports = {
  command:"alien",
  description: "sends a picture of an alien, generated based off of your input",
  syntax: ")>alien [text]",
  category: "Fun",
  permission: "sendMessages",
  botPermission: "embedLinks",
  execute: async (meteor, bot, msg, args) => {
      let robohash = `https://robohash.org/${args[0]}?set=set2`
      if(!args) robohash = `https://robohash.org/${msg.author.id}?set=set2`
      await msg.channel.createMessage({ embed: {color: 0x36393E, author: {name: 'A Unique Robot!', icon_url: msg.author.avatarURL}, image: {url: robohash}}});
  }
}