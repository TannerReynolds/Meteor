const snekfetch = require('snekfetch');
module.exports = {
    command:"quote",
    description: "Quote somebody",
    syntax: ")>pixellate | )>pixellate [User Name | User ID | User Mention]",
    category: "Fun",
    permission: "sendMessages",
    botPermission: "manageWebhooks",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0] || args[0] === undefined) {
            return msg.channel.createMessage('You need to give me a user to quote')
        } else if(msg.mentions.length >= 1) {
            let avi = msg.mentions[0].avatarURL;
            let name = msg.mentions[0].username;
            let quote = args.slice(1).join(" ")
            return quoteUser(avi, name, quote);
        } else if(msg.content.match(/[0-9]{16,18}/)) {
            let id = msg.content.match(/[0-9]{16,18}/)[0];
            let avi = bot.users.get(id).avatarURL
            let name = bot.users.get(id).username;
            let quote = args.slice(1).join(" ");
            return quoteUser(avi, name, quote) 
        } else {
            return msg.channel.createMessage('Nothing to quote.');
        }
        async function quoteUser(pfp, username, quote) {
            snekfetch.get(pfp)
            .then(r => {
                let newPfp = `data:${r.headers['content-type']};base64,${r.body.toString('base64')}`;
                msg.channel.createWebhook({name: username, avatar: newPfp}).then(w => {
                    let url = `https://canary.discordapp.com/api/webhooks/${w.id}/${w.token}`;
                    snekfetch.post(url)
                    .send({"content": quote})
                    .then(r => {
                        bot.deleteWebhook(w.id, w.token)
                    })
                    .catch(e => {
                        bot.deleteWebhook(w.id, w.token)
                        console.log(e);
                    })
                })
            })
        }
    }
}