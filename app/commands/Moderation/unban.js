module.exports = {
    command: "unban",
    description: "unban a member from your guild",
    syntax: ")>unban [User ID]",
    category: "Moderation",
    permission: "banMembers",
    botPermission: "banMembers",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0]) return msg.channel.createMessage('You need to choose somebody to ban.')
        if(isNaN(args[0]) || args[0].length > 18 || args[0].length < 16) return msg.channel.createMessage('Please input a valid ID')
        let reason
        args[1] ? reason = args.slice(1).join(" ") : reason = "No reason provided";
        unbanUser(args[0], reason)
        function unbanUser(id, reason) {
            msg.channel.guild.unbanMember(id, reason).then(m => {
                msg.channel.createMessage(`Successfully unbanned <@${id}>`)
            })
            .catch(e => {
                msg.channel.createMessage(`Had issues when attempting to unban <@${id}>`)
            })
        }
    }
}