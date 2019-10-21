module.exports = {
    command: "roletake",
    description: "Take a role away from somebody",
    syntax: ")>roletake [User Mention | User ID] | [Role Name]",
    category: "Moderation",
    permission: "manageRoles",
    botPermission: "manageRoles",
    execute: async (meteor, bot, msg, args) => {
        let target = null;
        let targetRole = null;
        roleArgs = args.join(" ").split(/ *\| */);
        if(!args) return msg.channel.createMessage('You did not say anything. The syntax is ")>roletake (user mention or user id) | (name role to take)"');
        if(!roleArgs[1]) return msg.channel.createMessage('You did not specify a role to take. The syntax is ")>roletake (user mention or user id) | (name role to take)"');
        if(!msg.channel.guild.roles.filter(r => r.name === roleArgs[1])[0]) return msg.channel.createMessage('Could not find this role');
        targetRole = msg.channel.guild.roles.filter(r => r.name === roleArgs[1])[0].id;
        if(msg.mentions.length >= 1) {
            target = msg.mentions[0].id;
            msg.channel.guild.removeMemberRole(target, targetRole).catch(e => {
                return msg.channel.createMessage('Could not take this role');
            });
            return msg.channel.createMessage(`Successfully took role`);
        }
        if(isNaN(args[0]) || args[0].length > 18 && args[0].length < 16) return msg.channel.createMessage('This is not a user mention or an ID. The syntax is ")>roletake (user mention or user id) | (name role to take)"');
        if(!msg.channel.guild.members.filter(m => m.id === args[0])) return msg.channel.createMessage('Unable to find this user...');
        target = args[0];
        msg.channel.guild.removeMemberRole(target, targetRole).catch(e => {
            return msg.channel.createMessage('Could not take this role');
        });
        return msg.channel.createMessage(`Successfully took role`);
    }
}