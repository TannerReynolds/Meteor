const snekfetch = require('snekfetch');
module.exports = {
    command:"dog",
    description: "sends a picture of a dog!",
    syntax: ")>dog",
    category: "Fun",
    permission: "sendMessages",
    botPermission: "embedLinks",
    execute: async (meteor, bot, msg, args) => {
        snekfetch.get('http://random.dog/woof')
        .then(r => {
            let pupper = `http://random.dog/${r.body.toString()}`;
            return msg.channel.createMessage({ embed: {color: 0x36393E, author: {name: 'A Wild Pupper Appears!', icon_url: msg.author.avatarURL}, image: {url: pupper}}});
        })
        .catch(e => {
            return msg.channel.createMessage(e);
        });
    }
  }