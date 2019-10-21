module.exports = {
    command: "rolegive",
    description: "give somebody a role",
    syntax: ")>rolegive [User ID | User Mention] | [Role name]",
    category: "Moderation",
    permission: "manageRoles",
    botPermission: "manageRoles",
    execute: async (meteor, bot, msg, args) => {
        let target = null;
        let targetRole = null;
        roleArgs = args.join(" ").split(/ *\| */);
        if(!args) return msg.channel.createMessage('You did not say anything. The syntax is ")>rolegive (user mention or user id) | (name role to give)"');
        if(!roleArgs[1]) return msg.channel.createMessage('You did not specify a role to give. The syntax is ")>rolegive (user mention or user id) | (name role to give)"');
        if(!msg.channel.guild.roles.filter(r => r.name === roleArgs[1])[0]) return msg.channel.createMessage('Could not find this role');
        targetRole = msg.channel.guild.roles.filter(r => r.name === roleArgs[1])[0].id;
        if(msg.mentions.length >= 1) {
            target = msg.mentions[0].id;
            msg.channel.guild.addMemberRole(target, targetRole).catch(e => {
                return msg.channel.createMessage('Could not give this role');
            });
            return msg.channel.createMessage(`Successfully gave role`);
        }
        if(isNaN(args[0]) || args[0].length > 18 && args[0].length < 16) return msg.channel.createMessage('This is not a user mention or an ID. The syntax is ")>rolegive (user mention or user id) | (name role to give)"');
        if(!msg.channel.guild.members.filter(m => m.id === args[0])) return msg.channel.createMessage('Unable to find this user...');
        target = args[0];
        msg.channel.guild.addMemberRole(target, targetRole).catch(e => {
            return msg.channel.createMessage('Could not give this role');
        });
        return msg.channel.createMessage(`Successfully gave role`);
    }
}