module.exports = {
    parse: async(bot, msg, args, renderImage) => {
        if(msg.attachments.length >= 1) {
            let img = msg.attachments[0].proxy_url;
            renderImage(img);
        } else if(!args[0] || args[0] === undefined && msg.attachments.length === 0) {
            return renderImage(msg.author.avatarURL)
        } else if(msg.content.match(/\bhttps?:\/\/\S+/i)) {
            let img = msg.content.match(/\bhttps?:\/\/\S+/i)[0];
            return renderImage(img)
        } else if(msg.content.match(/<a:\S{1,}:[0-9]{16,18}>/)) {
            let emoji = `https://cdn.discordapp.com/emojis/${msg.content.match(/<a:\S{1,}:[0-9]{16,18}>/)[0].replace(/<|a|:\S{1,}:|>/g, "")}.gif`
            renderImage(emoji)
        } else if(msg.content.match(/<:\S{1,}:[0-9]{16,18}>/)) {
            let emoji = `https://cdn.discordapp.com/emojis/${msg.content.match(/<:\S{1,}:[0-9]{16,18}>/)[0].replace(/<|:\S{1,}:|>/g, "")}.png`
            renderImage(emoji)
        } else if(msg.mentions.length >= 1) {
            let avi;
            if(msg.mentions.length >= 2) {
                let usr = msg.mentions.filter(u => u.id !== "403854965191344139") [0];
                avi = usr.avatarURL;
                return renderImage(avi);
            } else {
                avi = msg.mentions[0].avatarURL;
                return renderImage(avi);
            }
        } else if(msg.content.match(/[0-9]{16,18}/)) {
            let id = msg.content.match(/[0-9]{16,18}/)[0];
            let avi = bot.users.get(id).avatarURL
            return renderImage(avi) 
        } else {
            let name = args.join(" ").toLowerCase();
            try {
                if(msg.channel.guild.members.get(msg.author.id) && msg.channel.guild.members.filter(m => m.username.toLowerCase() === name)) {
                    let avi = msg.channel.guild.members.filter(m => m.username.toLowerCase() === name )[0].avatarURL;
                    return renderImage(avi)
                }
            } catch (e) {
                return msg.channel.createMessage('No image inputted');
            }
        }
    }
}