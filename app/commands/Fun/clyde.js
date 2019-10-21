const snekfetch = require('snekfetch');
module.exports = {
    command:"clyde",
    description: "Make Clyde say something",
    syntax: ")>clyde [text]",
    category: "Fun",
    permission: "sendMessages",
    botPermission: "manageWebhooks",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0] || args[0] === undefined) {
            return msg.channel.createMessage('Nothing for Clyde to say');
        } else {
            snekfetch.get("https://discordapp.com/assets/f78426a064bc9dd24847519259bc42af.png")
            .then(r => {
                let pfp = `data:${r.headers['content-type']};base64,${r.body.toString('base64')}`;
                msg.channel.createWebhook({name: "CIyde", avatar: pfp}).then(w => {
                    let url = `https://canary.discordapp.com/api/webhooks/${w.id}/${w.token}`;
                    snekfetch.post(url)
                    .send({"content": args.join(" ")})
                    .then(r => {
                        bot.deleteWebhook(w.id, w.token)
                        if (msg.channel.permissionsOf(bot.user.id).has("manageMessages")) msg.delete()
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