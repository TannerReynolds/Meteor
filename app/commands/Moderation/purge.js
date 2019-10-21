module.exports = {
    command: "purge",
    description: "Delete up to 100 messages at a time",
    syntax: ")>purge [number] [User Mention | User ID | bots]",
    category: "Moderation",
    permission: "manageMessages",
    botPermission: "manageMessages",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0] || args[0] === undefined || parseInt(args[0]) > 100 || parseInt(args[0]) < 3 || isNaN(parseInt(args[0]))) {
            return msg.channel.createMessage('Please input a number between 3 and 100');
        }
        let msgNum = parseInt(args[0]);
        msgNum >= 100 ? msgNum = 99 : msgNum = msgNum 
        if(!args[0]) return msg.channel.createMessage('You need to at least enter a number of messages to purge.')
        if(args[1].toLowerCase() === "bots") {
            function botFilter(msg) {
                if(msg.author.bot) return true;
            }
            purge(msgNum, botFilter)
        } else if(msg.content.match(/[0-9]{16,18}/)) {
            let usr = msg.content.match(/[0-9]{16,18}/)[0];
            function memberFilter(msg) {
                if(msg.author.id === usr) return true;
            }
            purge(msgNum, memberFilter)
        } else if(msg.mentions.length >= 1) {
            let usr = msg.mentions[0].id
            function memberFilter(msg) {
                if(msg.author.id === usr) return true;
            }
            purge(msgNum, memberFilter)
        } else {
            purge(msgNum, undefined);
        }
        function purge(msgNum, filter) {
            if(filter === undefined) {
                msg.channel.purge(msgNum + 1).then(() => {
                    msg.channel.createMessage(`${args[0]} messages have been purged`).then(m => {
                        setTimeout(() => {
                            m.delete();
                        }, 3000)
                    })
                })
            } else {
                msg.channel.purge(msgNum + 1, filter).then(() => {
                    msg.channel.createMessage(`${args[0]} messages have been purged`).then(m => {
                        setTimeout(() => {
                            m.delete();
                        }, 3000)
                    })
                })
            }
        }
    }
}