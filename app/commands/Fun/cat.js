const snekfetch = require('snekfetch');
module.exports = {
    command:"cat",
    description: "sends a picture of a cat!",
    syntax: ")>cat",
    category: "Fun",
    permission: "sendMessages",
    botPermission: "embedLinks",
    execute: async (meteor, bot, msg, args) => {
        snekfetch.get('http://aws.random.cat/meow')
        .then(r => {
            let kitty = r.body.file;
            return msg.channel.createMessage({ embed: {color: 0x36393E, author: {name: 'A Wild Kitty Appears!', icon_url: msg.author.avatarURL}, image: {url: kitty}}});
        })
        .catch(e => {
            return msg.channel.createMessage(e);
        });
    }
  }