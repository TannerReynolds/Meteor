module.exports = {
    command: "dehoist",
    description: "dehoists people",
    syntax: ")>dehoist",
    category: "Moderation",
    permission: "manageNicknames",
    botPermission: "manageNicknames",
    execute: async (meteor, bot, msg, args) => {
        msg.channel.createMessage(`Now dehoisting bad hoisters...`)
        let hoistings = /^[a-z1-9]/i
        msg.channel.guild.members.map(m => {
            try {
                if(m.nick) {
                    if(!m.nick.match(hoistings) || !m.username.match(hoistings)) {
                        m.edit({nick: "Bad Hoister"})
                    } 
                } else {
                    if(!m.username.match(hoistings)) {
                        m.edit({nick: "Bad Hoister"})
                    }
                }
            } catch(e) {
                msg.channel.createMessage(`Could not dehoist <@${m.id}>`)
            }
        })
    }
}